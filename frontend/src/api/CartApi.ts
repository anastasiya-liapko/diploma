import { server } from '@/api';
import { AxiosResponse } from 'axios';

export class CartApi {
  public get = async (): Promise<AxiosResponse<any>> => {
    return await server.get('/cart')
  }
} 