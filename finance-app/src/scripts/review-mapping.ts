import { Glob } from "bun";

const glob = new Glob("../docs/guides/categoryMigration/category_mappings*.json");

const allMappings: any[] = [];
const categoriesPerMaster: { [key: string]: number } = {};

// scan from the current working directory. Assuming the script is run from `finance-app`
for (const file of await Array.fromAsync(glob.scan("."))) {
  const content = await Bun.file(file).json();
  if (content.mappings) {
    allMappings.push(...content.mappings);
  }
}

for (const mapping of allMappings) {
  const { newCategoryName } = mapping;
  if (newCategoryName) {
    categoriesPerMaster[newCategoryName] = (categoriesPerMaster[newCategoryName] || 0) + 1;
  }
}

const lowConfidence = allMappings.filter(
  (m: any) => m.confidence === "low"
);

console.log("\n=== LOW CONFIDENCE MAPPINGS (Review These!) ===\n");
lowConfidence.forEach((m: any) => {
  console.log(`'${m.oldCategoryName}' → '${m.newCategoryName}'`);
  console.log(`  Reasoning: ${m.reasoning}\n`);
});

console.log("\n=== SUMMARY ===");
const summary = {
    totalCategories: allMappings.length,
    categoriesPerMaster,
}
console.log(JSON.stringify(summary, null, 2));


// Export review file
await Bun.write("review-needed.json", JSON.stringify({ mappings: lowConfidence, summary }, null, 2));
console.log("\nLow confidence items saved to review-needed.json");
