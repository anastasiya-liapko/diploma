import { CartApi } from "@/api/CartApi";
import { Cart } from "@/domain/Cart/Cart";
import { ref } from "vue";

export default () => {
  const cartApi = new CartApi();

  const cart = ref<Cart>(new Cart());
  const isLoading = ref<boolean>(true);

  const get = async (): Promise<void> => {
    isLoading.value = true;
    try {
      const response = await cartApi.get();
      cart.value = response.data;
    } catch (e) {
      console.log(e)
    } finally {
      isLoading.value = false;
    }
  }

  const patch = async (_id: string, count: number): Promise<void> => {
    try {
      const response = await cartApi.patch(_id, count);
      cart.value = response.data;
    } catch (e) {
      console.log(e)
    }
  }

  return {
    isLoading,
    cart,
    get,
    patch
  }
};