// src/api/categories/categories.routes.ts
import { Hono } from "hono";
import { CategoriesController } from "./categories.controller";

const categoriesRoutes = new Hono();
const controller = new CategoriesController();

// Page route
categoriesRoutes.get("/", controller.getCategoriesPage);

// API routes
categoriesRoutes.get("/api/categories", controller.listCategories);
categoriesRoutes.post("/api/categories", ...controller.createCategory);
categoriesRoutes.get("/api/categories/:id", controller.getCategory);
categoriesRoutes.put("/api/categories/:id", ...controller.updateCategory);
categoriesRoutes.delete("/api/categories/:id", controller.deleteCategory);

export default categoriesRoutes;