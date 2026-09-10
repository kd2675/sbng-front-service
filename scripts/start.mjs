import { access, cp } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

import nextEnv from "@next/env";

const root = fileURLToPath(new URL("../", import.meta.url));
nextEnv.loadEnvConfig(root, false);
const standalone = path.join(root, ".next", "standalone");
await access(path.join(standalone, "server.js"));
await cp(path.join(root, "public"), path.join(standalone, "public"), {
  recursive: true,
});
await cp(
  path.join(root, ".next", "static"),
  path.join(standalone, ".next", "static"),
  { recursive: true },
);
const child = spawn(process.execPath, [path.join(standalone, "server.js")], {
  cwd: root,
  stdio: "inherit",
  env: {
    ...process.env,
    NODE_ENV: "production",
    PORT: process.env.PORT || "3004",
    HOSTNAME: process.env.HOSTNAME || "0.0.0.0",
  },
});
for (const signal of ["SIGINT", "SIGTERM"])
  process.on(signal, () => child.kill(signal));
child.on("error", (error) => {
  console.error("Failed to start SBNG:", error.message);
  process.exitCode = 1;
});
child.on("exit", (code) => {
  process.exitCode = code ?? 0;
});
