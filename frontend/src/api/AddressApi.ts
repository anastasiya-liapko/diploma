import { server } from '@/api';
import { Address } from '@/domain/Address/Address';
import { IDtoAddress } from '@/domain/Address/DtoAddress.interface';
import { AxiosResponse } from 'axios';

export class AddressApi {
  public get = async (): Promise<AxiosResponse<IDtoAddress[]>> => {
    return await server.get('/addresses')
  }

  public put = async (address: Address): Promise<AxiosResponse<IDtoAddress>> => {
    return await server.put('/addresses', { ...address })
  }
} 