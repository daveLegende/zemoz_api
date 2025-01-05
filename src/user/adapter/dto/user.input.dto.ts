import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
} from 'class-validator';
import {
  IForgotPasswordDTO,
  ISigninUserDTO,
} from 'user/app/dto/auth.input.dto';
import { SexEnum } from 'user/domain/user.enum';

export class UserAccoutDTO {
  @ApiProperty({
    type: String,
    name: 'firstname',
    description: 'The familly name of the account',
  })
  @IsString()
  firstname: string;

  @ApiProperty({
    type: String,
    name: 'lastname',
    description: 'The lastname or given name of the account',
  })
  @IsString()
  lastname: string;

  @ApiProperty({ type: String, enum: SexEnum, name: 'sex', required: false })
  @IsOptional()
  @IsEnum(SexEnum)
  sex?: SexEnum;

  @ApiProperty({
    type: String,
    name: 'email',
    description:
      'The email address on which share some information with the user by notification',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    type: String,
    name: 'phone',
    description:
      'The phone number on which contact the account user or send an OTP information',
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    type: String,
    name: 'country',
    description: 'The complete description of the supplier country',
  })
  @IsOptional()
  @IsString()
  country: string;

  @ApiProperty({ type: String, format: 'binary', name: 'avatar' })
  avatar?: string;

  // @ApiProperty({
  //   type: Number,
  //   name: 'solde',
  //   description: 'The amount of the user',
  //   default: 0,
  //   nullable: true,
  // })
  // @IsInt()
  // solde?: number;
}

export class RegisterAccoutDTO extends UserAccoutDTO {
  @ApiProperty({
    type: String,
    name: 'password',
    description: 'Password of the user',
    required: false,
  })
  @IsOptional()
  @IsString()
  password: string;
}

export class SigninAccoutDTO implements ISigninUserDTO {
  @ApiProperty({
    type: String,
    name: 'email',
    description: 'The email address if the plateform use it for login',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    type: String,
    name: 'phone',
    description: 'The phone number if the plateform use it for login',
    required: false,
  })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty({ type: String, name: 'password' })
  @IsString()
  password: string;
}
export class ForgotPasswordDTO {
  @ApiProperty({
    type: String,
    name: 'email',
    description: 'The email address if the plateform use it for login',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  // @ApiProperty({
  //   type: String,
  //   name: 'phone',
  //   description: 'The phone number if the plateform use it for login',
  //   required: false,
  // })
  // @IsOptional()
  // @IsPhoneNumber()
  // phone?: string;
}
export class ResetPasswordDTO extends SigninAccoutDTO {
  @ApiProperty({
    type: String,
    name: 'otpCode',
    description: 'The otp validation code for reseting',
  })
  @IsString()
  otpCode: string;
}

export class UpdateUserDTO extends PartialType(UserAccoutDTO) {
  @ApiProperty({
    type: String,
    name: 'id',
    description: 'ID of the given user',
  })
  @IsString()
  @IsUUID()
  id: string;
}

export class UserQueryDTO implements IForgotPasswordDTO {
  @ApiProperty({
    type: String,
    name: 'email',
    description: 'email of the given user',
  })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiProperty({
    type: String,
    name: 'phone',
    description: 'phone number of the given user',
  })
  @IsOptional()
  @IsString()
  phone?: string;
}


// 
export class ReinitialisePassAccountDTO {

  @ApiProperty({
    type: String,
    name: 'email',
    description: 'email Password of the user',
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    name: 'password',
    description: 'Password of the user',
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    name: 'confirm',
    description: 'Confirm Password of the user',
  })
  @IsString()
  confirm: string;
}


export class ChangePassAccountDTO {

  @ApiProperty({
    type: String,
    name: 'id',
    description: 'id of user',
  })
  // @IsUUID()
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    name: 'oldpass',
    description: 'Password of the user',
  })
  @IsString()
  oldpass: string;

  @ApiProperty({
    type: String,
    name: 'newpass',
    description: 'Password of the user',
  })
  @IsString()
  newpass: string;

  @ApiProperty({
    type: String,
    name: 'confirm',
    description: 'Confirm Password of the user',
  })
  @IsString()
  confirm: string;
}


export class DeleteUserBetDTO {

  @ApiProperty({
    type: String,
    name: 'id',
    description: 'id of coupon',
  })
  // @IsUUID()
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    name: 'id',
    description: 'id of user',
  })
  @IsString()
  userId: string;
}


export class DeleteUserTicketDTO {

  @ApiProperty({
    type: String,
    name: 'id',
    description: 'id of ticket',
  })
  // @IsUUID()
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    name: 'id',
    description: 'id of user',
  })
  @IsString()
  userId: string;
}