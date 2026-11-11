import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function DataTableSkeleton({
  columnCount,
  rowCount = 7,
}: {
  columnCount: number;
  rowCount?: number;
}) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <Skeleton className="h-8 w-[150px] sm:w-[200px]" />
            <Skeleton className="h-4 w-full max-w-[300px]" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-[60px] sm:w-[80px]" />
            <Skeleton className="h-(--control-height-sm) xl:h-(--control-height) w-[80px] sm:w-[90px]" />
            <Skeleton className="h-(--control-height-sm) xl:h-(--control-height) w-[80px] sm:w-[90px]" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/* Search and filter controls */}
        <div className="flex items-center py-4 space-x-2">
          <div className="relative flex-1 max-w-sm">
            <Skeleton className="h-(--control-height-sm) xl:h-(--control-height) w-full" />
          </div>
          <Skeleton className="h-(--control-height-sm) xl:h-(--control-height) w-[80px] sm:w-[100px]" />
        </div>

        {/* Table */}
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: columnCount }).map((_, index) => (
                  <TableHead
                    key={index}
                    className={cn(
                      "h-(--table-compact-header-height) xl:h-(--table-header-height) py-1 text-xs font-semibold",
                      index >= 2 && "hidden sm:table-cell",
                    )}
                  >
                    <Skeleton className="h-4 w-20" />
                  </TableHead>
                ))}
                {/* Actions column */}
                <TableHead className="h-(--table-compact-header-height) xl:h-(--table-header-height) py-1 text-xs font-semibold">
                  <Skeleton className="h-4 w-[60px]" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: rowCount }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: columnCount }).map((_, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className={cn(
                        "h-(--table-compact-row-height) xl:h-(--table-row-height) py-0.5 xl:py-1 px-2 xl:px-3 text-xs xl:text-sm",
                        cellIndex >= 2 && "hidden sm:table-cell",
                      )}
                    >
                      <Skeleton className="h-4 w-full max-w-[120px]" />
                    </TableCell>
                  ))}
                  {/* Actions cell */}
                  <TableCell>
                    <Skeleton className="h-(--control-height-xs) xl:h-(--control-height-sm) w-8" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4">
          <div className="flex-1 text-center md:text-left">
            <Skeleton className="h-4 w-[150px] sm:w-[200px] mx-auto" />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-(--control-height-xs) xl:h-(--control-height-sm) w-[70px]" />
            </div>
            <div className="flex items-center justify-center">
              <Skeleton className="h-4 w-[100px]" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="hidden lg:block h-(--control-height-xs) xl:h-(--control-height-sm) w-8" />
              <Skeleton className="h-(--control-height-xs) xl:h-(--control-height-sm) w-8" />
              <Skeleton className="h-(--control-height-xs) xl:h-(--control-height-sm) w-8" />
              <Skeleton className="hidden lg:block h-(--control-height-xs) xl:h-(--control-height-sm) w-8" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
