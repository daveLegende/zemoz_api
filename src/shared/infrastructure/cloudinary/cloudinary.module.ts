import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';

@Module({
  providers: [
    {
      provide: 'IFileStorage',
      useClass: CloudinaryService,
    },
  ],
  exports: ['IFileStorage'],
})
export class CloudinaryModule {}
