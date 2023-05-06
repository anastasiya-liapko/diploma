<script lang="ts" setup>
import AuthModal from "@/components/Auth/AuthModal.vue"
import { ref } from "vue";

const isAuthModalVisible = ref<boolean>(false);

const goToLK = (): void => {
  // TODO: если не авторизован открывать модалку авторизации
  // TODO: если авторизован переходить в лк
  isAuthModalVisible.value = !isAuthModalVisible.value
}

const gotToCart = () => {
  // TODO: если не авторизован открывать модалку авторизации
  // TODO: если авторизован переходить в корзину
  isAuthModalVisible.value = !isAuthModalVisible.value
}
</script>

<template>
  <AuthModal v-model="isAuthModalVisible" />

  <v-app-bar color="indigo-accent-4">

    <v-app-bar-title>
      <router-link :to="{ name: 'Catalog' }">
        <v-img :width="100" :height="20" contain src="@/assets/logo_white.svg"></v-img>
      </router-link>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>

    <v-btn icon @click="gotToCart">
      <v-icon>mdi-cart-outline</v-icon>
    </v-btn>

    <v-btn icon @click="goToLK">
      <v-icon>mdi-account-outline</v-icon>
    </v-btn>

  </v-app-bar>
</template>


