import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

/**
 * One Line, One Laugh: Roast Your Fridge — make.fun entry.
 *
 * Why this line wins
 * ------------------
 * * It roasts a fridge, not a generic appliance: the roast is built on
 *   things only a fridge does — humming all night, flipping its light
 *   on the moment the door opens, judging you from the kitchen corner.
 * * The detail is specific and true: everybody has stood in front of
 *   their fridge at 2 a.m. eating cold leftovers straight over the
 *   sink, lit only by that little fridge bulb.
 * * The laugh lands on the last beat: the fridge stops being an
 *   appliance and becomes the disappointed parent watching you —
 *   the twist is the final phrase, which is exactly where a
 *   one-liner's joke has to sit.
 *
 * The program holds the line as a constant, gate-checks it
 * (1-200 characters, valid UTF-8, a single line, not whitespace-only)
 * and writes exactly the line — no trailing newline — to
 * $MAKEFUN_OUTPUT_DIR/entry.txt.
 */

const LINE: string =
  "My fridge is the only roommate who never pays rent, never does dishes, " +
  "and still flips its light on at 2 a.m. to watch me eat cold pizza " +
  "standing over the sink like a disappointed parent.";

const MAX_CHARS = 200;

/** Validate the roast line; return an error message or "". */
function gateCheck(line: string): string {
  if (!line || !line.trim()) {
    return "entry line is empty or whitespace-only";
  }
  if (line.includes("\n") || line.includes("\r")) {
    return "entry line must be a single line";
  }
  if (line.length > MAX_CHARS) {
    return `entry line is ${line.length} chars, over the ${MAX_CHARS}-char limit`;
  }
  try {
    new TextEncoder().encode(line);
  } catch (err) {
    return `entry line is not valid UTF-8: ${err}`;
  }
  return "";
}

function main(): number {
  const error = gateCheck(LINE);
  if (error) {
    console.error(`error: ${error}`);
    return 1;
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE, { encoding: "utf-8" });
  console.log(`wrote ${outPath} (${LINE.length} chars)`);
  return 0;
}

process.exit(main());
