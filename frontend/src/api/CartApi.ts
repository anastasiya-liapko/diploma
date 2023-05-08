import { server } from '@/api';
import { IDtoCart } from '@/domain/Cart/DtoCart.interface';
import { AxiosResponse } from 'axios';

export class CartApi {
  public get = async (): Promise<AxiosResponse<IDtoCart>> => {
    return await server.get('/cart')
  }

  public patch = async (_id: string, count: number): Promise<AxiosResponse<IDtoCart>> => {
    return await server.patch('/cart', { _id, count })
  }
} 