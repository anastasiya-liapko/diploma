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
  <v-app-bar :elevation="5" class="bar" color="white" app>
    <v-container>
      <v-row class="ml-0">

        <v-app-bar-title>
          <router-link :to="{ name: 'Catalog' }">
            <v-img class="bar__logo" :width="150" :height="30" contain src="@/assets/logo.svg"></v-img>
            <v-img class="bar__logo bar__logo_mobile" :width="30" :height="30" contain
              src="@/assets/logo_mobile_color.svg"></v-img>
          </router-link>
        </v-app-bar-title>

        <div class="bar__search mx-auto">
          <v-text-field v-model="searchValue" density="compact" variant="underlined" label="Поиск"
            append-inner-icon="mdi-magnify" single-line hide-details max-width="750" @click:append-inner="search"
            @keyup.enter="search" />
        </div>

        <div class="bar__actions">
          <v-btn icon @click="gotToCart">
            <v-badge :content="cartStore.totalCount" color="green" :model-value="!!cartStore.totalCount">
              <v-icon color="indigo-accent-4" size="30">mdi-cart-outline</v-icon>
            </v-badge>
          </v-btn>

          <v-btn class="ml-sm-4" id="menu-activator" icon @click="goToLK">
            <v-icon color="indigo-accent-4" size="30">mdi-account-outline</v-icon>
          </v-btn>
        </div>

        <v-menu :disabled="!authStore.isAuthorized" activator="#menu-activator" eager>
          <v-list>
            <v-list-item value="lk" ripple :to="{ name: 'LK' }">
              <template v-slot:prepend>
                <v-icon icon="mdi-shopping-outline"></v-icon>
              </template>
              <v-list-item-title>Мои заказы</v-list-item-title>
            </v-list-item>
            <v-list-item value="logout" ripple @click="logout">
              <template v-slot:prepend>
                <v-icon icon="mdi-logout"></v-icon>
              </template>
              <v-list-item-title>Выйти</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<style lang="scss">
.bar {
  .v-toolbar-title {
    flex: none !important;
    display: flex !important;
    align-items: center;

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


