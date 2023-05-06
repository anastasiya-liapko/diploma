<script lang="ts" setup>
  //
</script>

<template>
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

    <v-btn icon>
      <v-icon>mdi-account-outline</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon>mdi-cart-outline</v-icon>
    </v-btn>

  </v-app-bar>
</template>


