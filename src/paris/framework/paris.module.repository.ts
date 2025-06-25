import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IParisRepository } from '../domain/data.abstract';
import { ParisRepository } from './paris.repository';
import { ParisEntity } from './schema/paris.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ParisEntity])],
  providers: [
    {
      provide: IParisRepository,
      useClass: ParisRepository,
    },
  ],
  exports: [IParisRepository],
})
export class ParisRepositoryModule {}
