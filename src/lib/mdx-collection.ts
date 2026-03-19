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

type CollectionIndex<TFields extends { date: string; published: boolean }> = {
  all: CollectionEntry<TFields>[];
  bySlug: Map<string, CollectionEntry<TFields>>;
};

type MdxCollectionReader<TFields extends { date: string; published: boolean }> = {
  getAll: () => CollectionEntry<TFields>[];
  getSlugs: () => string[];
  getBySlug: (slug: string) => CollectionEntry<TFields> | null;
  getTop: (limit: number) => CollectionEntry<TFields>[];
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
  const frontmatter = data as Record<string, unknown>;
  const parsedFields = {} as TFields;

  for (const [key, parser] of Object.entries(fieldParsers) as [keyof TFields, FieldParser<TFields[keyof TFields]>][]) {
    parsedFields[key] = parser(frontmatter[String(key)], fileName);
  }

  return parsedFields;
}

function readMdxCollection<TFields extends { date: string; published: boolean }>(
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

function cloneEntry<TFields extends { date: string; published: boolean }>(
  entry: CollectionEntry<TFields>,
): CollectionEntry<TFields> {
  return { ...entry };
}

function buildCollectionIndex<TFields extends { date: string; published: boolean }>(
  options: ReadMdxCollectionOptions<TFields>,
): CollectionIndex<TFields> {
  const all = readMdxCollection(options);
  const bySlug = new Map<string, CollectionEntry<TFields>>(all.map((entry) => [entry.slug, entry]));

  return {
    all,
    bySlug,
  };
}

export function createMdxCollectionReader<TFields extends { date: string; published: boolean }>(
  options: ReadMdxCollectionOptions<TFields>,
): MdxCollectionReader<TFields> {
  let cachedIndex: CollectionIndex<TFields> | null = null;

  function getIndex(): CollectionIndex<TFields> {
    if (!cachedIndex) {
      cachedIndex = buildCollectionIndex(options);
    }

    return cachedIndex;
  }

  return {
    getAll: () => getIndex().all.map(cloneEntry),
    getSlugs: () => getIndex().all.map((entry) => entry.slug),
    getBySlug: (slug) => {
      const entry = getIndex().bySlug.get(slug);

      return entry ? cloneEntry(entry) : null;
    },
    getTop: (limit) => getIndex().all.slice(0, Math.max(0, limit)).map(cloneEntry),
  };
}
