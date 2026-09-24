import { access, readdir, rename, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

async function findImages(directory) {
  const images = [];

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (path.relative(process.cwd(), entryPath) === path.join("src", "assets", "cursor", "apng")) {
        continue;
      }

      images.push(...(await findImages(entryPath)));
    } else if (/\.(?:jpe?g|png)$/i.test(entry.name)) {
      images.push(entryPath);
    }
  }

  return images;
}

const images = (
  await Promise.all(
    ["src/assets", "public"].map((directory) => findImages(path.resolve(directory))),
  )
).flat();

for (const source of images) {
  const destination = source.replace(/\.(?:jpe?g|png)$/i, ".webp");
  const temporaryDestination = `${destination}.tmp`;

  try {
    await access(destination);
    throw new Error(`Refusing to overwrite ${path.relative(process.cwd(), destination)}`);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  try {
    await sharp(source).rotate().webp({ quality: 85 }).toFile(temporaryDestination);
    await rename(temporaryDestination, destination);
    await rm(source);
    console.log(
      `Converted ${path.relative(process.cwd(), source)} -> ${path.relative(process.cwd(), destination)}`,
    );
  } finally {
    await rm(temporaryDestination, { force: true });
  }
}

if (images.length === 0) {
  console.log("No PNG or JPEG images need conversion.");
} else if (process.argv.includes("--fail-on-change")) {
  console.error("Image files were converted to WebP. Commit the replacements, then push again.");
  process.exitCode = 1;
}
