
import fs from 'fs/promises';
import path from 'path';
import readline from 'readline';

const CSV_DIR = path.join(process.cwd(), 'plantillaInicial', 'informacionInicial');
const PROGRESS_FILE = path.join(process.cwd(), 'json_structured_data', 'structuring_progress.json');

interface StructuringProgress {
  column_types: { [key: number]: string };
  files: { [filename: string]: { checked: boolean; columns_used: number[] } };
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
};

async function loadProgress(): Promise<StructuringProgress> {
  try {
    const data = await fs.readFile(PROGRESS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      console.log('Progress file not found. Creating a new one.');
      return { column_types: {}, files: {} };
    }
    throw error;
  }
}

async function saveProgress(progress: StructuringProgress) {
  await fs.mkdir(path.dirname(PROGRESS_FILE), { recursive: true });
  await fs.writeFile(PROGRESS_FILE, JSON.stringify(progress, null, 2), 'utf-8');
}

function displayColumnTypes(column_types: { [key: number]: string }) {
    console.log('\n--- 🗂️ Master Column Types ---');
    const keys = Object.keys(column_types).map(Number).sort((a, b) => a - b);
    if (keys.length === 0) {
        console.log('None yet.');
        return;
    }
    for (const key of keys) {
        console.log(`${key}: ${column_types[key]}`);
    }
}

const monthMap: { [key: string]: number } = {
    'enero': 1, 'febrero': 2, 'marzo': 3, 'abril': 4, 'mayo': 5, 'junio': 6,
    'julio': 7, 'agosto': 8, 'septiembre': 9, 'octubre': 10, 'noviembre': 11, 'diciembre': 12
};

function parseFilename(filename: string): { year: number; month: number } {
    const match = filename.toLowerCase().match(/^([a-z]+)(\d{4})/);
    if (match) {
        const monthName = match[1];
        const year = parseInt(match[2], 10);
        const month = monthMap[monthName];
        if (month) {
            return { year, month };
        }
    }
    // Return a default value for sorting if parsing fails
    return { year: 9999, month: 13 };
}


async function main() {
  const progress = await loadProgress();
  const allCsvFiles = (await fs.readdir(CSV_DIR)).filter(f => f.endsWith('.csv'));

  // Sort files chronologically
  allCsvFiles.sort((fileA, fileB) => {
      const dateA = parseFilename(fileA);
      const dateB = parseFilename(fileB);
      if (dateA.year !== dateB.year) {
          return dateA.year - dateB.year;
      }
      return dateA.month - dateB.month;
  });

  const nextFile = allCsvFiles.find(file => !progress.files[file]);

  if (!nextFile) {
    console.log('\n🎉 All files have been processed! Congratulations!');
    rl.close();
    return;
  }

  console.log(`\n--- 🚀 Starting New Structuring Session ---`);
  console.log(`\nFile to process: ${nextFile}`);
  console.log('Please open this file to determine which column types to use.');

  let columnsUsedForFile: number[] = [];

  while (true) {
    displayColumnTypes(progress.column_types);
    const answer = await question("\nEnter column indices used in this file (e.g., '1,3'), or type 'new' to add a type: ");

    if (answer.toLowerCase() === 'new') {
      const newTypeName = await question('Enter the name for the new column type: ');
      if (newTypeName) {
        const nextId = Math.max(0, ...Object.keys(progress.column_types).map(Number)) + 1;
        progress.column_types[nextId] = newTypeName;
        console.log(`Added new type: ${nextId}: ${newTypeName}`);
        await saveProgress(progress); // Save immediately after adding
      } else {
        console.log('New type name cannot be empty.');
      }
    } else if (answer) {
      const indices = answer.split(',').map(s => parseInt(s.trim(), 10)).filter(n => !isNaN(n));
      const validIndices = indices.filter(i => progress.column_types[i]);
      
      if (validIndices.length !== indices.length) {
        console.log('Error: One or more indices are invalid. Please try again.');
        continue;
      }
      columnsUsedForFile = validIndices.sort((a, b) => a - b);
      break;
    }
  }

  console.log('\n--- 📝 Review and Confirm ---');
  console.log(`For file: ${nextFile}`);
  console.log('You have selected the following columns:');
  for (const index of columnsUsedForFile) {
    console.log(`  - ${index}: ${progress.column_types[index]}`);
  }

  const confirmation = await question('Is this correct? (y/n): ');

  if (confirmation.toLowerCase() === 'y') {
    progress.files[nextFile] = {
      checked: true,
      columns_used: columnsUsedForFile
    };
    await saveProgress(progress);
    console.log(`\n--- ✅ Session Saved ---`);
    console.log(`'${nextFile}' has been marked as complete.`);
  } else {
    console.log('\n❌ Aborted. No changes saved for this file. Run the script again to restart.');
  }

  console.log('\nRun the script again to process the next file or finish.');
  rl.close();
}

main().catch(console.error);
