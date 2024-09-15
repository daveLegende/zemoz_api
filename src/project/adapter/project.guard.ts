import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AppEnum } from 'project/domain/project.enum';
import { ProjectAPIService } from 'project/framework/API';

@Injectable()
export class ProjectGuard implements CanActivate {
  private readonly logger = new Logger();
  constructor(
    private projectApi: ProjectAPIService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const apiKey: string =
        request.headers['x-api-key'] || request.headers['X-API-KEY'];

      const isPublic = this.reflector.get<boolean>(
        'isPublic',
        context.getHandler(),
      );
      if (isPublic) {
        return true;
      }
      const project = await this.projectApi.rest.filter({
        apiKey,
        app: AppEnum.STARTER,
      });
      request['project'] = project;
      return project ? true : false;
    } catch (error) {
      this.logger.error(error.message, ProjectGuard.name);
      return false;
    }
  }
}
