<script lang="ts" setup>
import { Good } from '@/domain/Good/Good';
import { computed, ref } from 'vue';
import { CatalogApi } from "@/api/CatalogApi"
import { useAuthStore } from '@/store/auth';
import { useCartStore } from '@/store/cart';
import useCart from '@/composable/useCart';
import useOrder from '@/composable/useOrder';
import { Order } from '@/domain/Order/Order';
import { Address } from '@/domain/Address/Address';
import OrderCard from "@/components/Order/OrderCard.vue"

const props = defineProps<{
  id: string;
}>();

const data = ref<Order>();
const isLoading = ref<boolean>(true);
const { get } = useOrder();

const load = async (): Promise<void> => {
  isLoading.value = true;

  try {
    const response = await get(props.id);

    if (response) {
      data.value = response
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

load();
</script>

<template>
  <v-container fluid>
    <h1 v-if="!isLoading && data" class="text-center mx-auto text-h5 pb-6 pt-6">Заказ успешно оформлен</h1>
    <v-sheet v-if="isLoading" max-width="750" class="bg-grey-lighten-3 text-body-2 mx-auto" rounded="lg"></v-sheet>
    <OrderCard v-if="data" :data="data" />
  </v-container>
</template>

<style lang="scss"></style>