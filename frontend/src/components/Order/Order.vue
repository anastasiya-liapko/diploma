<script lang="ts" setup>
import useAddress from '@/composable/useAddress';
import { Address } from '@/domain/Address/Address';
import AddressModal from "@/components/Order/AddressModal.vue"
import { ref } from 'vue';
import useStore from '@/composable/useStore';
import { EDeliveryType } from '@/domain/Order/DeliveryType.enum';
import useOrder from '@/composable/useOrder';
import { OrderForm } from '@/domain/Order/OrderForm';
import { useRouter } from 'vue-router';

const { get: getAddresses } = useAddress();
const { get: getStore } = useStore();
const { post: postOrder } = useOrder();
const router = useRouter();

const isLoading = ref<boolean>(true);
const isOrderLoading = ref<boolean>(false);
const userAddresses = ref<Address[]>([])
const storeAddresses = ref<Address[]>([])

const isAddressModalVisible = ref<boolean>(false);
const pickedAddress = ref<string | null>(null);
const deliveryType = ref<EDeliveryType>(EDeliveryType.PICKUP)

const load = async (): Promise<void> => {
  isLoading.value = true;
  userAddresses.value = await getAddresses();

  const store = await getStore();
  storeAddresses.value = store.addresses

  pickedAddress.value = storeAddresses.value[0]?._id || null;
  isLoading.value = false;
}

load()

const formatAddress = (address: Address): string => {
  return `${address.title}: ${address.city}, ${address.street}, ${address.building}/${address.apartment}, ${address.index}`
}

const submit = async (): Promise<void> => {
  try {
    isOrderLoading.value = true;
    const found = storeAddresses.value.find(item => item._id === pickedAddress.value);
    if (found) {
      deliveryType.value = EDeliveryType.PICKUP;
    } else {
      deliveryType.value = EDeliveryType.DELIVERY;
    }

    const response = await postOrder(new OrderForm({ address: pickedAddress.value, delivery_type: deliveryType.value }));
    if (response) {
      router.push({ name: 'OrderItem', params: { id: response._id } })
    }

  } catch (e) {
    console.log(e)
  } finally {
    isOrderLoading.value = false;
  }
}
</script>

<template>
  <AddressModal v-model="isAddressModalVisible" @submit="userAddresses.push($event)" />
  <v-container v-if="!isLoading" class="order" fluid>
    <h1 class="text-h3 pb-6 pt-6">Оформление заказа</h1>
    <v-radio-group v-model="pickedAddress" column>
      <v-row>
        <v-col cols="12">
          <v-sheet class="ma-1 pa-4" rounded :elevation="2">
            <h2>Самовывоз из магазина</h2>
            <v-radio v-for="address in storeAddresses" :key="address._id" :label="formatAddress(address)"
              color="indigo-accent-4" :value="address._id"></v-radio>
          </v-sheet>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-sheet class="ma-1 pa-4" rounded :elevation="2">
            <h2>Доставка курьером</h2>
            <v-radio v-for="address in userAddresses" :key="address._id" :label="formatAddress(address)"
              color="indigo-accent-4" :value="address._id"></v-radio>
            <v-btn color="indigo-accent-4" class="text-none text-subtitle-1 mt-4" ripple size="default" variant="flat"
              @click.stop="isAddressModalVisible = true">
              Добавить адрес
            </v-btn>
          </v-sheet>
        </v-col>
      </v-row>
    </v-radio-group>

    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn color="indigo-accent-4" class="text-none text-subtitle-1" ripple size="default" variant="flat"
          :loading="isOrderLoading" @click.stop="submit">
          Оформить заказ
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>