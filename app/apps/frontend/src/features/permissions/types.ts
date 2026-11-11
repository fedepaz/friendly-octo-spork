export interface CrudColumn {
  key: "canCreate" | "canRead" | "canUpdate" | "canDelete";
  label: string;
}
