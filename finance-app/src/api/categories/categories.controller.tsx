// src/api/categories/categories.controller.tsx

import { CategoriesPage } from "@/pages/CategoriesPage";
import {
  categoryFilterSchema,
  type CreateCategoryInput,
} from "./categories.schema";
import { CategoriesService } from "./categories.service";
import { ErrorPage } from "@/pages/ErrorPage";
import type { Context } from "hono";
import { CategoriesList } from "@/components/categories/CategoriesList";
import type { CategoryType } from "@/generated/prisma";
import { CategoryForm } from "@/components/categories/CategoryForm";

export class CategoriesController {
  private categoryService = new CategoriesService();

  getCategoriesPage = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;
      const filters = categoryFilterSchema.parse(c.req.query());

      const categories = await this.categoryService.getCategories(
        userId,
        filters
      );

      return c.render(<CategoriesPage categories={categories} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  getCategoriesList = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const categories = await this.categoryService.getCategories(userId);

      return c.html(<CategoriesList categories={categories} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  createCategory = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      // Parse form data for HTMX requests
      const contentType = c.req.header("content-type");
      let data: CreateCategoryInput;

      if (contentType?.includes("application/json")) {
        data = await c.req.json();
      } else {
        // Handle form data from HTMX
        const formData = await c.req.parseBody();
        data = {
          name: formData.name as string,
          type: formData.type as CategoryType,
          color: formData.color as string,
        };
      }
      await this.categoryService.createCategory(userId, data);

      const categories = await this.categoryService.getCategories(userId);
      return c.html(<CategoriesList categories={categories} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };

  getCategoryForm = async (c: Context) => {
    return c.html(<CategoryForm />);
  };
}
