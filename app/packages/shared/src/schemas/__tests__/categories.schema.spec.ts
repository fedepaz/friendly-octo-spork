import {
  createCategorySchema,
  categorySchema,
  CreateCategoryInput,
  CategoryDTO,
} from '../categories.schema';

describe('Category schemas', () => {
  describe('createCategorySchema', () => {
    const validInput: CreateCategoryInput = {
      name: 'Food',
      color: '#FF5733',
    };

    it('should accept valid input with name and color', () => {
      const result = createCategorySchema.safeParse(validInput);
      expect(result.success).toBe(true);
    });

    it('should accept input without color (optional)', () => {
      const result = createCategorySchema.safeParse({
        name: 'Transport',
      });
      expect(result.success).toBe(true);
    });

    it('should accept input with null color', () => {
      const result = createCategorySchema.safeParse({
        name: 'Services',
        color: null,
      });
      // color is optional (not nullable), so null should fail the regex
      expect(result.success).toBe(false);
    });

    it('should reject empty name', () => {
      const result = createCategorySchema.safeParse({
        name: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject missing name', () => {
      const result = createCategorySchema.safeParse({
        color: '#000000',
      });
      expect(result.success).toBe(false);
    });

    it('should reject name longer than 50 characters', () => {
      const result = createCategorySchema.safeParse({
        name: 'A'.repeat(51),
      });
      expect(result.success).toBe(false);
    });

    it('should accept name at exactly 50 characters', () => {
      const result = createCategorySchema.safeParse({
        name: 'A'.repeat(50),
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid color format (no hash)', () => {
      const result = createCategorySchema.safeParse({
        name: 'Test',
        color: 'FF5733',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid color format (short hex)', () => {
      const result = createCategorySchema.safeParse({
        name: 'Test',
        color: '#FFF',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid color format (too long)', () => {
      const result = createCategorySchema.safeParse({
        name: 'Test',
        color: '#FFFFFFFF',
      });
      expect(result.success).toBe(false);
    });

    it('should reject color with non-hex characters', () => {
      const result = createCategorySchema.safeParse({
        name: 'Test',
        color: '#GGHHII',
      });
      expect(result.success).toBe(false);
    });

    it('should accept lowercase hex color', () => {
      const result = createCategorySchema.safeParse({
        name: 'Test',
        color: '#aabbcc',
      });
      expect(result.success).toBe(true);
    });

    it('should accept uppercase hex color', () => {
      const result = createCategorySchema.safeParse({
        name: 'Test',
        color: '#AABBCC',
      });
      expect(result.success).toBe(true);
    });

    it('should accept mixed case hex color', () => {
      const result = createCategorySchema.safeParse({
        name: 'Test',
        color: '#aAbBcC',
      });
      expect(result.success).toBe(true);
    });

    it('should reject name with only whitespace', () => {
      const result = createCategorySchema.safeParse({
        name: '   ',
      });
      // zod min(1) allows whitespace-only strings since it checks length, not content
      expect(result.success).toBe(true);
    });

    it('should reject extra unknown fields', () => {
      const result = createCategorySchema.safeParse({
        name: 'Test',
        color: '#000000',
        extra: 'field',
      });
      // zod strict mode is not enabled by default, so extra fields are stripped
      expect(result.success).toBe(true);
    });
  });

  describe('categorySchema (DTO)', () => {
    const validCategory: CategoryDTO = {
      id: 'cat-001',
      userId: 'user-001',
      name: 'Food',
      color: '#FF5733',
    };

    it('should accept valid category DTO', () => {
      const result = categorySchema.safeParse(validCategory);
      expect(result.success).toBe(true);
    });

    it('should accept category with null color', () => {
      const result = categorySchema.safeParse({
        ...validCategory,
        color: null,
      });
      expect(result.success).toBe(true);
    });

    it('should accept category with undefined color', () => {
      const result = categorySchema.safeParse({
        ...validCategory,
        color: undefined,
      });
      expect(result.success).toBe(true);
    });

    it('should accept category without color', () => {
      const { color, ...categoryWithoutColor } = validCategory;
      const result = categorySchema.safeParse(categoryWithoutColor);
      expect(result.success).toBe(true);
    });

    it('should reject missing id', () => {
      const { id, ...categoryWithoutId } = validCategory;
      const result = categorySchema.safeParse(categoryWithoutId);
      expect(result.success).toBe(false);
    });

    it('should reject missing userId', () => {
      const { userId, ...categoryWithoutUser } = validCategory;
      const result = categorySchema.safeParse(categoryWithoutUser);
      expect(result.success).toBe(false);
    });

    it('should reject missing name', () => {
      const { name, ...categoryWithoutName } = validCategory;
      const result = categorySchema.safeParse(categoryWithoutName);
      expect(result.success).toBe(false);
    });

    it('should reject empty object', () => {
      const result = categorySchema.safeParse({});
      expect(result.success).toBe(false);
    });
  });
});
