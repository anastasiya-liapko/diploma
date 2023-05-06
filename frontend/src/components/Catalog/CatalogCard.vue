<script lang="ts" setup>
import { Good } from '@/domain/Good/Good';
import router from '@/router';

const props = defineProps<{
  data: Good
}>();

const addToCart = async (): Promise<void> => {
  console.log("add to cart")
}

const routeToCatalogItem = (): void => {
  router.push({ name: 'CatalogItem', params: { id: props.data.id } })
}
</script>

<template>
  <v-card @click="routeToCatalogItem" class="catalog-card">
    <v-img :src="data.imageLink" height="200px" contain></v-img>

    <v-card-title>
      {{ data.title }}
    </v-card-title>

    <v-card-subtitle>
      {{ data.description }}
    </v-card-subtitle>

    <v-card-actions>
      <p>{{ data.price }} руб.</p>
      <v-spacer />
      <v-btn @click.stop="addToCart" class="text-none text-subtitle-1" ripple color="indigo-accent-4" size="default"
        variant="flat">
        в корзину
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss"></style>