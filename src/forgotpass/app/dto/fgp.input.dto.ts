export interface ICreateForgotPassDTO {
  code: string;

  email: string;
}

// export interface IVerifyCodeDTO {

//   code: string;

//   email: string;

// }

export interface IUpdateForgotPassDTO extends Partial<ICreateForgotPassDTO> {
  id: string;
}
