import { server } from '@/api';
import { IDtoStore } from '@/domain/Store/DtoStore.interface';
import { AxiosResponse } from 'axios';

export class StoreApi {
  public get = async (): Promise<AxiosResponse<IDtoStore>> => {
    return await server.get('/store')
  }
} 