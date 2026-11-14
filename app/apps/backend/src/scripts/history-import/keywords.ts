// apps/backend/src/scripts/history-import/keywords.ts
// Concept keyword tables: TRANSFERENCIAS classification (parse stage) and
// category mapping (import stage). Categories are the app's fixed seeded set.
import type { ImportTxType } from './types';

const INCOME_KEYWORDS = [
  'sueldo',
  'aumento',
  'aguinaldo',
  'prestamo',
  'inversion',
  'rendimiento',
  'bono',
  'reembolso',
  'devolucion',
  'haberes',
];

const TRANSFER_KEYWORDS = [
  'transferencia',
  'mespasado',
  'mes que viene',
  'vuelta',
  'traslado',
  'entre cuentas',
];

function normalize(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, ' ');
}

/** Type for rows of a KEYWORD-classified table (TRANSFERENCIAS). */
export function classifyType(concept: string): ImportTxType {
  const c = normalize(concept);
  if (TRANSFER_KEYWORDS.some((k) => c.includes(k))) return 'TRANSFER';
  if (INCOME_KEYWORDS.some((k) => c.includes(k))) return 'INCOME';
  return 'EXPENSE';
}

/** The app's 25 fixed seeded categories (categories are read-only). */
export const FIXED_CATEGORIES = [
  'Groceries & Food Shopping',
  'Restaurants & Takeout',
  'Alcohol & Beverages',
  'Tobacco & Smoking',
  'Transportation - Fuel',
  'Transportation - Public/Rideshare',
  'Vehicle Maintenance',
  'Rent & Housing',
  'Utilities & Services',
  'Personal Care & Grooming',
  'Clothing & Footwear',
  'Health & Medical',
  'Gym & Sports',
  'Entertainment & Social',
  'Subscriptions & Memberships',
  'Household & Cleaning',
  'Hardware & Electronics',
  'Home Improvement & Tools',
  'Gifts & Special Occasions',
  'Miscellaneous/Other',
  'Income',
  'Education',
  'Pets',
  'Professional Services',
  'Taxes & Fees',
] as const;

interface CategoryRule {
  category: string;
  keywords: string[];
}

/**
 * Ordered keyword rules → fixed categories. Keywords of length >= 5 match as
 * substrings (compound concepts like "polloTuca"); shorter keywords match
 * whole tokens only (so "pan" never matches "pantalon").
 */
const CATEGORY_RULES: CategoryRule[] = [
  {
    category: 'Taxes & Fees',
    keywords: [
      'impuesto',
      'multa',
      'tasa',
      'arancel',
      'comision',
      'contribucion',
      'ganancias',
      'afip',
      'vencimiento',
    ],
  },
  {
    category: 'Health & Medical',
    keywords: [
      'farmacia',
      'medico',
      'dentista',
      'dientes',
      'clinica',
      'hospital',
      'obra social',
      'osde',
      'receta',
      'salud',
    ],
  },
  {
    category: 'Gym & Sports',
    keywords: ['gimnasio', 'gym', 'natacion', 'pesas', 'futbol'],
  },
  {
    category: 'Tobacco & Smoking',
    keywords: ['tabaco', 'cigarrillo', 'pucho'],
  },
  {
    category: 'Alcohol & Beverages',
    keywords: [
      'cerveza',
      'birra',
      'fernet',
      'trago',
      'chopp',
      'alcohol',
      'vino',
    ],
  },
  {
    category: 'Transportation - Fuel',
    keywords: ['combustible', 'gasolina', 'gasoil', 'nafta'],
  },
  {
    category: 'Transportation - Public/Rideshare',
    keywords: [
      'colectivo',
      'subte',
      'pasaje',
      'peaje',
      'remis',
      'bondi',
      'uber',
      'taxi',
      'sube',
    ],
  },
  {
    category: 'Vehicle Maintenance',
    keywords: ['taller', 'mecanico', 'cubierta', 'frenos', 'motor'],
  },
  {
    category: 'Rent & Housing',
    keywords: [
      'alquiler',
      'alquileres',
      'alquler',
      'expensas',
      'hipoteca',
      'vivienda',
    ],
  },
  {
    category: 'Utilities & Services',
    keywords: [
      'edesur',
      'edenor',
      'internet',
      'telefono',
      'cable',
      'luz',
      'agua',
      'gas',
    ],
  },
  {
    category: 'Groceries & Food Shopping',
    keywords: [
      'supermercado',
      'verduleria',
      'carniceria',
      'panaderia',
      'dietetica',
      'mayorista',
      'hipermercado',
      'almacen',
      'mercado',
      'compras',
      'queso',
      'pan',
    ],
  },
  {
    category: 'Restaurants & Takeout',
    keywords: [
      'restaurante',
      'pizzeria',
      'almuerzo',
      'desayuno',
      'bodegon',
      'delivery',
      'helado',
      'pollo',
      'cena',
      'asado',
      'sushi',
    ],
  },
  {
    category: 'Personal Care & Grooming',
    keywords: [
      'peluqueria',
      'barberia',
      'manicura',
      'estetica',
      'perfume',
      'perfumeria',
    ],
  },
  {
    category: 'Clothing & Footwear',
    keywords: [
      'pantalon',
      'remera',
      'zapatos',
      'campera',
      'indumentaria',
      'shorts',
      'bermuda',
      'guantes',
      'ropa',
      'buzo',
    ],
  },
  {
    category: 'Household & Cleaning',
    keywords: [
      'limpieza',
      'detergente',
      'jabon',
      'esponja',
      'muebles',
      'heladera',
      'ventilador',
    ],
  },
  {
    category: 'Hardware & Electronics',
    keywords: [
      'notebook',
      'computadora',
      'celular',
      'monitor',
      'mouse',
      'teclado',
      'auricular',
      'cargador',
      'impresora',
      'parlante',
      'electronico',
    ],
  },
  {
    category: 'Home Improvement & Tools',
    keywords: ['herramienta', 'pintura', 'taladro', 'clavo', 'remodelacion'],
  },
  {
    category: 'Subscriptions & Memberships',
    keywords: [
      'suscrip',
      'disney',
      'netflix',
      'spotify',
      'abono',
      'membresia',
      'cuota',
    ],
  },
  {
    category: 'Gifts & Special Occasions',
    keywords: ['regalo', 'cumpleanos', 'cumple', 'obsequio', 'navidad'],
  },
  {
    category: 'Education',
    keywords: [
      'curso',
      'universidad',
      'colegio',
      'escuela',
      'matricula',
      'beca',
      'libro',
    ],
  },
  {
    category: 'Pets',
    keywords: ['mascota', 'veterinaria', 'perro', 'pienso', 'gato'],
  },
  {
    category: 'Professional Services',
    keywords: ['honorario', 'asesoria', 'contador', 'abogado', 'profesional'],
  },
  {
    category: 'Entertainment & Social',
    keywords: [
      'fiesta',
      'salida',
      'vacaciones',
      'entradas',
      'evento',
      'teatro',
      'viaje',
      'cine',
      'juego',
    ],
  },
];

/** Tokens for short-keyword matching: splits camelCase before normalizing. */
function tokensForMatch(s: string): string[] {
  const camel = s.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  return normalize(camel)
    .split(/[^a-z0-9]+/)
    .filter((t) => t !== '');
}

export function classifyCategory(
  concept: string,
  type: ImportTxType,
): string | null {
  if (type === 'INCOME') return 'Income';
  if (type === 'TRANSFER') return null;

  const flat = normalize(concept);
  const tokens = new Set(tokensForMatch(concept));

  for (const rule of CATEGORY_RULES) {
    for (const kw of rule.keywords) {
      if (kw.length >= 5) {
        if (flat.includes(kw)) return rule.category;
      } else if (tokens.has(kw)) {
        return rule.category;
      }
    }
  }
  return 'Miscellaneous/Other';
}
