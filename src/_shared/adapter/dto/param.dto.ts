import { IIDParamDTO, IPhoneParamDTO } from 'app/dto';
import { IsPhoneNumber, IsUUID } from 'class-validator';

export class IDParamDTO implements IIDParamDTO {
  @IsUUID()
  id: string;
}

export class PhoneParamDTO implements IPhoneParamDTO {
  @IsPhoneNumber()
  phone: string;
}
