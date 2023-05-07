<script lang="ts" setup>
import NotFound from "@/components/NotFound.vue"
import useCart from "@/composable/useCart";

const { get } = useCart();

get();
</script>

<template>
  <v-container class="cart" fluid>
    <NotFound icon="mdi-cart-outline" title="В корзине ничего нет" description="Добавьте товары в корзину"
      button-text="в каталог" />
  </v-container>
</template>

<style lang="scss"></style>