import { lstat, readdir, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

async function privateFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await privateFiles(file)));
    } else if (
      /^\.env(?:$|\.)/.test(entry.name) ||
      /^contact-submissions\.json(?:$|\.)/.test(entry.name)
    ) {
      files.push(file);
    }
    // Never follow directory symlinks into the original workspace.
  }
  return files;
}

export async function sanitizeBuildDirectory(directory) {
  const info = await lstat(directory);
  if (!info.isDirectory() || info.isSymbolicLink())
    throw new Error("Expected a standalone build directory, not a symlink.");
  const files = await privateFiles(directory);
  for (const file of files) await unlink(file);
  if ((await privateFiles(directory)).length)
    throw new Error("Private runtime files remain in the standalone build.");
  return files.length;
}

if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  // Keep local environment files and legacy records out of deployable artifacts.
  // Sanitize copied artifacts only; the source data directory is never touched.
  const standalone = fileURLToPath(
    new URL("../.next/standalone/", import.meta.url),
  );
  const removed = await sanitizeBuildDirectory(standalone);
  console.log(
    `Standalone privacy check passed (${removed} private file copies removed).`,
  );
}
