<script lang="ts" setup>
import AuthModal from "@/components/Auth/AuthModal.vue"
import useAuth from "@/composable/useAuth";
import { useAuthStore } from "@/store/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const { logout } = useAuth();
const isAuthModalVisible = ref<boolean>(false);

const gotToCart = () => {
  if (!authStore.isAuthorized) {
    isAuthModalVisible.value = !isAuthModalVisible.value
  } else {
    router.push({ name: "Cart" })
  }
}

const goToLK = (): void => {
  if (!authStore.isAuthorized) {
    isAuthModalVisible.value = !isAuthModalVisible.value
  }
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

    <v-btn id="menu-activator" icon @click="goToLK">
      <v-icon>mdi-account-outline</v-icon>
    </v-btn>

    <v-menu :disabled="!authStore.isAuthorized" activator="#menu-activator">
      <v-list>
        <v-list-item value="lk" ripple append-icon="mdi-shopping-outline" :to="{ name: 'LK' }">
          <v-list-item-title>мои заказы</v-list-item-title>
        </v-list-item>
        <v-list-item value="logout" ripple append-icon="mdi-logout" @click="logout">
          <v-list-item-title>выйти</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-app-bar>
</template>


