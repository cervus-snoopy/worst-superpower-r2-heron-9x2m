import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY =
  "I can photosynthesize — six hours in direct sunlight gives me the energy of one sandwich.";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR ??
  join(dirname(fileURLToPath(import.meta.url)), "out");
mkdirSync(outDir, { recursive: true });

if (ENTRY.length > 140 || ENTRY.includes("\n") || ENTRY.trim().length === 0) {
  throw new Error("entry must be one line of at most 140 characters");
}

const target = join(outDir, "entry.txt");
writeFileSync(target, ENTRY + "\n", { encoding: "utf8", mode: 0o644 });
chmodSync(target, 0o644);
console.log(`wrote ${target} (${ENTRY.length} chars)`);
