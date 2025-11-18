// Bun way - much cleaner!
const mapping = await Bun.file("category-mapping.json").json();

// Filter low confidence mappings for manual review
const lowConfidence = mapping.mappings.filter(
  (m: any) => m.confidence === "low"
);

console.log("\n=== LOW CONFIDENCE MAPPINGS (Review These!) ===\n");
lowConfidence.forEach((m: any) => {
  console.log(`${m.oldCategoryName} → ${m.newCategoryName}`);
  console.log(`  Reasoning: ${m.reasoning}\n`);
});

console.log("\n=== SUMMARY ===");
console.log(JSON.stringify(mapping.summary.categoriesPerMaster, null, 2));

// Export review file
await Bun.write("review-needed.json", JSON.stringify(lowConfidence, null, 2));
console.log("\nLow confidence items saved to review-needed.json");
