import { StoreApi } from "@/api/StoreApi";
import { Store } from "@/domain/Store/Store";

export default () => {
  const storeApi = new StoreApi();

  const get = async (): Promise<Store> => {
    try {
      const response = await storeApi.get();

      const res = new Store(response.data);
      return res;
    } catch (e) {
      console.log(e)
      throw e;
    }
  }

  return {
    get
  }
};