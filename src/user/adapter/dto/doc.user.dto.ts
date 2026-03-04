import { ApiProperty } from '@nestjs/swagger';
import { User, SexEnum } from '../../domain';

export class DocUserOutputDTO implements User {
  @ApiProperty({ type: String, name: 'id' })
  id: string;

  @ApiProperty({
    type: String,
    name: 'firstname',
    description: 'The familly name of the account',
  })
  firstname: string;

  @ApiProperty({
    type: String,
    name: 'lastname',
    description: 'The lastname or given name of the account',
  })
  lastname: string;
  @ApiProperty({
    type: String,
    name: 'email',
    description:
      'The email address on which share some information with the user by notification',
    required: false,
  })
  email?: string;

  @ApiProperty({
    type: String,
    name: 'phone',
    description:
      'The phone number on which contact the account user or send an OTP information',
  })
  phone: string;

  @ApiProperty({ type: String, enum: SexEnum, name: 'sex', required: false })
  sex: SexEnum;

  @ApiProperty({ type: String, name: 'country' })
  country: string;

  @ApiProperty({ type: String, name: 'avatar' })
  avatar: string;

  @ApiProperty({ type: Number, name: 'solde' })
  solde: number;

  @ApiProperty({ type: Boolean, name: 'isActivated' })
  isActivated: boolean;

  @ApiProperty({ type: Date, name: 'createdAt' })
  createdAt: Date;

  @ApiProperty({ type: Date, name: 'updatedAt' })
  updatedAt: Date;
}

export class DocSignedUserDTO extends DocUserOutputDTO {
  @ApiProperty({ type: String, name: 'accessToken' })
  accessToken: string;
}
