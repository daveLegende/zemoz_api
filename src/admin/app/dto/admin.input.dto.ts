export interface ICreateAdminDTO {
  nom?: string;

  email: string;

  password: string;
}

export interface IUpdateAdminDTO extends Partial<ICreateAdminDTO> {
  id: string;
}

export interface IChangeAdminPasswordDTO {
  id: string;
  oldPassword?: string;
  newPassword: string;
}
