import { server } from '@/api';
import { IDtoCatalog } from '@/domain/Catalog/DtoCatalog.interface';
import { Pagination } from '@/infrastructure/Pagination/Pagination';
import { AxiosResponse } from 'axios';

export class CatalogApi {
  public search = async (params: Pagination): Promise<AxiosResponse<IDtoCatalog>> => {
    return await server.get('/catalog/search', { params })
  }
} 