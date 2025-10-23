// src/api/categories/categories.routes.ts

import { Hono } from "hono";
import { CategoriesController } from "./categories.controller";

const categoriesRoutes = new Hono();
const categoriesController = new CategoriesController();

categoriesRoutes.get("/", categoriesController.getCategoriesPage);
categoriesRoutes.get("/new", categoriesController.getCategoryForm);
categoriesRoutes.post("/", categoriesController.createCategory);

export default categoriesRoutes;
