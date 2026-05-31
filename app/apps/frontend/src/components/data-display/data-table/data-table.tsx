/* eslint-disable react-hooks/incompatible-library */
// src/components/data-display/data-table/data-table.tsx
"use client";

import { Fragment, ReactNode, useEffect, useMemo, useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Filter,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ExportDropdown } from "@/components/data-display/data-table/export-dropdown";
import { usePermission } from "@/hooks/usePermission";
import { useBreakpoint } from "@/hooks/useMediaQuery";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title: string;
  tableName: string;
  description?: string;
  onView?: (row: TData) => void;
  onExport?: (
    format: "csv" | "excel" | "json" | "pdf",
    selectedRows: TData[],
  ) => void;
  loading?: boolean;
  totalCount?: number;
  enableSelection?: boolean;
  toolbarContent?: ReactNode;
}

function HeaderComponent({ titulo }: { titulo: string }) {
  return (
    <div className="items-center justify-between">
      <div className="text-center"> {titulo}</div>
    </div>
  );
}
export function DataTable<TData, TValue>({
  columns,
  data,
  title,
  description,
  tableName,
  onView,
  onExport,
  totalCount = 0,
  enableSelection,
  toolbarContent,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const breakpoint = useBreakpoint();

  const dataTablePermissions = usePermission(tableName);

  const allowedActions = {
    canView: !!onView && dataTablePermissions.canRead,
  };

  const selectColumn: ColumnDef<TData, TValue> = {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Seleccionar todo"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Seleccionar fila"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };

  const actionColumn: ColumnDef<TData, TValue> = {
    id: "actions",
    enableHiding: false,
    accessorKey: "actions",
    header: ({}) => {
      if (!allowedActions.canView) return null;
      return <HeaderComponent titulo="Acciones" />;
    },
    cell: ({ row }) => {
      if (!allowedActions.canView) return null;

      return (
        <div className="flex items-center justify-center gap-2 min-h-[40px]">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="min-h-[40px] text-muted-foreground"
                onClick={() => onView?.(row.original)}
                aria-label="Ver detalles"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="border border-border shadow-md bg-popover"
            >
              <p>Ver detalles</p>
            </TooltipContent>
          </Tooltip>
        </div>
      );
    },
  };

  const enhancedColumns = useMemo(() => {
    // Smart logic: show it if explicitly enabled OR default to true
    const showSelection = enableSelection ?? true;

    let result = [...columns];

    if (showSelection) {
      result = [selectColumn, ...result];
    }

    return [...result, actionColumn];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columns, enableSelection]);

  const table = useReactTable({
    data,
    columns: enhancedColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "includesString",
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  useEffect(() => {
    const allColumns = table.getAllColumns();
    const columnsId = allColumns.map((column) => column.id);

    const visibility: VisibilityState = {};

    // 768px (md) target: Squeeze the data to fit
    // We prioritize keeping core data and the actions column
    let visibleCount = columnsId.length;

    if (breakpoint === "sm") {
      visibleCount = 2; // Mobile: Minimal data
    } else if (breakpoint === "md") {
      visibleCount = 3; // Cheap Screen (768px): Focus on the essentials
    } else if (breakpoint === "lg") {
      visibleCount = 5; // Standard Laptop
    }

    columnsId.forEach((id, index) => {
      if (id === "actions" || id === "select") {
        visibility[id] = true; // Never hide actions or selection
      } else {
        visibility[id] = index < visibleCount;
      }
    });

    setColumnVisibility(visibility);
  }, [breakpoint, table]);

  const handleExport = (format: "csv" | "excel" | "json" | "pdf") => {
    if (onExport) {
      const selectedRows = table
        .getFilteredSelectedRowModel()
        .rows.map((row) => row.original);
      const rowsToExport = selectedRows.length > 0 ? selectedRows : data;
      onExport(format, rowsToExport);
    }
  };

  const selectedCount = table.getFilteredSelectedRowModel().rows.length;

  return (
    <>
      <Card className="w-full flex-1 flex flex-col overflow-hidden">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">{title}</CardTitle>
              {description && (
                <CardDescription className="mt-2">
                  {description}
                </CardDescription>
              )}
            </div>

            {totalCount > 0 ? (
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="text-sm">
                  {`${totalCount} registros`}
                </Badge>
              </div>
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center px-4 py-2 space-x-2 shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 text-xs">
                  <Filter className="mr-2 h-3.5 w-3.5" />
                  {breakpoint === "sm" ? "" : "Columnas"}

                  <ChevronDown className="ml-1 h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>

            {dataTablePermissions.canRead && (
              <ExportDropdown
                onExport={handleExport}
                selectedCount={selectedCount}
                totalCount={data.length}
                disabled={data.length === 0}
              />
            )}

            {toolbarContent && (
              <div className="flex-1 flex items-center gap-2">
                {toolbarContent}
              </div>
            )}
          </div>
          <div className="flex-1 overflow-auto px-4">
            <div className="rounded-md border">
              <Table className="min-w-full">
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className="hover:bg-transparent"
                    >
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            key={header.id}
                            className="h-9 py-1 text-xs"
                          >
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <Fragment key={row.id}>
                        <TableRow
                          data-state={row.getIsSelected() && "selected"}
                          className="hover:bg-accent/50 group"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell
                              key={cell.id}
                              className="py-1 px-3 text-sm h-10"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      </Fragment>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={enhancedColumns.length}
                        className="h-24 text-center"
                      >
                        No se encontraron resultados
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 px-4 py-2 shrink-0 border-t mt-auto">
            {" "}
            <div className="flex-1 text-[11px] text-muted-foreground">
              {`${table.getFilteredSelectedRowModel().rows.length} de ${table.getFilteredRowModel().rows.length} fila(s) seleccionada(s).`}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center space-x-2">
                <p className="text-[11px] font-medium">Filas por página</p>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                  className="h-7 w-[60px] rounded border border-input bg-background px-1 text-[11px]"
                >
                  {[10, 20, 30, 40, 50, 100].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      {pageSize}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex w-[80px] items-center justify-center text-[11px] font-medium">
                {`Página ${table.getState().pagination.pageIndex + 1} de ${table.getPageCount()}`}
              </div>
              <div className="flex items-center space-x-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="hidden h-7 w-7 p-0 lg:flex bg-transparent"
                      onClick={() => table.setPageIndex(0)}
                      disabled={!table.getCanPreviousPage()}
                      aria-label="Ir a la primera página"
                    >
                      {"<<"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="border border-border shadow-md"
                  >
                    <p>Primera página</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-7 w-7 p-0 bg-transparent"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                      aria-label="Ir a la página anterior"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="border border-border shadow-md"
                  >
                    <p>Página anterior</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-7 w-7 p-0 bg-transparent"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                      aria-label="Ir a la página siguiente"
                    >
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="border border-border shadow-md"
                  >
                    <p>Siguiente página</p>
                  </TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      className="hidden h-7 w-7 p-0 lg:flex bg-transparent"
                      onClick={() =>
                        table.setPageIndex(table.getPageCount() - 1)
                      }
                      disabled={!table.getCanNextPage()}
                      aria-label="Ir a la última página"
                    >
                      {">>"}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    className="border border-border shadow-md"
                  >
                    <p>Última página</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

// Sortable header component
export function SortableHeader({
  column,
  children,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  column: any;
  children: ReactNode;
}) {
  const isSorted = column.getIsSorted();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(isSorted === "asc")}
          className="h-auto p-0 font-semibold hover:bg-transparent"
          aria-label={
            isSorted === "asc"
              ? "Ordenar descendente"
              : isSorted === "desc"
                ? "Quitar orden"
                : "Ordenar ascendente"
          }
        >
          {children}
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="top" className="border border-border shadow-md">
        <p>
          {isSorted === "asc"
            ? "Click para orden descendente"
            : isSorted === "desc"
              ? "Click para quitar orden"
              : "Click para orden ascendente"}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
