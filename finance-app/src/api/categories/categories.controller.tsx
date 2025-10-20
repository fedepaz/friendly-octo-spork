// src/api/categories/categories.controller.tsx
import { Context } from "hono";
import { zValidator } from "@hono/zod-validator";
import { CategoriesService } from "./categories.service";
import { createCategorySchema, updateCategorySchema } from "./categories.schema";

// Assume these components exist and will be created later
const CategoriesPage = (props: any) => <div>Categories Page</div>;
const CategoriesList = (props: any) => <div>Categories List</div>;
const CategoryForm = (props: any) => <div>Category Form</div>;

export class CategoriesController {
  private service = new CategoriesService();

  // GET /categories -> Renders the full page
  public getCategoriesPage = async (c: Context) => {
    const userId = c.get("userId");
    const categories = await this.service.getCategories(userId);
    return c.render(<CategoriesPage categories={categories} />);
  };

  // GET /api/categories -> Returns a list of categories (for HTMX)
  public listCategories = async (c: Context) => {
    const userId = c.get("userId");
    const categories = await this.service.getCategories(userId);
    return c.html(<CategoriesList categories={categories} />);
  };

  // POST /api/categories -> Creates a new category
  public createCategory = [
    zValidator("form", createCategorySchema),
    async (c: Context) => {
      const userId = c.get("userId");
      const data = c.req.valid("form");

      const newCategory = await this.service.createCategory(userId, data);

      c.status(201);
      return c.json(newCategory);
    },
  ];

  // GET /api/categories/:id -> Gets a single category
  public getCategory = async (c: Context) => {
    const userId = c.get("userId");
    const id = Number(c.req.param("id"));
    const category = await this.service.getCategoryById(userId, id);
    if (!category) {
      return c.json({ error: "Not Found" }, 404);
    }
    return c.json(category);
  };

  // PUT /api/categories/:id -> Updates a category
  public updateCategory = [
    zValidator("form", updateCategorySchema),
    async (c: Context) => {
      const userId = c.get("userId");
      const id = Number(c.req.param("id"));
      const data = c.req.valid("form");

      const updatedCategory = await this.service.updateCategory(userId, id, data);

      return c.json(updatedCategory);
    },
  ];

  // DELETE /api/categories/:id -> Deletes a category
  public deleteCategory = async (c: Context) => {
    const userId = c.get("userId");
    const id = Number(c.req.param("id"));

    await this.service.deleteCategory(userId, id);

    c.status(204);
    return c.body(null);
  };
}