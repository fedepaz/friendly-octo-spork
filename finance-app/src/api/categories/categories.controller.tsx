// src/api/categories/categories.controller.tsx

import { CategoriesPage } from "@/pages/CategoriesPage";
import { CategoriesService } from "./categories.service";
import { ErrorPage } from "@/pages/ErrorPage";
import type { Context } from "hono";

export class CategoriesController {
  private categoryService = new CategoriesService();

  getCategoriesPage = async (c: Context) => {
    try {
      const payload = c.get("jwtPayload") as { sub: string };
      const userId = payload.sub;

      const categories = await this.categoryService.findCategories(userId);

      return c.render(<CategoriesPage categories={categories} />);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error";
      const stack = error instanceof Error ? error.stack : undefined;
      return c.render(<ErrorPage message={message} stack={stack} />);
    }
  };
}
