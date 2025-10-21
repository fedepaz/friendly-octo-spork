// tests/services/categories.test.ts
import { describe, it, expect, beforeEach, afterEach } from "bun:test";
import { prisma } from "@/lib/prisma";
import { CategoriesService } from "@/api/categories/categories.service";
import { CategoryType } from "@prisma/client";

describe("CategoriesService", () => {
  let service: CategoriesService;
  let testUserId: string;

  beforeEach(async () => {
    // Clean database
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();

    // Create a test user
    const user = await prisma.user.create({
      data: { id: "test-user-123", name: "Test User" },
    });
    testUserId = user.id;

    service = new CategoriesService();
  });

  afterEach(async () => {
    // Clean up
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
  });

  it("should create a category", async () => {
    const category = await service.createCategory(testUserId, {
      name: "Test Category",
      type: CategoryType.GASTO,
      color: "blue",
    });

    expect(category).toBeDefined();
    expect(category.name).toBe("Test Category");
    expect(category.userId).toBe(testUserId);
  });

  it("should get categories for a user", async () => {
    await service.createCategory(testUserId, {
      name: "Category 1",
      type: CategoryType.GASTO,
      color: "red",
    });
    await service.createCategory(testUserId, {
      name: "Category 2",
      type: CategoryType.INGRESO,
      color: "green",
    });

    const categories = await service.getCategories(testUserId);
    expect(categories.length).toBe(2);
    expect(categories[0].name).toBe("Category 1");
  });

  it("should get a single category by ID", async () => {
    const createdCategory = await service.createCategory(testUserId, {
      name: "Single Category",
      type: CategoryType.GASTO,
      color: "yellow",
    });

    const fetchedCategory = await service.getCategoryById(testUserId, createdCategory.id);
    expect(fetchedCategory).toBeDefined();
    expect(fetchedCategory?.name).toBe("Single Category");
  });

  it("should update a category", async () => {
    const createdCategory = await service.createCategory(testUserId, {
      name: "Old Name",
      type: CategoryType.GASTO,
      color: "orange",
    });

    const updatedCategory = await service.updateCategory(testUserId, createdCategory.id, {
      name: "New Name",
    });

    expect(updatedCategory.name).toBe("New Name");
  });

  it("should delete a category", async () => {
    const createdCategory = await service.createCategory(testUserId, {
      name: "To Delete",
      type: CategoryType.GASTO,
      color: "purple",
    });

    await service.deleteCategory(testUserId, createdCategory.id);

    const deletedCategory = await service.getCategoryById(testUserId, createdCategory.id);
    expect(deletedCategory).toBeNull();
  });

  it("should not get another user's category", async () => {
    const otherUser = await prisma.user.create({
      data: { id: "other-user-id", name: "Other User" },
    });
    const otherCategory = await service.createCategory(otherUser.id, {
      name: "Other Category",
      type: CategoryType.GASTO,
      color: "pink",
    });

    const fetchedCategory = await service.getCategoryById(testUserId, otherCategory.id);
    expect(fetchedCategory).toBeNull();
  });
});
