// src/components/data-display/data-table/table-features.ts
// TanStack Table v9 feature set + pre-bound type aliases for app tables.

import {
  columnFacetingFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
  constructFilterFn,
  createFacetedUniqueValues,
  createFilteredRowModel,
  createPaginatedRowModel,
  createSortedRowModel,
  filterFns,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  rowSortingFeature,
  tableFeatures,
} from "@tanstack/react-table";
import type {
  Column as CoreColumn,
  ColumnDef as CoreColumnDef,
  Row as CoreRow,
  RowData,
  Table as CoreTable,
} from "@tanstack/react-table";

/**
 * Multi-select facet filter that accepts string **or** array cell values.
 * v9's built-in `arrIncludesSome` rejects non-array data (`return false`),
 * while v8 used `value.includes()` so string columns (type, category) worked.
 */
export const includesSomeFilterFn = constructFilterFn({
  filter: (dataValue: unknown, filterValue: unknown) => {
    if (!Array.isArray(filterValue) || filterValue.length === 0) return true;
    if (Array.isArray(dataValue)) {
      return filterValue.some((v) => dataValue.includes(v));
    }
    return filterValue.includes(dataValue);
  },
  autoRemove: (val: unknown) =>
    val === undefined ||
    val === null ||
    val === "" ||
    (Array.isArray(val) && val.length === 0),
});

export const dataTableFeatures = tableFeatures({
  rowSortingFeature,
  columnFilteringFeature,
  columnVisibilityFeature,
  rowPaginationFeature,
  rowSelectionFeature,
  globalFilteringFeature,
  columnFacetingFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createSortedRowModel(),
  paginatedRowModel: createPaginatedRowModel(),
  facetedUniqueValues: createFacetedUniqueValues(),
  filterFns: { ...filterFns, includesSome: includesSomeFilterFn },
});

export type DataTableFeatures = typeof dataTableFeatures;

/** ColumnDef pre-bound to the app feature set (v9: features is the first type param). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ColumnDef<TData extends RowData, TValue = any> = CoreColumnDef<
  DataTableFeatures,
  TData,
  TValue
>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Column<TData extends RowData, TValue = any> = CoreColumn<
  DataTableFeatures,
  TData,
  TValue
>;

export type Row<TData extends RowData> = CoreRow<DataTableFeatures, TData>;

export type DataTableInstance<TData extends RowData> = CoreTable<
  DataTableFeatures,
  TData
>;
