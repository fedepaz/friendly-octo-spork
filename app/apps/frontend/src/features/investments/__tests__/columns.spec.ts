import { investmentColumns } from '../components/columns';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

describe('investmentColumns', () => {
  it('should export exactly 5 columns', () => {
    expect(investmentColumns).toHaveLength(5);
  });

  it('should have correct accessorKey values', () => {
    const keys = investmentColumns.map((col) => col.accessorKey);
    expect(keys).toEqual([
      'name',
      'currency',
      'principal',
      'totalEarned',
      'totalValue',
    ]);
  });

  it('should have header functions for all columns', () => {
    for (const col of investmentColumns) {
      expect(typeof col.header).toBe('function');
    }
  });

  it('should have cell functions for all columns', () => {
    for (const col of investmentColumns) {
      expect(typeof col.cell).toBe('function');
    }
  });

  it('should have sortable name column', () => {
    const nameCol = investmentColumns[0];
    expect(nameCol.accessorKey).toBe('name');
    expect(nameCol.header).toBeDefined();
  });

  it('should have sortable totalValue column', () => {
    const totalCol = investmentColumns[4];
    expect(totalCol.accessorKey).toBe('totalValue');
    expect(totalCol.header).toBeDefined();
  });
});
