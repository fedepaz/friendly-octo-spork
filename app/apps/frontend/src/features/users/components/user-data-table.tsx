//src/features/users/components/user-data-table.tsx
"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DataTable, SlideOverForm } from "@/components/data-display/data-table";
import { useUsers } from "../hooks/usersHooks";
import { userColumns } from "./columns";
import { RegisterAuthDto, RegisterAuthSchema, UserProfileDto } from "@repo/shared";
import { UserViewForm } from "./users-view-form";
import { UserCreateForm } from "./user-create-form";
import { useCreateUser, useDeleteUser } from "../hooks/usersHooks";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function UsersDataTable() {
  const udT = useTranslations("UsersDashboard");
  const { data: users = [] } = useUsers();
  const [selectedUser, setSelectedUser] = useState<UserProfileDto | null>(null);
  const [slideOverOpen, setSlideOverOpen] = useState(false);

  const { mutateAsync: createUser } = useCreateUser();
  const { mutateAsync: deleteUser } = useDeleteUser();

  const formCreateUser = useForm<RegisterAuthDto>({
    resolver: zodResolver(RegisterAuthSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleView = (row: UserProfileDto) => {
    setSelectedUser(row);
    setSlideOverOpen(true);
  };

  const handleViewCreate = () => {
    setSelectedUser(null);
    formCreateUser.reset();
    setSlideOverOpen(true);
  };

  const handleCreate = async (formData: RegisterAuthDto) => {
    try {
      await createUser(formData);
      setSlideOverOpen(false);
      formCreateUser.reset();
    } catch {}
  };

  const handleCancel = () => {
    setSelectedUser(null);
    setSlideOverOpen(false);
  };

  const handleDelete = async (row: UserProfileDto) => {
    try {
      await deleteUser(row.id);
      if (selectedUser?.id === row.id) handleCancel();
    } catch {}
  };

  return (
    <>
      <DataTable
        columns={userColumns}
        data={users}
        title={udT("title")}
        description={udT("description")}
        tableName="users"
        totalCount={users.length}
        onView={handleView}
        onDelete={handleDelete}
        toolbarContent={
          <Button
            variant="outline"
            className="h-9 w-9 p-0 bg-primary/5 border-primary/20 hover:border-primary/60 hover:bg-primary/10 rounded-none transition-premium group"
            onClick={handleViewCreate}
            aria-label={udT("createLabel")}
          >
            <Plus className="h-4 w-4 group-hover:scale-110 transition-transform" />
          </Button>
        }
      />

      {slideOverOpen && (
        <SlideOverForm<RegisterAuthDto>
          formId="user-create-form"
          open={slideOverOpen}
          onOpenChange={setSlideOverOpen}
          title={
            selectedUser ? udT("slideOverTitle") : udT("createTitle")
          }
          description={
            selectedUser
              ? udT("identityPrefix") + selectedUser.name.toUpperCase()
              : udT("createDesc")
          }
          onCancel={handleCancel}
          saveLabel={udT("saveLabel")}
          mode={selectedUser ? "view" : "create"}
          form={formCreateUser}
        >
          {selectedUser ? (
            <UserViewForm selectedUser={selectedUser} />
          ) : (
            <UserCreateForm
              onSubmit={handleCreate}
              onCancel={handleCancel}
              formId="user-create-form"
              form={formCreateUser}
            />
          )}
        </SlideOverForm>
      )}
    </>
  );
}
