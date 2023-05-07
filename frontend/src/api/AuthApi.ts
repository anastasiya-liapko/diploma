import { server } from '@/api';
import { Auth } from '@/domain/Auth/Auth';
import { Unauth } from '@/domain/Auth/Unauth';
import { IDtoToken } from '@/domain/Token/DtoToken.interface';
import { AxiosResponse } from 'axios';

export class AuthApi {
  public register = async (data: Auth): Promise<AxiosResponse<IDtoToken>> => {
    return await server.post('/auth/register', data)
  }

  public login = async (data: Auth): Promise<AxiosResponse<IDtoToken>> => {
    return await server.post('/auth/login', data)
  }

  public logout = async (data: Unauth): Promise<AxiosResponse<boolean>> => {
    return await server.post('/auth/logout', data)
  }
} 