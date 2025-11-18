import { PrismaClient } from "@/generated/prisma";
import { Glob } from "bun";
import path from "path";

const prisma = new PrismaClient();

async function applyConsolidation(userId: string) {
  const mappingDir = path.join(
    import.meta.dir,
    "../../../docs/guides/categoryMigration",
  );
  const allOriginalFiles = new Set<string>();
  const allReviewedFiles = new Set<string>();
  const globOriginal = new Glob("category_mappings*.json");
  const globReviewed = new Glob("reviewed-*.json");

  for await (const file of globOriginal.scan(mappingDir)) {
    allOriginalFiles.add(file);
  }
  for await (const file of globReviewed.scan(mappingDir)) {
    allReviewedFiles.add(file);
  }

  const filesToProcess: string[] = [];
  for (const reviewedFile of allReviewedFiles) {
    filesToProcess.push(path.join(mappingDir, reviewedFile));
    const originalName = reviewedFile.replace("reviewed-", "");
    allOriginalFiles.delete(originalName);
  }
  for (const originalFile of allOriginalFiles) {
    filesToProcess.push(path.join(mappingDir, originalFile));
  }

  console.log(
    "Found files to process:",
    filesToProcess.map((f) => path.basename(f)),
  );

  let allMappings: any[] = [];
  for (const filePath of filesToProcess) {
    const content = await Bun.file(filePath).json();
    if (content.mappings) {
      allMappings.push(...content.mappings);
    }
  }

  console.log(`Starting consolidation for ${allMappings.length} old categories...\n`);

  // Step 1: Create all master categories
  const masterCategories = new Set(
    allMappings.map((m: any) => m.newCategoryName),
  );
  const createdCategories = new Map<string, number>();

  for (const masterName of masterCategories) {
    const category = await prisma.category.upsert({
      where: {
        userId_name: { userId, name: masterName },
      },
      create: {
        userId,
        name: masterName,
        color: getColorForCategory(masterName),
      },
      update: {},
    });
    createdCategories.set(masterName, category.id);
    console.log(`✓ Master category: ${masterName} (ID: ${category.id})`);
  }

  console.log(`\n${masterCategories.size} master categories ready.\n`);

  // Step 2: Update transactions and recurrences
  let updatedTransactions = 0;
  let updatedRecurrences = 0;
  let deletedCategories = 0;

  for (const map of allMappings) {
    const newCategoryId = createdCategories.get(map.newCategoryName);

    if (!newCategoryId) {
      console.error(
        `Error: Master category "${map.newCategoryName}" not found!`,
      );
      continue;
    }

    const oldCategory = await prisma.category.findUnique({
      where: { id: map.oldCategoryId },
    });

    if (!oldCategory || oldCategory.id === newCategoryId) {
      continue;
    }

    // Update transactions
    const txResult = await prisma.transaction.updateMany({
      where: { categoryId: map.oldCategoryId },
      data: { categoryId: newCategoryId },
    });
    if (txResult.count > 0) {
      updatedTransactions += txResult.count;
    }

    // Update recurrences
    const recResult = await prisma.recurrence.updateMany({
      where: { categoryId: map.oldCategoryId },
      data: { categoryId: newCategoryId },
    });
    if (recResult.count > 0) {
      updatedRecurrences += recResult.count;
    }

    try {
      await prisma.category.delete({
        where: { id: map.oldCategoryId },
      });
      deletedCategories++;
      console.log(
        `✓ "${map.oldCategoryName}" → "${map.newCategoryName}" (${txResult.count} txns, ${recResult.count} recurrences)`,
      );
    } catch (e) {
      console.warn(
        `Could not delete category "${map.oldCategoryName}" (ID: ${map.oldCategoryId}). It might have already been consolidated.`,
      );
    }
  }

  console.log("\n=== CONSOLIDATION COMPLETE ===");
  console.log(`Transactions updated: ${updatedTransactions}`);
  console.log(`Recurrences updated: ${updatedRecurrences}`);
  console.log(`Categories deleted: ${deletedCategories}`);
  console.log(`Final category count: ${masterCategories.size}`);
}

function getColorForCategory(name: string): string {
  const colors: Record<string, string> = {
    "Groceries & Food Shopping": "#4CAF50",
    "Restaurants & Takeout": "#FF9800",
    "Alcohol & Beverages": "#9C27B0",
    "Tobacco & Smoking": "#795548",
    "Transportation - Fuel": "#2196F3",
    "Transportation - Public/Rideshare": "#03A9F4",
    "Vehicle Maintenance": "#607D8B",
    "Rent & Housing": "#F44336",
    "Utilities & Services": "#FF5722",
    "Personal Care & Grooming": "#E91E63",
    "Clothing & Footwear": "#3F51B5",
    "Health & Medical": "#00BCD4",
    "Gym & Sports": "#8BC34A",
    "Entertainment & Social": "#FFEB3B",
    "Subscriptions & Memberships": "#673AB7",
    "Household & Cleaning": "#009688",
    "Hardware & Electronics": "#9E9E9E",
    "Home Improvement & Tools": "#FF6F00",
    "Gifts & Special Occasions": "#E91E63",
    "Miscellaneous/Other": "#757575",
    // New Categories
    Income: "#2E7D32",
    Education: "#5E35B1",
    Pets: "#D84315",
    "Professional Services": "#455A64",
    "Taxes & Fees": "#C62828",
  };
  return colors[name] || "#9E9E9E";
}

// Run it
const userId = process.argv[2];
if (!userId) {
  console.error(
    "Usage: bun run finance-app/src/scripts/apply-consolidation.ts <userId>",
  );
  process.exit(1);
}

await applyConsolidation(userId);
await prisma.$disconnect();
