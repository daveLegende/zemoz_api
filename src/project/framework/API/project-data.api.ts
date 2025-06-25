/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpException } from '@nestjs/common';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { ApiKeyManager } from 'config/api-key';
import { IApiKey } from 'project/domain/project.interface';
import { AppEnum } from 'project/domain/project.enum';

export class GenericProjectAPI<T> {
  private _apiUrl: string;

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
      this._apiUrl = `${apis.api}/${path}`;
      this.API_HEADERS['x-api-key'] = apis.key;
    }
  }

  private async getResponse(rep: Promise<AxiosResponse>) {
    return rep
      .then((res) => <unknown>res.data)
      .catch((error: AxiosError) => {
        if (error.response)
          throw new HttpException(error.response?.data, error.response?.status);
        throw error;
      });
  }

  async filter(option: Partial<T>): Promise<T> {
    return this._project;
    // return await this.getResponse(
    //   axios.get(`${this._apiUrl}/filter`, {
    //     params: option,
    //     headers: this.API_HEADERS,
    //   }),
    // );
  }

  getOne(id: string): Promise<T> {
    throw new Error('Method not implemented.');
  }
  getMany(): Promise<T[]> {
    throw new Error('Method not implemented.');
  }
  create(data: any): Promise<T> {
    throw new Error('Method not implemented.');
  }
  update(data: any): Promise<T> {
    throw new Error('Method not implemented.');
  }
  setState(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
  remove(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
