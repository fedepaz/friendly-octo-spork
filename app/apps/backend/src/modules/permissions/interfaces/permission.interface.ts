export type PermissionScope = 'NONE' | 'OWN' | 'ALL';
export type PermissionType = 'CRUD' | 'PROCESS' | 'READ_ONLY';

export interface UserPermissionRecord {
  userId: string;
  entityId: string;
  entityName: string;
  canCreate: boolean;
  canRead: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  scope: PermissionScope;
  permissionType: PermissionType;
}

export interface RequirePermissionMetadata {
  tableName: string;
  action: 'create' | 'read' | 'update' | 'delete';
  scope?: PermissionScope;
}
