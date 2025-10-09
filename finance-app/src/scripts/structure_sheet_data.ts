import { mkdir, writeFile } from "fs/promises";
import * as path from "path";
import { createInterface } from "readline";

// --- UTILS ---
function parseCSV(text: string): string[][] {
  const lines = text.split(/\r?\n/).filter((line) => line.trim() !== "");
  const rows: string[][] = [];
  const regex = /(".*?"|[^",]*),?/g;

  for (const line of lines) {
    const matches = [...line.matchAll(regex)];
    const row = matches.map((m) => {
      let val = m[1] || "";
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.slice(1, -1).replace(/""/g, '"');
      }
      return val.trim();
    });
    if (row.length > 0 && row[row.length - 1] === "") row.pop();
    rows.push(row);
  }
  return rows;
}

function normalizeDate(dateStr: string): string {
  if (!dateStr) return "";
  const match = dateStr.match(/(\d{1,2})[\/\-](\d{1,2})(?:[\/\-](\d{2,4}))?/);
  if (match) {
    const day = match[1].padStart(2, "0");
    const month = match[2].padStart(2, "0");
    let year = match[3] || "20";
    if (year.length === 2) year = "20" + year;
    return `${year}-${month}-${day}`;
  }
  return dateStr;
}

function parseNumber(numStr: string): number {
  if (!numStr) return 0;
  const clean = numStr.replace(/\./g, "").replace(/,/g, ".");
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? 0 : parsed;
}

async function ask(question: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function levenshtein(a: string, b: string): number {
  const an = a.length,
    bn = b.length;
  if (an === 0) return bn;
  if (bn === 0) return an;
  const matrix = Array.from({ length: bn + 1 }, (_, i) => [i]);
  for (let j = 1; j <= an; j++) matrix[0][j] = j;
  for (let i = 1; i <= bn; i++) {
    for (let j = 1; j <= an; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[bn][an];
}

// --- REGISTRO DE CATEGORÍAS ---
const REGISTRY_FILE = "./jsons/column_registry.json";

interface Registry {
  categories: Record<string, number>;
  lastUpdated: string;
}

async function loadRegistry(): Promise<Registry> {
  try {
    const data = await readFile(REGISTRY_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { categories: {}, lastUpdated: new Date().toISOString() };
  }
}

async function saveRegistry(registry: Registry) {
  registry.lastUpdated = new Date().toISOString();
  await writeFile(REGISTRY_FILE, JSON.stringify(registry, null, 2));
}

function getSortedCategories(
  registry: Registry
): { name: string; count: number }[] {
  return Object.entries(registry.categories)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

// --- MAIN ---
async function main() {
  const csvPath = process.argv[2];
  if (!csvPath) {
    console.error(
      "❌ Uso: bun run structure_sheet_data.ts <ruta/al/archivo.csv>"
    );
    process.exit(1);
  }

  // Cargar registro
  const registry = await loadRegistry();
  const sortedCats = getSortedCategories(registry);

  console.log(`\n✨ Sistema de ayuda-memoria cargado.`);
  if (sortedCats.length > 0) {
    console.log(`\n📋 Categorías existentes (más usadas primero):`);
    sortedCats.forEach((cat, i) => {
      console.log(
        `  ${i + 1}. ${cat.name} (usada ${cat.count} ${
          cat.count === 1 ? "vez" : "veces"
        })`
      );
    });
  } else {
    console.log(`\n📭 Aún no hay categorías registradas.`);
  }

  // Leer CSV
  const text = await Bun.file(csvPath).text();
  const rows = parseCSV(text);
  if (rows.length === 0) {
    console.error("❌ No se encontraron datos en el archivo CSV.");
    process.exit(1);
  }

  console.log(`\n📊 Contenido completo del CSV (fila # | contenido):`);
  for (let i = 0; i < Math.min(rows.length, 20); i++) {
    const row = rows[i];
    const content = row.map((cell) => `"${cell}"`).join(", ");
    console.log(`  [${i}] → ${content}`);
  }
  if (rows.length > 20) {
    console.log(`  ... y ${rows.length - 20} filas más.`);
  }

  const result: Record<
    string,
    { fecha: string; monto: number; concepto: string }[]
  > = {};

  while (true) {
    // Mostrar recordatorio
    if (sortedCats.length > 0) {
      console.log(`\n💡 Recordatorio: Categorías disponibles:`);
      sortedCats.slice(0, 4).forEach((cat, i) => {
        console.log(`   ${i + 1}. ${cat.name}`);
      });
    }

    const input = await ask(
      `\n➡️ Nombre del grupo (o "done" para finalizar):\n> `
    );
    if (input.toLowerCase() === "done") break;

    let groupName: string;

    // Si es un número, usar categoría existente
    const num = parseInt(input);
    if (!isNaN(num) && num >= 1 && num <= sortedCats.length) {
      groupName = sortedCats[num - 1].name;
      console.log(`✅ Usando categoría existente: "${groupName}"`);
    } else {
      // Es un nombre nuevo → verificar similitudes
      const similar = Object.keys(registry.categories).filter(
        (name) =>
          levenshtein(input.toLowerCase(), name.toLowerCase()) <= 3 &&
          name !== input
      );

      if (similar.length > 0) {
        console.log(`⚠️ Encontré categorías similares: ${similar.join(", ")}`);
        const confirm = await ask(
          `¿Querés usar "${input}" de todas formas? (s/n): `
        );
        if (confirm.toLowerCase() !== "s") {
          continue;
        }
      }
      groupName = input;
      registry.categories[groupName] =
        (registry.categories[groupName] || 0) + 1;
      await saveRegistry(registry);
      console.log(`🆕 Nueva categoría registrada: "${groupName}"`);
    }

    // Pedir rango de filas
    const startRowInput = await ask(
      `\n📌 Rango de filas: desde qué fila empieza el bloque "${groupName}"?\n> `
    );
    const endRowInput = await ask(
      `\n📌 Hasta qué fila termina el bloque "${groupName}"?\n> `
    );
    const startRow = parseInt(startRowInput);
    const endRow = parseInt(endRowInput);

    if (
      isNaN(startRow) ||
      isNaN(endRow) ||
      startRow < 0 ||
      endRow >= rows.length ||
      startRow > endRow
    ) {
      console.log("⚠️ Rango de filas inválido.");
      continue;
    }

    // Pedir índices de columnas
    const indicesInput = await ask(
      `\n📌 Índices de columnas [fecha] [monto] [concepto] para este bloque:\n> `
    );
    const indices = indicesInput.split(/\s+/).map(Number);
    if (indices.length !== 3 || indices.some(isNaN)) {
      console.log("⚠️ Formato: tres números separados por espacios.");
      continue;
    }

    const [fechaIdx, montoIdx, conceptoIdx] = indices;
    if (
      ![fechaIdx, montoIdx, conceptoIdx].every(
        (idx) => idx >= 0 && idx < rows[0]?.length
      )
    ) {
      console.log(
        `⚠️ Índices inválidos. Máximo índice: ${rows[0]?.length - 1}`
      );
      continue;
    }

    const entries = [];
    for (let r = startRow; r <= endRow; r++) {
      const f = rows[r][fechaIdx] ?? "";
      const m = rows[r][montoIdx] ?? "";
      const c = rows[r][conceptoIdx] ?? "";
      if (!f && !m && !c) continue;
      entries.push({
        fecha: normalizeDate(f),
        monto: parseNumber(m),
        concepto: c,
      });
    }

    result[groupName] = entries;
    console.log(
      `✅ Agregado: ${entries.length} registros a "${groupName}" (filas ${startRow}-${endRow}).`
    );
  }

  // Guardar resultado
  const outputDir = "./jsons";
  await mkdir(outputDir, { recursive: true });
  const jsonName = path.basename(csvPath, path.extname(csvPath)) + ".json";
  const outputPath = path.join(outputDir, jsonName);
  await writeFile(outputPath, JSON.stringify(result, null, 2));
  console.log(`\n🎉 Guardado: ${outputPath}`);
}

main().catch(console.error);
