<script lang="ts" setup>
import useAddress from '@/composable/useAddress';
import { Address } from '@/domain/Address/Address';
import AddressModal from "@/components/Order/AddressModal.vue"
import { ref } from 'vue';

const { get: getAddresses } = useAddress();

const isLoading = ref<boolean>(true);
const userAddresses = ref<Address[]>([])
const shopAddresses = ref<Address[]>([])

const isAddressModalVisible = ref<boolean>(false);
const pickedAddress = ref<string | null>(null);

const load = async (): Promise<void> => {
  isLoading.value = true;
  userAddresses.value = await getAddresses();
  pickedAddress.value = userAddresses.value[0]?._id || null;
  isLoading.value = false;
}

load()

const formatAddress = (address: Address): string => {
  return `${address.title}: ${address.city}, ${address.street}, ${address.building}/${address.apartment}, ${address.index}`
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
            <v-radio label="1" color="indigo-accent-4" value="1"></v-radio>
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
  </v-container>
</template>