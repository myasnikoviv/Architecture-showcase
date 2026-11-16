import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function walkFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walkFiles(full);
    return [full];
  });
}

// 1. Check Atomic Design layer import hierarchy
const layerForbiddenImports = {
  atoms: ["@/components/atoms", "@/components/molecules", "@/components/organisms", "@/components/templates"],
  molecules: ["@/components/molecules", "@/components/organisms", "@/components/templates"],
  organisms: ["@/components/organisms", "@/components/templates"],
  templates: ["@/components/templates"],
};

for (const [layer, forbidden] of Object.entries(layerForbiddenImports)) {
  const layerDir = path.join(root, "src", "components", layer);
  for (const file of walkFiles(layerDir)) {
    if (!file.endsWith(".ts") && !file.endsWith(".tsx")) continue;
    if (path.basename(file) === "index.ts") continue;
    const text = fs.readFileSync(file, "utf-8");

    for (const target of forbidden) {
      const re = new RegExp(`from\\s+["']${target.replace("/", "\\/")}`);
      if (re.test(text)) {
        errors.push(`[ATOMIC BOUNDARY] ${path.relative(root, file)} must not import ${target}`);
      }
    }

    // 2. Check zero hardcoded hex colors inside src/components/
    const hexMatch = text.match(/#[0-9a-fA-F]{6}\b/g);
    if (hexMatch) {
      errors.push(`[RAW HEX] ${path.relative(root, file)} contains hardcoded hex color(s): ${hexMatch.join(", ")}`);
    }
  }
}

// 3. Check zero em-dashes in decoupled English locale files
const enDir = path.join(root, "src", "content", "locales", "en");
for (const file of walkFiles(enDir)) {
  if (!file.endsWith(".json")) continue;
  const text = fs.readFileSync(file, "utf-8");
  JSON.parse(text); // verify valid JSON
  if (text.includes("—")) {
    errors.push(`[TYPOGRAPHY] ${path.relative(root, file)} contains forbidden em-dash`);
  }
}

if (errors.length > 0) {
  console.error("ATOMIC ARCHITECTURE VERIFICATION FAILED:");
  for (const err of errors) console.error(" -", err);
  process.exit(1);
}

console.log("ATOMIC ARCHITECTURE VERIFICATION PASSED: 0 boundary leaks, 0 raw hex colors in components, 0 invalid JSON or em-dashes in locales.");
