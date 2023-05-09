import { AddressApi } from "@/api/AddressApi";
import { Address } from "@/domain/Address/Address";
import { ref } from "vue";

export default () => {
  const addressApi = new AddressApi();

  const isLoading = ref<boolean>();

  const get = async (): Promise<Address[]> => {
    isLoading.value = true;
    try {
      const response = await addressApi.get();

      const res = response.data.map(item => new Address(item));
      return res;
    } catch (e) {
      console.log(e)
      throw e;
    } finally {
      isLoading.value = false;
    }
  }

  const put = async (address: any): Promise<Address | false> => {
    try {
      const response = await addressApi.put(address);
      return new Address(response.data);
    } catch (e) {
      console.log(e)
      return false
    }
  }

  return {
    get,
    put
  }
};