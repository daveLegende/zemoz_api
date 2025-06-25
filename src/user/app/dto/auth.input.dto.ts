export interface ISigninUserDTO {
  email?: string;
  phone?: string;
  deviceToken?: string;
  password: string;
}

export interface IForgotPasswordDTO {
  email?: string;
  phone?: string;
}
