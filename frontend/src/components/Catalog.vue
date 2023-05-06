<script lang="ts" setup>
import { ref } from 'vue';
import { Pagination } from "@/infrastructure/Pagination/Pagination"
import InfiniteScroll from "@/components/InfiniteScroll.vue"
import { CatalogApi } from "@/api/CatalogApi"

const api = new CatalogApi()
const list = ref<any>([]);
const pagination = ref<Pagination>(new Pagination());
const isLoading = ref<boolean>(true);
const isLoaded = ref<boolean>(false);

const load = async (): Promise<void> => {
  isLoading.value = true;

  try {
    const chunk = await api.search(pagination.value);

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
</script>

<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="item in list" :key="item.id" cols="12" sm="4">
        <v-sheet class="sheet ma-2 pa-2">
          {{ item.title }}
        </v-sheet>
      </v-col>
    </v-row>
    <InfiniteScroll v-if="!isLoaded" @on-intersect="load" />
  </v-container>
</template>

<style lang="scss">
.sheet {
  height: 100px;
}
</style>
  
