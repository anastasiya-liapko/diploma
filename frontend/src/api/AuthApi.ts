import { server } from '@/api';
import { Auth } from '@/domain/Auth/Auth';
import { IDtoToken } from '@/domain/Token/DtoToken.interface';
import { AxiosResponse } from 'axios';

export class AuthApi {
  public register = async (data: Auth): Promise<AxiosResponse<IDtoToken>> => {
    return await server.post('/auth/register', data)
  }

  public login = async (data: Auth): Promise<AxiosResponse<IDtoToken>> => {
    return await server.post('/auth/login', data)
  }
} 