import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsUUID, Max, Min } from 'class-validator';
import { PaginationQuery } from '../../domain/pagination';

export class PaginationQueryDTO implements PaginationQuery {
  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;
}

/**
 * DTO de pagination étendu avec filtrage optionnel par tournoi.
 * Réutilisable par tous les controllers qui exposent des ressources scopées
 * par tournoi (teams, matchs, poules, etc.).
 */
export class TournoiScopedQueryDTO extends PaginationQueryDTO {
  @ApiPropertyOptional({
    description: 'Filtrer les résultats par ID de tournoi',
    type: String,
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
  })
  @IsOptional()
  @IsUUID()
  tournoiId?: string;
}
