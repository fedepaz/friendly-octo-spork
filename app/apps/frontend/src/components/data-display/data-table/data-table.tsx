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
  Search,
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
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
        <div className="flex items-center justify-center gap-2 min-h-10">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="min-h-10 text-muted-foreground"
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
      <Card className="w-full flex flex-col overflow-hidden bg-card/40 border-border/40 shadow-premium rounded-none my-2 ">
        <CardHeader className="px-5 pt-5 pb-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-sm font-black uppercase tracking-widest text-foreground">
                {title}
              </CardTitle>
              {description && (
                <CardDescription className="text-[10px] font-bold uppercase text-muted-foreground/40 tracking-tight">
                  {description}
                </CardDescription>
              )}
            </div>

            {totalCount > 0 ? (
              <div className="flex items-center px-2 py-0.5 bg-primary/10 border border-primary/20">
                <span className="text-[10px] font-black text-primary uppercase tracking-tighter">
                  {totalCount} REGISTROS
                </span>
              </div>
            ) : null}
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 flex flex-col min-h-0 overflow-hidden">
          <div className="flex items-center px-5 py-2 space-x-3 shrink-0 border-y border-border/20 bg-background/40">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 bg-background/40 border-border/40 hover:border-primary/40 rounded-none text-[10px] font-black uppercase tracking-widest transition-premium px-3"
                >
                  <Filter className="mr-2 h-3 w-3 opacity-60" />
                  {breakpoint === "sm" ? "" : "Columnas"}
                  <ChevronDown className="ml-2 h-2.5 w-2.5 opacity-40" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="start"
                className="w-48 bg-popover/90 backdrop-blur-xl border-border shadow-2xl rounded-none p-1"
              >
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize text-[11px] font-bold py-2 px-3 rounded-none focus:bg-primary/10 focus:text-primary transition-premium cursor-pointer"
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

            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground/40" />
              <Input
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Buscar..."
                className="h-8 pl-7 text-[10px] font-mono font-bold bg-background/40 border-border/40 focus:border-primary/40 rounded-none"
              />
            </div>

            {dataTablePermissions.canRead && (
              <ExportDropdown
                onExport={handleExport}
                selectedCount={selectedCount}
                totalCount={data.length}
                disabled={data.length === 0}
              />
            )}

            {toolbarContent && (
              <div className="flex items-center gap-2">
                {toolbarContent}
              </div>
            )}
          </div>

          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex-1 overflow-auto custom-scrollbar">
              <Table className="min-w-full">
                <TableHeader className="sticky top-0 bg-card/80 backdrop-blur-md z-10 shadow-sm">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className="hover:bg-transparent border-b border-border/40"
                    >
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead
                            key={header.id}
                            className="h-10 py-0 text-[10px] font-black uppercase tracking-widest text-muted-foreground/50"
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
                          className="hover:bg-foreground/5 group border-b border-border/10 cursor-pointer transition-premium"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell
                              key={cell.id}
                              className="py-2.5 px-3 text-[11px] font-bold h-12"
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
                        className="h-32 text-center text-[11px] font-black uppercase tracking-widest opacity-40"
                      >
                        No se encontraron resultados
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-3 shrink-0 border-t border-border/40 bg-background/40">
            <div className="flex-1 text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">
              {`${table.getFilteredSelectedRowModel().rows.length} / ${table.getFilteredRowModel().rows.length} SELECCIONADOS`}
            </div>
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60 mr-1">
                  Filas
                </p>
                {[10, 20, 50, 100].map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => table.setPageSize(size)}
                    className={cn(
                      "h-7 w-8 text-[10px] font-mono font-black border transition-premium cursor-pointer",
                      table.getState().pagination.pageSize === size
                        ? "bg-primary border-primary text-primary-foreground"
                        : "bg-background/40 border-border/40 text-muted-foreground hover:border-primary/40",
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                PÁGINA{" "}
                <span className="text-foreground font-mono">
                  {table.getState().pagination.pageIndex + 1}
                </span>{" "}
                DE{" "}
                <span className="text-foreground font-mono">
                  {table.getPageCount()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0 bg-background/40 border-border/40 hover:border-primary/40 rounded-none transition-premium"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  className="h-8 w-8 p-0 bg-background/40 border-border/40 hover:border-primary/40 rounded-none transition-premium"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
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
