import { CartApi } from "@/api/CartApi";

export default () => {
  const cartApi = new CartApi();

  const get = async (): Promise<void> => {
    try {
      const response = await cartApi.get()
      console.log(response)
    } catch (e) {
      console.log(e)
    }
  }

  return {
    get
  }
};