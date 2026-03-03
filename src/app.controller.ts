import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';
import { Response } from 'express';
import { BaseConfig } from './_shared/config/base.config';

import * as path from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Get()
  // getIndex(@Res() res: Response) {
  //   res.sendFile(path.join(__dirname, '..', 'src', 'index.html'));
  // }

  @ApiOperation({
    summary: 'Download files',
    description: 'Télécharger un fichier à partir de son nom',
  })
  @Get('files/:file')
  async getFile(
    @Param('file') name: string,
    @Res() res: Response,
  ): Promise<unknown> {
    try {
      const path = BaseConfig.getFilePath(name);
      return res.sendFile(name, { root: path });
    } catch (error) {
      throw error;
    }
  }
}
