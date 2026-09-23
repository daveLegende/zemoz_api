import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { TournoiRole } from '../../domain/tournoi.enum';

export class AddTournoiMemberDTO {
  @ApiProperty({ type: String, description: 'ID du compte utilisateur' })
  @IsString()
  @IsUUID()
  accountId: string;

  @ApiProperty({ enum: TournoiRole, description: 'Rôle attribué dans le tournoi' })
  @IsEnum(TournoiRole)
  role: TournoiRole;
}

export class UpdateTournoiMemberDTO {
  @ApiProperty({ enum: TournoiRole, required: false })
  @IsOptional()
  @IsEnum(TournoiRole)
  role?: TournoiRole;

  @ApiProperty({ type: Boolean, required: false })
  @IsOptional()
  isActive?: boolean;
}
