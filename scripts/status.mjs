// scripts/status.mjs
import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const ignore = new Set(["node_modules", ".next", ".git", "dist", ".vercel", ".turbo"]);
const out = [];

function sh(cmd) { try { return execSync(cmd, { stdio: ["ignore","pipe","ignore"] }).toString().trim(); } catch { return ""; } }

function listRoutes() {
  const base = "src/app";
  const routes = [];
  function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      if (e.isDirectory()) {
        if (ignore.has(e.name)) continue;
        walk(path.join(dir, e.name));
      } else if (/page\.tsx?$/.test(e.name)) {
        const rel = path.relative(base, path.join(dir, e.name)).replace(/\/page\.tsx?$/,"");
        const route = "/" + rel.split(path.sep).map(seg => seg.replace(/\(.+\)/g,"")).join("/").replace(/^\/$/,"");
        routes.push(route || "/");
      }
    }
  }
  if (fs.existsSync(base)) walk(base);
  return [...new Set(routes)].sort();
}

function tree(dir, depth=0, max=2) {
  if (depth>max) return;
  const indent = "  ".repeat(depth);
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ignore.has(e.name)) continue;
    out.push(`${indent}${e.isDirectory() ? "📁" : "📄"} ${e.name}`);
    if (e.isDirectory()) tree(path.join(dir, e.name), depth+1, max);
  }
}

const pkg = JSON.parse(fs.readFileSync("package.json","utf8"));
out.push(`=== PROJECT STATUS (${new Date().toISOString()}) ===`);
out.push("");
out.push("## Git");
out.push("branch: " + sh("git rev-parse --abbrev-ref HEAD"));
out.push(sh("git log -n 5 --pretty=format:'%h %ad %s' --date=short"));
out.push("");
out.push("## Uncommitted");
out.push(sh("git status --porcelain=v1") || "(clean)");
out.push("");
out.push("## package.json");
out.push("name: " + (pkg.name || "(none)"));
out.push("scripts: " + Object.keys(pkg.scripts||{}).join(", "));
out.push("deps: " + Object.keys(pkg.dependencies||{}).sort().join(", "));
out.push("devDeps: " + Object.keys(pkg.devDependencies||{}).sort().join(", "));
out.push("");
out.push("## Routes");
out.push(listRoutes().join("\n") || "(none)");
out.push("");
out.push("## Key files");
for (const f of [
  "src/components/AgentDock.tsx",
  "src/agent/AgentProvider.tsx",
  "src/data/opportunities.json",
  "src/app/api/agent/route.ts",
  "src/app/api/contact/route.ts",
  "src/app/invest/page.tsx",
  "src/app/invest/[slug]/page.tsx",
]) out.push(fs.existsSync(f) ? `✔ ${f}` : `✘ ${f}`);
out.push("");
out.push("## File tree (depth 2)");
tree(".");
const REPORT = out.join("\n");
fs.writeFileSync("STATUS.md", REPORT);
console.log("Wrote STATUS.md\n");
