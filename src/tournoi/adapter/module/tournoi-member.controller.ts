import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AccountGuard } from '../../../account/adapter/guard/account.guard';
import { TournoiGuard } from '../guard/tournoi.guard';
import { RequireRole } from '../../../account/adapter/guard/require-role.decorator';
import { TournoiRole } from '../../domain/tournoi.enum';
import { TournoiMemberService } from './tournoi-member.service';
import { AddTournoiMemberDTO, UpdateTournoiMemberDTO } from '../dto/tournoi-member.dto';

@ApiTags('Tournois Members management')
@ApiBearerAuth()
@UseGuards(AccountGuard)
@Controller('tournois')
export class TournoiMemberController {
  constructor(private readonly memberService: TournoiMemberService) {}

  @Get('my-tournois')
  @ApiOperation({ summary: 'Tournois auxquels l’utilisateur connecté participe' })
  async getMyTournois(@Req() req: any) {
    const account = req['account'];
    return await this.memberService.fetchMyTournois(account.id);
  }

  @Post(':tournoiId/members')
  @UseGuards(TournoiGuard)
  @RequireRole({ tournoiRole: TournoiRole.ADMIN })
  @ApiOperation({ summary: 'Ajouter un membre avec un rôle sur un tournoi' })
  async addMember(
    @Param('tournoiId') tournoiId: string,
    @Body() dto: AddTournoiMemberDTO,
  ) {
    return await this.memberService.addMember(tournoiId, dto);
  }

  @Get(':tournoiId/members')
  @UseGuards(TournoiGuard)
  @ApiOperation({ summary: 'Lister l’équipe d’un tournoi' })
  async getMembers(@Param('tournoiId') tournoiId: string) {
    return await this.memberService.fetchMembers(tournoiId);
  }

  @Patch(':tournoiId/members/:memberId')
  @UseGuards(TournoiGuard)
  @RequireRole({ tournoiRole: TournoiRole.ADMIN })
  @ApiOperation({ summary: 'Modifier le rôle ou statut d’un membre du tournoi' })
  async updateMember(
    @Param('memberId') memberId: string,
    @Body() dto: UpdateTournoiMemberDTO,
  ) {
    return await this.memberService.updateMember(memberId, dto);
  }

  @Delete(':tournoiId/members/:memberId')
  @UseGuards(TournoiGuard)
  @RequireRole({ tournoiRole: TournoiRole.ADMIN })
  @ApiOperation({ summary: 'Retirer un membre d’un tournoi' })
  async removeMember(@Param('memberId') memberId: string) {
    return await this.memberService.removeMember(memberId);
  }
}
