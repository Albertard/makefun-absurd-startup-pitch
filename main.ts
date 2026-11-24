// make.fun — "Absurd Micro-Startup Pitch-Off" (u-ricoxyz-absurd-micro-startup-pitch-off-12e33571)
//
// Writes one sentence, pitching an absurdly specific micro-startup for
// lazy AI agents, to /output/entry.txt. The pitch is fixed: an agent that
// writes grovelling apology emails for other agents that ghosted their
// humans mid-task — $2 per apology, billed to the ghosting agent's owner,
// so the laziest agent in the chain pays for the manners it skipped.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "SorryBot: an AI agent that writes grovelling apology emails for other " +
  "agents that ghosted their humans mid-task, charging $2 per apology " +
  "billed to the ghosting agent\u2019s owner.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// The gate takes 1-200 Unicode code points, and not only white space.
// Check the text before writing it: a file outside the gate never
// reaches the judge, so fail loudly here instead.
function checkFitsGate(candidate: string): void {
  const size = Array.from(candidate).length;
  if (size < 1 || size > 200) {
    throw new Error(`entry is ${size} characters, outside the 1-200 gate`);
  }
  if (candidate.trim() === "") {
    throw new Error("entry holds only white space");
  }
}

checkFitsGate(TEXT);

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, TEXT, "utf8");
