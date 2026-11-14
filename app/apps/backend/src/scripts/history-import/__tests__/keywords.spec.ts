// apps/backend/src/scripts/history-import/__tests__/keywords.spec.ts
import { FIXED_CATEGORIES, classifyCategory, classifyType } from '../keywords';

describe('classifyType (keyword tables)', () => {
  it('returns income for income keywords, transfer for transfer keywords', () => {
    expect(classifyType('sueldo')).toBe('INCOME');
    expect(classifyType('Aumento quincenal')).toBe('INCOME');
    expect(classifyType('aguinaldo')).toBe('INCOME');
    expect(classifyType('mesPasado')).toBe('TRANSFER');
    expect(classifyType('transferencia a caja')).toBe('TRANSFER');
    expect(classifyType('alquiler')).toBe('EXPENSE');
  });
});

describe('classifyCategory: fixed category set', () => {
  it('exposes exactly the 25 seeded categories', () => {
    expect(FIXED_CATEGORIES).toHaveLength(25);
    expect(FIXED_CATEGORIES).toContain('Rent & Housing');
    expect(FIXED_CATEGORIES).toContain('Miscellaneous/Other');
    expect(FIXED_CATEGORIES).toContain('Income');
    expect(FIXED_CATEGORIES).toContain('Transportation - Public/Rideshare');
  });

  it('routes all INCOME transactions to Income', () => {
    expect(classifyCategory('sueldo', 'INCOME')).toBe('Income');
    expect(classifyCategory('whatever', 'INCOME')).toBe('Income');
  });

  it('leaves TRANSFER transactions uncategorized', () => {
    expect(classifyCategory('mesPasado', 'TRANSFER')).toBeNull();
  });

  it('maps common expense keywords to their fixed category', () => {
    expect(classifyCategory('alquiler eze', 'EXPENSE')).toBe('Rent & Housing');
    expect(classifyCategory('sube', 'EXPENSE')).toBe(
      'Transportation - Public/Rideshare',
    );
    expect(classifyCategory('farmacia', 'EXPENSE')).toBe('Health & Medical');
    expect(classifyCategory('edesur', 'EXPENSE')).toBe('Utilities & Services');
    expect(classifyCategory('tabaco', 'EXPENSE')).toBe('Tobacco & Smoking');
    expect(classifyCategory('notebook', 'EXPENSE')).toBe(
      'Hardware & Electronics',
    );
    expect(classifyCategory('multas', 'EXPENSE')).toBe('Taxes & Fees');
    expect(classifyCategory('gym', 'EXPENSE')).toBe('Gym & Sports');
    expect(classifyCategory('disney+', 'EXPENSE')).toBe(
      'Subscriptions & Memberships',
    );
    expect(classifyCategory('veterinaria', 'EXPENSE')).toBe('Pets');
    expect(classifyCategory('curso de cocina', 'EXPENSE')).toBe('Education');
    expect(classifyCategory('nafta', 'EXPENSE')).toBe('Transportation - Fuel');
    expect(classifyCategory('cerveza', 'EXPENSE')).toBe('Alcohol & Beverages');
    expect(classifyCategory('limpieza', 'EXPENSE')).toBe(
      'Household & Cleaning',
    );
    expect(classifyCategory('peluqueria', 'EXPENSE')).toBe(
      'Personal Care & Grooming',
    );
    expect(classifyCategory('regalo cumple', 'EXPENSE')).toBe(
      'Gifts & Special Occasions',
    );
    expect(classifyCategory('honorarios', 'EXPENSE')).toBe(
      'Professional Services',
    );
  });

  it('is case- and accent-insensitive', () => {
    expect(classifyCategory('FARMACIA', 'EXPENSE')).toBe('Health & Medical');
    expect(classifyCategory('ALQUILER', 'EXPENSE')).toBe('Rent & Housing');
    expect(classifyCategory('peluquería', 'EXPENSE')).toBe(
      'Personal Care & Grooming',
    );
  });

  it('uses token matching for short keywords (no substring accidents)', () => {
    expect(classifyCategory('pan', 'EXPENSE')).toBe(
      'Groceries & Food Shopping',
    );
    // 'pan' inside 'pantalon' must NOT hit groceries
    expect(classifyCategory('pantalon', 'EXPENSE')).toBe('Clothing & Footwear');
  });

  it('matches longer keywords as substrings (e.g. compound concepts)', () => {
    expect(classifyCategory('polloTuca', 'EXPENSE')).toBe(
      'Restaurants & Takeout',
    );
    expect(classifyCategory('birraMila', 'EXPENSE')).toBe(
      'Alcohol & Beverages',
    );
  });

  it('falls back to Miscellaneous/Other for unknown concepts', () => {
    expect(classifyCategory('xyzzy123', 'EXPENSE')).toBe('Miscellaneous/Other');
    expect(classifyCategory('', 'EXPENSE')).toBe('Miscellaneous/Other');
  });

  it('always returns a member of the fixed category set', () => {
    const samples = [
      'alquiler',
      'sube',
      'desconocido total',
      'sueldo',
      'comida rara',
    ];
    for (const s of samples) {
      const cat = classifyCategory(s, 'EXPENSE');
      expect(FIXED_CATEGORIES).toContain(cat);
    }
    expect(FIXED_CATEGORIES).toContain(classifyCategory('sueldo', 'INCOME')!);
  });
});
