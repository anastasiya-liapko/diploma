<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { Pagination } from "@/infrastructure/Pagination/Pagination"
import InfiniteScroll from "@/components/InfiniteScroll.vue"
import { CatalogApi } from "@/api/CatalogApi"
import CatalogCard from "@/components/Catalog/CatalogCard.vue"
import { useRoute } from 'vue-router';
import NotFound from "@/components/NotFound.vue";

const route = useRoute();

const api = new CatalogApi()
const list = ref<any>([]);
const pagination = ref<Pagination>(new Pagination());
const isLoading = ref<boolean>(true);
const isLoaded = ref<boolean>(false);

const load = async (): Promise<void> => {
  isLoading.value = true;

  try {
    const chunk = await api.search(pagination.value, route.query.search?.toString() || "");

    if (chunk.data.data.length < pagination.value.size) {
      isLoaded.value = true;
    }

    list.value = [...list.value, ...chunk.data.data];
    pagination.value.nextPage();
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

watch(
  () => route.query,
  async (newValue) => {
    isLoaded.value = false;
    list.value = [];
    pagination.value.page = 0;
    load()
  },
  { deep: true }
);
</script>

<template>
  <v-container class="catalog">
    <v-carousel v-if="!route.query.search" class="slider">
      <v-carousel-item>
        <v-img height="100%" src="@/assets/carousel-1.png" cover></v-img>
      </v-carousel-item>

      <v-carousel-item>
        <v-img height="100%" src="@/assets/carousel-2.png" cover></v-img>
      </v-carousel-item>
    </v-carousel>
    <h1 class="text-h5 text-sm-h4 pb-2 pt-2 pb-sm-4 pt-sm-4 pb-md-6 pt-md-6">Каталог товаров</h1>
    <v-row dense>
      <NotFound v-if="!list.length && !isLoading" icon="mdi-emoticon-sad-outline" title="Упс...Ничего не найдено"
        description="Попробуйте использовать другие параметры поиска" />

      <v-col v-else v-for="item in list" :key="item.id" cols="12" sm="6" md="6" lg="4" xl="3">
        <v-sheet class="ma-1" rounded :elevation="4">
          <CatalogCard :data="item" />
        </v-sheet>
      </v-col>
    </v-row>
    <InfiniteScroll v-if="!isLoaded" @on-intersect="load" />
  </v-container>
</template>

<style lang="scss">
.slider {
  @media(max-width: 959px) {
    display: none;
  }
}
</style>
  
