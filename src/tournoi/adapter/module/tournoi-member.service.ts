import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TournoiMemberEntity } from '../../framework/database/schema/tournoi_member.entity';
import { TournoiEntity } from '../../framework/database/schema/tournoi.entity';
import { AccountEntity } from '../../../account/framework/database/schema/account.entity';
import { AddTournoiMemberDTO, UpdateTournoiMemberDTO } from '../dto/tournoi-member.dto';

@Injectable()
export class TournoiMemberService {
  constructor(
    @InjectRepository(TournoiMemberEntity)
    private readonly memberRepo: Repository<TournoiMemberEntity>,
    @InjectRepository(TournoiEntity)
    private readonly tournoiRepo: Repository<TournoiEntity>,
    @InjectRepository(AccountEntity)
    private readonly accountRepo: Repository<AccountEntity>,
  ) {}

  async addMember(tournoiId: string, dto: AddTournoiMemberDTO): Promise<TournoiMemberEntity> {
    const tournoi = await this.tournoiRepo.findOne({ where: { id: tournoiId } });
    if (!tournoi) throw new NotFoundException('Tournoi non trouvé');

    const account = await this.accountRepo.findOne({ where: { id: dto.accountId } });
    if (!account) throw new NotFoundException('Compte utilisateur non trouvé');

    const existing = await this.memberRepo.findOne({
      where: { tournoi: { id: tournoiId }, account: { id: dto.accountId }, role: dto.role },
    });
    if (existing) throw new ConflictException('L’utilisateur possède déjà ce rôle sur le tournoi');

    const member = this.memberRepo.create({
      tournoi,
      account,
      role: dto.role,
      isActive: true,
    });

    return await this.memberRepo.save(member);
  }

  async fetchMembers(tournoiId: string): Promise<TournoiMemberEntity[]> {
    return await this.memberRepo.find({
      where: { tournoi: { id: tournoiId } },
      relations: { account: true },
      order: { createdAt: 'DESC' },
    });
  }

  async updateMember(memberId: string, dto: UpdateTournoiMemberDTO): Promise<TournoiMemberEntity> {
    const member = await this.memberRepo.findOne({
      where: { id: memberId },
      relations: { account: true, tournoi: true },
    });
    if (!member) throw new NotFoundException('Membre non trouvé');

    if (dto.role) member.role = dto.role;
    if (dto.isActive !== undefined) member.isActive = dto.isActive;

    return await this.memberRepo.save(member);
  }

  async removeMember(memberId: string): Promise<boolean> {
    const member = await this.memberRepo.findOne({ where: { id: memberId } });
    if (!member) throw new NotFoundException('Membre non trouvé');

    await this.memberRepo.remove(member);
    return true;
  }

  async fetchMyTournois(accountId: string): Promise<TournoiMemberEntity[]> {
    return await this.memberRepo.find({
      where: { account: { id: accountId }, isActive: true },
      relations: { tournoi: true },
    });
  }
}
