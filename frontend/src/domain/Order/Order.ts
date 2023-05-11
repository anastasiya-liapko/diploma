import { Address } from "../Address/Address";
import { CartGood } from "../Cart/Cart";
import { EDeliveryType } from "./DeliveryType.enum";
import { IDtoOrder } from "./DtoOrder";
import { EStatus } from "./Status.enum";

export class Order {
  public _id: number;
  public date: string;
  public goods: CartGood[];
  public total_price: number;
  public status: EStatus;
  public delivery_type: EDeliveryType;
  public address: Address;

  constructor(dto: IDtoOrder) {
    this._id = dto._id;
    this.date = dto.date;
    this.goods = dto.goods;
    this.total_price = dto.total_price;
    this.status = dto.status;
    this.delivery_type = dto.delivery_type;
    this.address = new Address(dto.address);
  }
}