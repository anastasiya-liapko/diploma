import { IDtoAddress } from "../Address/DtoAddress.interface";
import { IDtoCartGood } from "../Cart/DtoCart.interface";
import { EDeliveryType } from "./DeliveryType.enum";
import { EStatus } from "./Status.enum";

export interface IDtoOrder {
  _id: number;
  date: string;
  goods: IDtoCartGood[];
  total_price: number;
  status: EStatus;
  delivery_type: EDeliveryType;
  address: IDtoAddress;
}