<script lang="ts" setup>
import useAuth from "@/composable/useAuth";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const cartStore = useCartStore();
const { logout } = useAuth();
const searchValue = ref<string>(route.query.search?.toString() || "");

const search = (): void => {
  router.push({ name: "Catalog", query: { search: searchValue.value } })
}

const gotToCart = () => {
  if (!authStore.isAuthorized) {
    authStore.isAuthModalVisible = !authStore.isAuthModalVisible
  } else {
    router.push({ name: "Cart" })
  }
}

const goToLK = (): void => {
  if (!authStore.isAuthorized) {
    authStore.isAuthModalVisible = !authStore.isAuthModalVisible
  }
}

watch(
  () => route.query,
  async (newValue) => {
    if (route.query.search?.toString() !== searchValue.value) {
      searchValue.value = route.query.search?.toString() || "";
    }
  },
  { deep: true }
);
</script>

<template>
  <v-app-bar class="bar" color="indigo-accent-4">

    <v-app-bar-title>
      <router-link :to="{ name: 'Catalog' }">
        <v-img class="bar__logo" :width="100" :height="20" contain src="@/assets/logo_white.svg"></v-img>
        <v-img class="bar__logo bar__logo_mobile" :width="20" :height="20" contain src="@/assets/logo_mobile.svg"></v-img>
      </router-link>
    </v-app-bar-title>

    <div class="bar__search mx-auto">
      <v-text-field v-model="searchValue" density="compact" variant="outlined" label="Искать"
        append-inner-icon="mdi-magnify" single-line hide-details max-width="750" @click:append-inner="search"
        @keyup.enter="search" />
    </div>

    <div class="bar__actions">
      <v-btn icon @click="gotToCart">
        <v-badge :content="cartStore.totalCount" color="error">
          <v-icon>mdi-cart-outline</v-icon>
        </v-badge>
      </v-btn>

      <v-btn id="menu-activator" icon @click="goToLK">
        <v-icon>mdi-account-outline</v-icon>
      </v-btn>
    </div>

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

<style lang="scss">
.bar {
  .v-toolbar-title {
    flex: none !important;

    .bar__logo {
      display: none;

      @media(min-width: 600px) {
        display: block;
      }

      &_mobile {
        display: block;

        @media(min-width: 600px) {
          display: none;
        }
      }
    }
  }

  .bar__search {
    width: 50% !important;
    max-width: 500px;
  }
}
</style>


