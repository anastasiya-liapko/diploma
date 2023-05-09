import { server } from '@/api';
import { IDtoOrder } from '@/domain/Order/DtoOrder';
import { OrderForm } from '@/domain/Order/OrderForm';
import { AxiosResponse } from 'axios';

export class OrderApi {
  public getById = async (_id: string): Promise<AxiosResponse<IDtoOrder>> => {
    return await server.get(`/orders/${_id}`)
  }

  public post = async (data: OrderForm): Promise<AxiosResponse<IDtoOrder>> => {
    return await server.post('/orders', { ...data })
  }
} 