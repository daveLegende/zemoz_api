export interface ICreateOtpDTO {
    
  code: string;

  phone: string;

  isVerified?: boolean;
  
  expiresAt: Date;

}

export interface IUpdateOtpDTO extends Partial<ICreateOtpDTO> {
  id: string;
}
