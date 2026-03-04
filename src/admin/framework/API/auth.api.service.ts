/* eslint-disable @typescript-eslint/no-explicit-any */
import { OnApplicationBootstrap, Injectable } from '@nestjs/common';
import { IEvent } from '../../../_shared/app/abstract/generic.event';
import { AxiosRest } from '../../../_shared/framework/rest.adapter';
import { Admin } from '../../../admin/domain';
import { ICreateAdminDTO } from '../../../admin/app/dto';

class GenericAuthAPI {
  private axiosAdapter: AxiosRest<Admin>;
  private _apiUrl: string;
  private _admin = {
    // ! remove this
    id: 'Admin_id',
    firstname: 'toto',
    lastname: 'tata',
    address: 'simple addres',
    phone: '+22890001111',
    email: 'toto@tata.com',
    isActivated: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  private API_HEADERS = {
    'x-api-key': undefined,
  };

  // constructor(path?: string) {
  //   const apis = <IApiKey>ApiKeyManager.getKeys(AppEnum.CORE);
  //   this.axiosAdapter = new AxiosRest(axios);
  //   if (apis?.key && apis?.api) {
  //     this._apiUrl = path ? `${apis.api}/${path}` : apis.api;
  //     this.API_HEADERS['x-api-key'] = apis.key;
  //   }
  // }

  async signin(data: ICreateAdminDTO) {
    return this.axiosAdapter.post(`${this._apiUrl}/signin`, data, {
      headers: this.API_HEADERS,
    });
  }

  async addAccess(rules: any) {
    return this.axiosAdapter.post(`${this._apiUrl}/access.groups/bulk`, rules, {
      headers: this.API_HEADERS,
    });
  }

  async tokenLogin(token: string, permission?: string) {
    return this._admin; // ! remove this
  }
}

@Injectable()
export class AuthAPIService implements OnApplicationBootstrap {
  api: GenericAuthAPI;
  event: IEvent;

  onApplicationBootstrap(): void {
    this.api = new GenericAuthAPI();
  }
}
