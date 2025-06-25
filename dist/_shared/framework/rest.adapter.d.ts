import { FetcherParam, IFetcher } from 'app/abstract/generic.rest';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
interface AxiosInstance {
    get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    post(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    put(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    patch(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
}
export declare class AxiosRest<T> implements IFetcher<T> {
    private readonly axios;
    constructor(axios: AxiosInstance);
    private getResponse;
    get(url: string, config?: FetcherParam): Promise<any>;
    post(url: string, data: any, config?: FetcherParam): Promise<any>;
    login(url: string, data: any, config?: FetcherParam): Promise<any>;
    put(url: string, data: any, config?: FetcherParam): Promise<any>;
    delete(url: string, config?: FetcherParam): Promise<any>;
    patch(url: string, data: any, config?: FetcherParam): Promise<any>;
}
export {};
