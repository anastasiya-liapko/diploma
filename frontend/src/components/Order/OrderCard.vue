<script lang="ts" setup>
import { Address } from '@/domain/Address/Address';
import { Order } from '@/domain/Order/Order';
import { StatusLabels } from "@/domain/Order/Status.const"

const props = defineProps<{
  data: Order;
}>()

const formatAddress = (address: Address): string => {
  return `${address.city}, ${address.street}, ${address.building}/${address.apartment}, ${address.index}`
}

// DD.MM.YYYY
const DATE_OPTIONS: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

const formatDate = (value: string): string => {
  const seconds = new Date(Date.parse(value));
  const day = seconds.toLocaleString("ru-RU", DATE_OPTIONS);
  return day;
}
</script>

<template>
  <v-sheet border="lg opacity-12" class="text-body-2 mx-auto" max-width="750" rounded="lg">
    <v-container fluid>
      <v-row class="mb-4">
        <v-col cols="8">№{{ data._id }}</v-col>
        <v-col class="text-right" cols="4">{{ StatusLabels[data.status] }}</v-col>
      </v-row>
      <v-divider :thickness="1"></v-divider>
      <v-row class="mt-4 mb-4">
        <v-col cols="8">{{ formatAddress(data.address) }}</v-col>
        <v-col class="text-right" cols="4">{{ formatDate(data.date) }}</v-col>
      </v-row>
      <v-divider :thickness="1"></v-divider>
      <v-row class="mt-2 mb-2 d-flex align-center" v-for="good in data.goods" :key="good.good._id">
        <v-col cols="2">
          <v-img :src="good.good.imageLink" width="100px" contain></v-img>
        </v-col>

        <v-col cols="10">
          <p class="mx-auto text-caption">{{ good.good.title }}</p>
          <p class="text-caption">{{ good.good.id }}</p>

          <v-row>
            <v-col cols="6">{{ good.count }} x {{ good.good.price }}</v-col>
            <v-col class="text-right" cols="6">{{ Math.round(good.count * good.good.price) }} руб.</v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row dense class="mt-4">
        <v-col cols="8">Количество</v-col>
        <v-col class="text-right" cols="4">{{ data.goods.length }} ед.</v-col>
      </v-row>
      <v-row dense>
        <v-col cols="8">Стоимость товаров</v-col>
        <v-col class="text-right" cols="4">{{ data.total_price }} руб.</v-col>
      </v-row>
    </v-container>
  </v-sheet>
</template>