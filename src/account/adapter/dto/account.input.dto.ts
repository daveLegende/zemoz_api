import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { SexEnum } from '../../../user/domain/user.enum';
import { PlatformRole } from '../../domain/account.enum';

export class SigninAccountDTO {
  @ApiProperty({
    type: String,
    name: 'email',
    description: 'Email address of the account',
    required: false,
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    type: String,
    name: 'phone',
    description: 'Phone number of the account',
    required: false,
  })
  @IsOptional()
  phone?: string;

  @ApiProperty({
    type: String,
    name: 'identifier',
    description: 'Email or Phone of the account',
    required: false,
  })
  @IsOptional()
  @IsString()
  identifier?: string;

  @ApiProperty({
    type: String,
    name: 'password',
    description: 'Password of the account',
  })
  @IsString()
  password: string;
}

export class RegisterAccountDTO {
  @ApiProperty({ type: String, name: 'firstname' })
  @IsString()
  firstname: string;

  @ApiProperty({ type: String, name: 'lastname' })
  @IsString()
  lastname: string;

  @ApiProperty({ type: String, name: 'email', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ type: String, name: 'phone' })
  @IsString()
  phone: string;

  @ApiProperty({ type: String, name: 'password' })
  @IsString()
  password: string;

  @ApiProperty({ type: String, enum: SexEnum, required: false })
  @IsOptional()
  @IsEnum(SexEnum)
  sex?: SexEnum;

  @ApiProperty({ type: String, required: false })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiProperty({ type: String, enum: PlatformRole, required: false })
  @IsOptional()
  @IsEnum(PlatformRole)
  platformRole?: PlatformRole;
}
