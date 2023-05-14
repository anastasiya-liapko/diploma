<script lang="ts" setup>
import { ref } from 'vue';
import useOrder from '@/composable/useOrder';
import { Order } from '@/domain/Order/Order';
import OrderCard from "@/components/Order/OrderCard.vue"

const data = ref<Order[]>();
const isLoading = ref<boolean>(true);
const { get } = useOrder();

const load = async (): Promise<void> => {
  isLoading.value = true;

  try {
    const response = await get();

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
    <h1 v-if="!isLoading && data"
      class="text-center mx-auto text-h5 text-sm-h4 text-md-h3 pb-2 pt-2 pb-sm-4 pt-sm-4 pb-md-6 pt-md-6">История заказов
    </h1>
    <v-sheet v-if="isLoading" max-width="750" class="bg-grey-lighten-3 text-body-2 mx-auto" rounded="lg"></v-sheet>
    <div v-for="item in data" :key="item._id" class="mb-6">
      <OrderCard v-if="data" :data="item" />
    </div>
  </v-container>
</template>

<style lang="scss"></style>