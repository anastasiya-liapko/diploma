import { OrderApi } from "@/api/OrderApi";
import { Order } from "@/domain/Order/Order";
import { OrderForm } from "@/domain/Order/OrderForm";

export default () => {
  const orderApi = new OrderApi();

  const get = async (_id: number): Promise<Order | false> => {
    try {
      const response = await orderApi.getById(_id);
      return new Order(response.data);
    } catch (e) {
      console.log(e);
      return false
    }
  }

  const post = async (data: OrderForm): Promise<Order | false> => {
    try {
      const res = await orderApi.post(data);
      return new Order(res.data)
    } catch (e) {
      console.log(e)
      return false;
    }
  }

  return {
    get,
    post
  }
};