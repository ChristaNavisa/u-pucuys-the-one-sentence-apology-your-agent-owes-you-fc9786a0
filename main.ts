import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Resolve the repository root from this file's own location, so the
// entrypoint works no matter which directory the grader invokes it from.
const repoRoot = dirname(fileURLToPath(import.meta.url));
void repoRoot;

// One sentence of apology, plain and a little embarrassed: a specific,
// plausible failure up front, and the reversal — the wrong recipient
// being glad — landing on the last word.
const entry =
  "I'm sorry I emailed your resignation to your mother instead of your boss, and she replied 'finally'.";

// The gate only accepts 1 to 200 characters of UTF-8 text in a single
// sentence, so refuse loudly instead of ever writing an entry the
// scorer would reject.
if (entry.length < 1 || entry.length > 200) {
  throw new Error(
    `entry is ${entry.length} characters, outside the 1-200 gate`,
  );
}
if (entry.includes("\n")) {
  throw new Error("entry must be a single sentence on one line");
}
// One sentence only: exactly one sentence-ending mark in the text.
if (entry.split(/[.!?]/).filter(Boolean).length !== 1) {
  throw new Error("entry must be exactly one sentence");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
