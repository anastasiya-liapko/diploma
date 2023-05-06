import { server } from '@/api';
import { IDtoCatalog } from '@/domain/Catalog/DtoCatalog.interface';
import { IDtoGood } from '@/domain/Good/DtoGood.interface';
import { Pagination } from '@/infrastructure/Pagination/Pagination';
import { AxiosResponse } from 'axios';

export class CatalogApi {
  public search = async (params: Pagination): Promise<AxiosResponse<IDtoCatalog>> => {
    return await server.get('/catalog/search', { params })
  }

  public searchOne = async (id: number): Promise<AxiosResponse<IDtoGood>> => {
    return await server.get(`/catalog/search/${id}`)
  }
} 