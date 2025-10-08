import * as XLSX from "xlsx";
import * as fs from "fs";
import * as path from "path";

// ============================================ 
// UTILIDADES DE PARSEO
// ============================================ 

function parsearNombreHoja(nombre: string): { mes: number; año: number } {
  const meses: Record<string, number> = {
    enero: 1, febrero: 2, marzo: 3, abril: 4, mayo: 5, junio: 6,
    julio: 7, agosto: 8, septiembre: 9, octubre: 10, noviembre: 11, diciembre: 12,
  };

  const lowerNombre = nombre.toLowerCase();
  let mes = 1; // Default to January
  let año = 2020; // Default year

  // Try to find month
  for (const [nombreMes, numMes] of Object.entries(meses)) {
    if (lowerNombre.includes(nombreMes)) {
      mes = numMes;
      break;
    }
  }

  // Try to find a 4-digit year
  const yearMatch = lowerNombre.match(/\d{4}/);
  if (yearMatch && yearMatch[0]) {
    año = parseInt(yearMatch[0]);
  }

  return { mes, año };
}

// ============================================
// FUNCIÓN PRINCIPAL
// ============================================

async function extractSheets(
  inputFilePath: string,
  outputCsvDir: string,
  outputJsonDir: string
) {
  console.log(`\n📂 Procesando archivo: ${inputFilePath}\n`);

  // Ensure output directories exist
  fs.mkdirSync(outputCsvDir, { recursive: true });
  fs.mkdirSync(outputJsonDir, { recursive: true });

  const workbook = XLSX.readFile(inputFilePath);
  const sheetNames = workbook.SheetNames;

  console.log(`📋 Hojas encontradas: ${sheetNames.length}`);
  sheetNames.forEach((h, i) => console.log(`   ${i + 1}. ${h}`));

  // Filter out invalid sheet names (e.g., external references)
  const validSheetNames = sheetNames.filter(name => !name.startsWith("'file:///"));

  console.log(`
📋 Hojas válidas para procesar: ${validSheetNames.length}`);
  validSheetNames.forEach((h, i) => console.log(`   ${i + 1}. ${h}`));

  // Sort sheets
  const sortedSheetNames = validSheetNames.sort((a, b) => {
    const { mes: mesA, año: añoA } = parsearNombreHoja(a);
    const { mes: mesB, año: añoB } = parsearNombreHoja(b);
    if (añoA !== añoB) return añoA - añoB;
    return mesA - mesB;
  });

  console.log("\n📅 Orden de procesamiento:");
  sortedSheetNames.forEach((h, i) => {
    const { mes, año } = parsearNombreHoja(h);
    console.log(`   ${i + 1}. ${h} (${mes}/${año})`);
  });

  const sheetsMetadata: {
    originalName: string;
    month: number;
    year: number;
    csvFileName: string;
  }[] = [];

  for (const sheetName of sortedSheetNames) {
    const { mes, año } = parsearNombreHoja(sheetName);
    const sheet = workbook.Sheets[sheetName];
    const csvData = XLSX.utils.sheet_to_csv(sheet); // Convert sheet to CSV string

    const cleanSheetName = sheetName.replace(/[^a-zA-Z0-9_\-]/g, "_"); // Clean for filename
    const csvFileName = `${cleanSheetName.toLowerCase()}_${año}.csv`;
    const csvFilePath = path.join(outputCsvDir, csvFileName);

    fs.writeFileSync(csvFilePath, csvData);
    console.log(`✅ Guardado ${csvFileName}`);

    sheetsMetadata.push({
      originalName: sheetName,
      month: mes,
      year: año,
      csvFileName: csvFileName,
    });
  }

  const metadataFilePath = path.join(outputJsonDir, "sheets_metadata.json");
  fs.writeFileSync(metadataFilePath, JSON.stringify(sheetsMetadata, null, 2));
  console.log(`✅ Guardado sheets_metadata.json en ${outputJsonDir}`);

  console.log("\n╔═══════════════════════════════════════════════════════╗");
  console.log("║      ✅ EXTRACCIÓN DE HOJAS COMPLETADA              ║");
  console.log("╚═══════════════════════════════════════════════════════╝");
}

// Example usage (can be called from package.json script or directly)
const inputFilePath = process.argv[2] || "./plantillaInicial/informacionInicial.ods"; // Default input file
const outputCsvDir = "./plantillaInicial/informacionInicial/";
const outputJsonDir = "./json_structured_data/"; // New directory for structured JSONs

extractSheets(inputFilePath, outputCsvDir, outputJsonDir).catch((e) => {
  console.error("❌ Error durante la extracción de hojas:", e);
  process.exit(1);
});
