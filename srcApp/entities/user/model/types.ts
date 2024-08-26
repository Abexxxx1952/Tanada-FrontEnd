export type UserFromServer = {
  id: string;
  name?: string;
  email: string;
  password: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
  photo: [];
  permissions: [];
  registrationSources: [];
  payload?: [];
};

export type AttachedUser = {
  id: string;
  email: string;
  permissions: UserPermissionsKeys[];
};

const UserPermissions = {
  CreatePhoto: "CreatePhoto",
  UpdatePhoto: "UpdatePhoto",
  DeletePhoto: "DeletePhoto",
};

type UserPermissionsKeys = keyof typeof UserPermissions;
