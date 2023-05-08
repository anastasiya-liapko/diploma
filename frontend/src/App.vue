<script lang="ts" setup>
import { watchEffect } from 'vue';
import useCart from './composable/useCart';
import { useAuthStore } from './store/auth';
import AuthModal from "@/components/Auth/AuthModal.vue"

const { get: getCart, reset: resetCart } = useCart();
const authStore = useAuthStore();

watchEffect(() => {
  if (!authStore.isAuthorized) {
    resetCart();
  } else {
    getCart()
  }
})
</script>

<template>
  <AuthModal v-model="authStore.isAuthModalVisible" />
  <router-view />
</template>


