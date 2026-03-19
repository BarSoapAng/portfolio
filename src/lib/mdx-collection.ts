import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const MDX_EXTENSION = ".mdx";

type CollectionEntry<TFields> = TFields & {
  slug: string;
};

type FieldParser<TValue> = (value: unknown, fileName: string) => TValue;

type FieldParsers<TFields> = {
  [K in keyof TFields]: FieldParser<TFields[K]>;
};

type ReadMdxCollectionOptions<TFields extends { date: string; published: boolean }> = {
  directoryName: string;
  fieldParsers: FieldParsers<TFields>;
};

function requireString(value: unknown, key: string, fileName: string): string {
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`Expected "${key}" to be a non-empty string in ${fileName}.`);
  }

  return value;
}

export function requireBoolean(value: unknown, key: string, fileName: string): boolean {
  if (typeof value !== "boolean") {
    throw new Error(`Expected "${key}" to be a boolean in ${fileName}.`);
  }

  return value;
}

export function requireDate(value: unknown, fileName: string): string {
  const date = requireString(value, "date", fileName);

  if (Number.isNaN(Date.parse(date))) {
    throw new Error(`Expected "date" to be a valid date string in ${fileName}.`);
  }

  return date;
}

export function requireStringField(key: string): FieldParser<string> {
  return (value, fileName) => requireString(value, key, fileName);
}

export function requireBooleanField(key: string): FieldParser<boolean> {
  return (value, fileName) => requireBoolean(value, key, fileName);
}

export function requireDateField(): FieldParser<string> {
  return (value, fileName) => requireDate(value, fileName);
}

export function parseTagsField(value: unknown, fileName: string): string[] {
  if (value === undefined) {
    return [];
  }

  if (!Array.isArray(value) || value.some((tag) => typeof tag !== "string" || tag.trim().length === 0)) {
    throw new Error(`Expected "tags" to be an array of non-empty strings in ${fileName}.`);
  }

  return value;
}

function readCollectionFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(MDX_EXTENSION))
    .map((entry) => entry.name);
}

function parseFrontmatter<TFields>(directory: string, fileName: string, fieldParsers: FieldParsers<TFields>): TFields {
  const source = fs.readFileSync(path.join(directory, fileName), "utf8");
  const { data } = matter(source);
  const parsedFields = {} as TFields;

  for (const [key, parser] of Object.entries(fieldParsers) as [keyof TFields, FieldParser<TFields[keyof TFields]>][]) {
    parsedFields[key] = parser(data[key], fileName);
  }

  return parsedFields;
}

export function readMdxCollection<TFields extends { date: string; published: boolean }>(
  options: ReadMdxCollectionOptions<TFields>,
): CollectionEntry<TFields>[] {
  const directory = path.join(process.cwd(), "content", options.directoryName);

  return readCollectionFiles(directory)
    .map((fileName) => ({
      slug: fileName.slice(0, -MDX_EXTENSION.length),
      ...parseFrontmatter(directory, fileName, options.fieldParsers),
    }))
    .filter((entry) => entry.published)
    .sort((left, right) => Date.parse(right.date) - Date.parse(left.date));
}
