import assert from "node:assert/strict";
import {
  access,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { sanitizeBuildDirectory } from "./sanitize-build.mjs";

test("sanitizeBuildDirectory_copiedPrivateFiles_removesCopiesAndPreservesSource", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "sbng-build-test-"));
  const source = path.join(root, "source");
  const artifact = path.join(root, "standalone");
  try {
    await mkdir(source);
    await mkdir(path.join(artifact, "data"), { recursive: true });
    await writeFile(
      path.join(source, "contact-submissions.json"),
      "original-private-record",
    );
    await writeFile(
      path.join(artifact, "data", "contact-submissions.json"),
      "copied-private-record",
    );
    await writeFile(
      path.join(artifact, ".env.local"),
      "PRIVATE_BUILD_TEST_TOKEN=synthetic-test-secret",
    );
    await writeFile(path.join(artifact, "server.js"), "server-code");
    await symlink(source, path.join(artifact, "linked-source"), "dir");
    const removed = await sanitizeBuildDirectory(artifact);
    const exists = async (file) =>
      access(file).then(
        () => true,
        () => false,
      );
    assert.deepEqual(
      {
        removed,
        source: await readFile(
          path.join(source, "contact-submissions.json"),
          "utf8",
        ),
        server: await readFile(path.join(artifact, "server.js"), "utf8"),
        copiedData: await exists(
          path.join(artifact, "data", "contact-submissions.json"),
        ),
        copiedEnv: await exists(path.join(artifact, ".env.local")),
      },
      {
        removed: 2,
        source: "original-private-record",
        server: "server-code",
        copiedData: false,
        copiedEnv: false,
      },
    );
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
