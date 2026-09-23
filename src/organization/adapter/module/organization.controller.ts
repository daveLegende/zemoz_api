import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { AdminGuard } from '../../../admin/adapter/guard/auth.guard';
import { OrganizationGuard } from '../guard/organization.guard';
import { OrganizationEntity } from '../../framework/database/schema/organization.entity';
import { TournoiEntity } from '../../../tournoi/framework/database/schema/tournoi.entity';

@ApiTags('Organizations')
@Controller('organizations')
@UseGuards(AdminGuard)
@ApiBearerAuth()
export class OrganizationController {
  constructor(private readonly dataSource: DataSource) {}

  @Get()
  @ApiOperation({ summary: 'Lister toutes les organisations' })
  async findAll() {
    const repo = this.dataSource.getRepository(OrganizationEntity);
    return await repo.find();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une organisation' })
  async findOne(@Param('id') id: string) {
    const repo = this.dataSource.getRepository(OrganizationEntity);
    return await repo.findOne({ where: { id }, relations: ['members', 'tournois'] });
  }

  @Post()
  @ApiOperation({ summary: 'Créer une organisation' })
  async create(@Body() body: { name: string; slug: string; description?: string; logo?: string }) {
    const repo = this.dataSource.getRepository(OrganizationEntity);
    const org = repo.create(body);
    return await repo.save(org);
  }

  @Get(':organizationId/tournois')
  @UseGuards(OrganizationGuard)
  @ApiOperation({ summary: 'Lister les tournois d\'une organisation' })
  async findTournois(@Param('organizationId') organizationId: string) {
    const repo = this.dataSource.getRepository(TournoiEntity);
    return await repo.find({ where: { organization: { id: organizationId } } });
  }

  @Post(':organizationId/tournois')
  @UseGuards(OrganizationGuard)
  @ApiOperation({ summary: 'Créer un tournoi pour une organisation' })
  async createTournoi(
    @Param('organizationId') organizationId: string,
    @Body() body: { name: string; editionName?: string; edition?: number; ticketsEnabled?: boolean; bettingEnabled?: boolean; slug?: string }
  ) {
    const repo = this.dataSource.getRepository(TournoiEntity);
    const tournoi = repo.create({
      ...body,
      organization: { id: organizationId } as any,
    });
    return await repo.save(tournoi);
  }

  @Patch(':organizationId/tournois/:tournoiId')
  @UseGuards(OrganizationGuard)
  @ApiOperation({ summary: 'Mettre à jour un tournoi d\'une organisation' })
  async updateTournoi(
    @Param('organizationId') organizationId: string,
    @Param('tournoiId') tournoiId: string,
    @Body() body: Partial<TournoiEntity>
  ) {
    const repo = this.dataSource.getRepository(TournoiEntity);
    const tournoi = await repo.findOne({ where: { id: tournoiId, organization: { id: organizationId } } });
    if (!tournoi) throw new Error('Tournoi non trouvé dans cette organisation');
    Object.assign(tournoi, body);
    return await repo.save(tournoi);
  }
}
