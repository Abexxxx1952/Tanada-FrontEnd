export type UserFromServer = {
  id: string;
  name?: string;
  email: string;
  password: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
  photo: [];
  permissions: UserPermissionsKeys[];
  registrationSources: RegistrationSources[];
  payload: Payload[];
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

enum RegistrationSources {
  Google = "Google",
  GitHub = "GitHub",
  Local = "Local",
}

type Payload = {
  key: string;
  value: string;
};

export interface UpdateUserDto {
  name?: string;
  password?: string;
  icon?: string;
  payload: Payload[];
}
