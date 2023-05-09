import { IDtoAddress } from "../Address/DtoAddress.interface";
import { IDtoCartGood } from "../Cart/DtoCart.interface";
import { IDtoGood } from "../Good/DtoGood.interface";
import { EDeliveryType } from "./DeliveryType.enum";
import { EStatus } from "./Status.enum";

export interface IDtoOrder {
  _id: string;
  goods: IDtoCartGood[];
  total_price: number;
  status: EStatus;
  delivery_type: EDeliveryType;
  address: IDtoAddress;
}