// src/features/createTransaction/hooks/useCategoriesHook.ts

import { useSuspenseQuery } from "@tanstack/react-query";
import { categoryService } from "../api/categoriesService";
import { CategoryDTO } from "@repo/shared";

export const categoryProfileQueryKeys = {
  all: () => ["categories"] as const,
  byId: (id: string) =>
    [...categoryProfileQueryKeys.all(), "byId", id] as const,
};

export const useCategorie = () => {
  return useSuspenseQuery<CategoryDTO[]>({
    queryKey: categoryProfileQueryKeys.all(),
    queryFn: categoryService.fetchAll,
    retry: 1, // Retry once to account for transient network issues
  });
};

export const useCategorieById = (id: string) => {
  return useSuspenseQuery<CategoryDTO | null>({
    queryKey: categoryProfileQueryKeys.byId(id),
    queryFn: () => categoryService.fetchById(id),
    retry: 1, // Retry once to account for transient network issues
  });
};
