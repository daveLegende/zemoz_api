import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAdminService } from 'src/admin/app/module';
import { Admin, IAdminRepository } from 'src/admin/domain';
import { HashFactory } from '../../guard/hash.factory';
import { AdminFactory } from '../../admin.factory';
import { AdminAccountDto } from '../../dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminAuthService {
  private readonly logger = new Logger();
    constructor(
      private adminService: IAdminService,
      private adminRepository: IAdminRepository,
      private jwtService: JwtService,
    ) {}

  async validateAdmin(email: string, password: string): Promise<any> {
    console.log('Validating admin credentials for:', email);
    const admin = await this.adminRepository.admins.findOne({
      where: {email: email}
    });
    if (!admin) {
      throw new NotFoundException("Aucun admin trouvé");
    }
    console.log('--------------------------'+admin.password);
    

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
        console.log(`Invalid password for admin: ${email}`);
        throw new UnauthorizedException('Invalid credentials');
    }

    return admin;
  }

  async login(admin: any): Promise<{ accessToken: string; refreshToken: string; admin: Admin }> {
    const payload = { email: admin.email, sub: admin.adminId };
    
    const accessToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET, // Une clé différente pour le refresh token
      expiresIn: '1m',
    });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      admin: admin,
    };
  }

  // Méthode pour valider le refresh token et générer un nouveau access token
  async refreshTokens(refreshToken: string) {
    try {
      // Valider le refresh token
      const payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });

      // Si le refresh token est valide, générer un nouveau access token
      const newAccessToken = this.jwtService.sign(
        { sub: payload.sub, email: payload.email },
        { secret: process.env.JWT_SECRET, expiresIn: '1h' } // Générer un nouveau access token
      );

      const newRefreshToken = this.jwtService.sign(
        { sub: payload.sub, email: payload.email },
        { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '1m' } // Générer un nouveau refresh token
      );

      return {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async register(data: AdminAccountDto): Promise<Admin> {
    try {
      const { nom, password, email } = data;
      if(!nom || !password || !email) throw new BadRequestException("Invalid credentials");
      const existed = await this.adminRepository.admins.findOneBy({ email });
      if (existed)
        throw new ConflictException('Admin already exist');

      return await this.adminRepository.admins.create(
        await AdminFactory.create(data),
      );
    } catch (error) {
      this.logger.error(error.message, 'ERROR::AdminService.register');
      throw error;
    }
  }


  // fetch by email
  // async fetchByEmail(email: string): Promise<Admin> {
  //   try {
  //     const admin = await this.adminRepository.admins.findOneBy({email});
  //     if (!admin) {
  //       throw new NotFoundException("Aucun admin trouvé");
  //     }
  //     return admin;
  //   } catch (error) {
  //     this.logger.error(error.message, 'ERROR::betsService.fetchOne');
  //     throw error;
  //   }
  // }
}
