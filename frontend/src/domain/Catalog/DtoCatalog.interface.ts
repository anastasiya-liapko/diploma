import { IDtoGood } from "../Good/DtoGood.interface";

export interface IDtoCatalog {
  data: IDtoGood[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}