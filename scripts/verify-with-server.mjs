import { spawn } from "node:child_process";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const PORT = process.env.SEO_VERIFY_PORT ?? "3005";
const ORIGIN = `http://127.0.0.1:${PORT}`;
process.env.SEO_VERIFY_ORIGIN = ORIGIN;

const logDir = path.join(process.cwd(), "seo-verification-logs");
fs.mkdirSync(logDir, { recursive: true });
const serverLogPath = path.join(logDir, "next-start.log");
const serverLog = fs.createWriteStream(serverLogPath);

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: process.cwd(),
      env: process.env,
      stdio: "inherit",
    });
    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(" ")} exited ${code}`));
    });
  });
}

function ping() {
  return new Promise((resolve) => {
    const req = http.get(ORIGIN, { timeout: 2000 }, (res) => {
      res.resume();
      resolve(true);
    });
    req.on("error", () => resolve(false));
    req.on("timeout", () => {
      req.destroy();
      resolve(false);
    });
  });
}

async function waitForServer(child) {
  const deadline = Date.now() + 90_000;
  const onData = (chunk) => serverLog.write(chunk);
  child.stdout.on("data", onData);
  child.stderr.on("data", onData);

  while (Date.now() < deadline) {
    if (child.exitCode !== null) {
      throw new Error(`next start exited ${child.exitCode} before becoming ready`);
    }
    if (await ping()) return;
    await new Promise((resolve) => setTimeout(resolve, 400));
  }
  throw new Error(`Timed out waiting for next start on ${ORIGIN}`);
}

if (!fs.existsSync(path.join(process.cwd(), ".next"))) {
  throw new Error("Missing .next. Run `npm run build` before verify:server.");
}

const server = spawn("npx", ["next", "start", "-H", "127.0.0.1", "-p", PORT], {
  cwd: process.cwd(),
  env: { ...process.env, PORT },
  stdio: ["ignore", "pipe", "pipe"],
});

let shuttingDown = false;
const stopServer = () => {
  if (shuttingDown) return;
  shuttingDown = true;
  server.kill("SIGTERM");
  serverLog.end();
};

try {
  await waitForServer(server);
  await run("node", ["scripts/verify-seo.mjs"]);
  await run("node", ["scripts/verify-migration.mjs"]);
  await run("node", ["scripts/verify-http.mjs"]);
} finally {
  stopServer();
}

await new Promise((resolve) => {
  if (server.exitCode !== null) resolve();
  else server.on("close", resolve);
});
console.log(`verify:server passed against ${ORIGIN}`);
