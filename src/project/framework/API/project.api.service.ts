/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ProjectApp } from 'project/domain/project.model';
import { User } from 'user/domain';
import axios from 'axios';
import { ApiKeyManager } from 'config/api-key';
import { AppEnum } from 'project/domain/project.enum';
import { IApiKey } from 'project/domain/project.interface';
import { IEvent } from 'app/abstract/generic.event';
import { AxiosRest } from 'framework/rest.adapter';

class GenericProjectAPI<T> {
  private _apiUrl: string;
  private axiosAdapter: AxiosRest<User>;

  private _project: any = {
    id: 'project_id',
    apiKey: 'apikey',
    apiUrl: 'url',
    isActivated: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  private API_HEADERS = {
    'x-api-key': undefined,
  };

  constructor(path: string) {
    const apis = <IApiKey>ApiKeyManager.getKeys(AppEnum.CORE);
    if (apis?.key && apis?.api) {
      this.axiosAdapter = new AxiosRest(axios);
      this._apiUrl = `${apis.api}/${path}`;
      this.API_HEADERS['x-api-key'] = apis.key;
    }
  }
  async getMany(): Promise<T[]> {
    return <T[]>await this.axiosAdapter.get(`${this._apiUrl}`, {
      headers: this.API_HEADERS,
    });
  }

  async filter(option: Partial<T>) {
    return this._project; // ! remove this
    return <T>await this.axiosAdapter.get(`${this._apiUrl}/filter`, {
      headers: this.API_HEADERS,
      params: option,
    });
  }
}

@Injectable()
export class ProjectAPIService implements OnApplicationBootstrap {
  rest: GenericProjectAPI<ProjectApp>;
  event: IEvent;

  onApplicationBootstrap(): void {
    this.rest = new GenericProjectAPI('projects');
  }
}
