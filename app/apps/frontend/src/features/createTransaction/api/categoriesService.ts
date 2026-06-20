// src/features/createTransaction/api/categoriesService.ts

import { clientFetch } from "@/lib/api/client-fetch";
import { CategoryDTO } from "@repo/shared";

export const categoryService = {
  fetchAll: () => {
    return clientFetch<CategoryDTO[]>("categories", { method: "GET" });
  },

  fetchById: (id: string) => {
    return clientFetch<CategoryDTO | null>(`categories/${id}`, {
      method: "GET",
    });
  },
};
