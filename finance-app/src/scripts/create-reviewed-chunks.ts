import { Glob } from "bun";
import path from "path";

// Define the structure of a mapping and the full JSON file
interface Mapping {
  oldCategoryId: number;
  oldCategoryName: string;
  newCategoryName: string;
  confidence: 'high' | 'medium' | 'low';
  reasoning: string;
}

interface MappingFile {
  mappings: Mapping[];
  summary?: any;
}

// The changes approved by the user
const changes: Record<string, string> = {
  // Income
  'sueldo mama': 'Income',
  'sueldo papa': 'Income',
  'sueldo hermana': 'Income',
  'sueldo hermano': 'Income',
  'sueldo': 'Income',
  'freelance': 'Income',
  'freelance ingresos': 'Income',

  // Education
  'curso de manejo': 'Education',
  'curso de cocina': 'Education',
  'curso de ingles': 'Education',
  'curso de programacion': 'Education',
  'curso de fotografia': 'Education',
  'curso de baile': 'Education',
  'curso de canto': 'Education',
  'curso de guitarra': 'Education',
  'curso de piano': 'Education',
  'clases particulares': 'Education',
  'clases de apoyo': 'Education',
  'educacion': 'Education',
  'educacion cuota': 'Education',
  'educacion libros': 'Education',
  'educacion utiles': 'Education',
  'educacion cursos': 'Education',
  'educacion varios': 'Education',
  'estudios': 'Education',
  'estudios cuota': 'Education',
  'estudios libros': 'Education',
  'estudios utiles': 'Education',
  'estudios cursos': 'Education',
  'estudios varios': 'Education',
  'hijos cuota colegio': 'Education',
  'hijos utiles': 'Education',
  'libreria': 'Education',
  'libreria utiles': 'Education',
  'libreria fotocopias': 'Education',
  'libreria impresiones': 'Education',
  'libreria varios': 'Education',

  // Pets
  'juguetes perro': 'Pets',
  'juguetes gato': 'Pets',
  'mascotas': 'Pets',
  'mascotas juguetes': 'Pets',
  'mascotas varios': 'Pets',

  // Professional Services
  'consultoria': 'Professional Services',
  'asesoramiento': 'Professional Services',
  'honorarios': 'Professional Services',
  'honorarios abogado': 'Professional Services',
  'honorarios contador': 'Professional Services',
  'honorarios escribano': 'Professional Services',
  'honorarios arquitecto': 'Professional Services',
  'honorarios varios': 'Professional Services',

  // Taxes & Fees
  'tramites': 'Taxes & Fees',
  'tramites dni': 'Taxes & Fees',
  'tramites pasaporte': 'Taxes & Fees',
  'tramites afip': 'Taxes & Fees',
  'tramites varios': 'Taxes & Fees',
  'multas': 'Taxes & Fees',
  'multas varias': 'Taxes & Fees',
  'diferencia de cambio': 'Taxes & Fees',

  // Restaurants & Takeout
  'feca': 'Restaurants & Takeout',
  'comilona': 'Restaurants & Takeout',

  // Entertainment & Social
  'marimba': 'Entertainment & Social',
  'barra': 'Entertainment & Social',

  // Gifts & Special Occasions
  'abuela': 'Gifts & Special Occasions',
  'bebe': 'Gifts & Special Occasions',
  'bebe juguetes': 'Gifts & Special Occasions',
  'bebe varios': 'Gifts & Special Occasions',
  'hijos': 'Gifts & Special Occasions',
  'hijos juguetes': 'Gifts & Special Occasions',
  'hijos varios': 'Gifts & Special Occasions',

  // Gym & Sports
  'bici': 'Gym & Sports',
  'trx': 'Gym & Sports',
  'tiro': 'Gym & Sports',

  // Home Improvement & Tools
  'oxido': 'Home Improvement & Tools',
  'manguera ab': 'Home Improvement & Tools',

  // Utilities & Services
  'ciudad': 'Utilities & Services',
  'nacion': 'Utilities & Services',
  'provincia': 'Utilities & Services',
  'patagonia': 'Utilities & Services',
};

async function createReviewedChunks() {
  const mappingDir = path.join(import.meta.dir, '../../../docs/guides/categoryMigration');
  const glob = new Glob("category_mappings*.json");

  console.log("Starting to create reviewed versions of mapping files...");

  for await (const file of glob.scan(mappingDir)) {
    const filePath = path.join(mappingDir, file);
    const content: MappingFile = await Bun.file(filePath).json();
    let wasModified = false;

    if (!content.mappings) continue;

    for (const mapping of content.mappings) {
      if (changes[mapping.oldCategoryName]) {
        mapping.newCategoryName = changes[mapping.oldCategoryName];
        mapping.confidence = 'high';
        mapping.reasoning = 'Manually reviewed and approved by user.';
        wasModified = true;
      }
    }

    if (wasModified) {
      // Construct the new filename
      const newFileName = `reviewed-${file}`;
      const newFilePath = path.join(mappingDir, newFileName);

      console.log(`Found changes in ${file}. Creating new file: ${newFileName}`);

      // Remove the now-outdated summary
      delete content.summary;

      // Write to the new file
      await Bun.write(newFilePath, JSON.stringify(content, null, 2));
    }
  }

  console.log("Finished creating reviewed mapping files.");
}

createReviewedChunks();
