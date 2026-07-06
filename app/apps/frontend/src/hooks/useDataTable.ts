import { toast } from "sonner";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { logger } from "@/lib/logger";

interface UseDataTableActionsOptions<T> {
  entityName: string;
  onDelete?: (id: string) => Promise<void>;
  onExport?: (data: T[]) => void;
}

export function useDataTableActions<T extends { id: string }>({
  entityName,
  onDelete,
  onExport,
}: UseDataTableActionsOptions<T>) {
  const dtaT = useTranslations("DataTableActions");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState<T | null>(null);

  const handleAdd = () => {
    setSelectedEntity(null);
    setIsCreateModalOpen(true);
  };

  const handleEdit = (entity: T) => {
    setSelectedEntity(entity);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (entity: T) => {
    if (!onDelete) return;

    const confirmed = window.confirm(
      dtaT("confirmDelete", { entityName, id: entity.id }),
    );

    if (!confirmed) return;

    try {
      await onDelete(entity.id);
      toast.success(dtaT("deleteSuccess", { entityName }));
    } catch (error) {
      toast.error(dtaT("deleteError", { entityName }));
      logger.error(`Failed to delete ${entityName}:`, error);
    }
  };

  const handleExport = (data: T[]) => {
    if (onExport) {
      onExport(data);
    } else {
      const headers = Object.keys(data[0] || {}).join(",");
      const rows = data.map((item) => Object.values(item).join(",")).join("\n");
      const csvContent = `${headers}\n${rows}`;

      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${entityName}-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);

      toast.success(dtaT("exportSuccess", { entityName }));
    }
  };

  const closeCreateModal = () => setIsCreateModalOpen(false);
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedEntity(null);
  };

  return {
    isCreateModalOpen,
    isEditModalOpen,
    selectedEntity,
    handleAdd,
    handleEdit,
    handleDelete,
    handleExport,
    closeCreateModal,
    closeEditModal,
  };
}
