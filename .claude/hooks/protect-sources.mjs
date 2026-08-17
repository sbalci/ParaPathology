#!/usr/bin/env node
/**
 * PreToolUse hook — enforce the append-only rule on raw source material.
 *
 * AGENTS.md says sources/ is append-only. That is an instruction, and any model
 * may fail to follow it. This makes it a real block for the two folders where
 * losing content actually matters:
 *
 *   sources/papers/  — the record of what was read
 *   sources/notes/   — the user's own rough notes
 *
 * Rules:
 *   - Creating a NEW file in those folders: allowed (that is how items get filed).
 *   - Editing or overwriting an EXISTING file there: denied.
 *   - Shell commands that delete/move/truncate paths there: denied.
 *   - sources/inbox/ and sources/projects/: always allowed. The inbox is a
 *     working queue and project pages are mutable by design.
 *   - Everything else in the repo: not this hook's business.
 *
 * Fails OPEN. If anything is unexpected — malformed payload, unknown tool — the
 * call is allowed through. A hook that blocks work because it got confused is
 * worse than no hook.
 */

import { existsSync } from "node:fs";
import { resolve, relative } from "node:path";

const PROTECTED = ["sources/papers", "sources/notes"];

// Destructive shell verbs. Read-only use of these paths (grep, cat, ls) is fine.
const DESTRUCTIVE =
  /(^|[\s;&|(])(rm|rmdir|unlink|shred|truncate|mv|dd)\s|>\s*\S*sources\/(papers|notes)|sed\s+(-[^\s]*\s+)*-i|git\s+(rm|clean)/;

function allow() {
  process.exit(0);
}

function deny(reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: reason,
      },
    })
  );
  process.exit(0);
}

let raw = "";
process.stdin.setEncoding("utf8");
for await (const chunk of process.stdin) raw += chunk;

let payload;
try {
  payload = JSON.parse(raw);
} catch {
  allow(); // fail open on malformed input
}

const projectDir =
  process.env.CLAUDE_PROJECT_DIR || payload.cwd || process.cwd();
const tool = payload.tool_name || "";
const input = payload.tool_input || {};

const slash = (p) => String(p).split(/[\\/]/).join("/");

/**
 * Returns { rel, abs } if the path sits inside a protected folder, else null.
 * Separators are normalised to "/" BEFORE resolving, so a Windows-style path
 * is recognised even when the hook runs on a POSIX host.
 */
function protectedPath(filePath) {
  if (!filePath) return null;
  let abs, rel;
  try {
    abs = resolve(slash(projectDir), slash(filePath));
    rel = slash(relative(slash(projectDir), abs));
  } catch {
    return null;
  }
  if (rel.startsWith("..")) return null; // outside the repo
  return PROTECTED.some((d) => rel === d || rel.startsWith(d + "/"))
    ? { rel, abs }
    : null;
}

// --- file-writing tools -----------------------------------------------------
if (tool === "Edit" || tool === "Write" || tool === "NotebookEdit") {
  const hit = protectedPath(input.file_path || input.notebook_path);
  // Files whose name starts with "_" or "." inside these folders are build
  // config (Quarto's _metadata.yml, for example), not raw source material.
  // Protecting them would make the folders unconfigurable.
  const base = hit ? hit.rel.split("/").pop() : "";
  const isConfig = base.startsWith("_") || base.startsWith(".");
  if (hit && !isConfig && existsSync(hit.abs)) {
    deny(
      `AGENTS.md rule: ${hit.rel} is raw source material and is append-only. ` +
        `Existing files in sources/papers/ and sources/notes/ must not be edited ` +
        `or overwritten — record the correction on the relevant wiki/ page instead. ` +
        `Creating a new file here is fine. If you genuinely need to change this ` +
        `file, ask the user rather than working around the hook.`
    );
  }
  allow();
}

// --- shell ------------------------------------------------------------------
if (tool === "Bash") {
  const cmd = slash(input.command || "");
  const touchesProtected = PROTECTED.some((d) => cmd.includes(d));
  if (touchesProtected && DESTRUCTIVE.test(cmd)) {
    deny(
      `AGENTS.md rule: that command deletes, moves or truncates something under ` +
        `sources/papers/ or sources/notes/, which are append-only. Reading them ` +
        `is fine. If the file really must go, ask the user to do it.`
    );
  }
  allow();
}

allow();
