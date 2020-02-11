<template>
  <v-layout>
    <Header />
    <v-content>
      <v-container class="fill-height fill-width pa-0" fluid>
        <router-view /> </v-container
    ></v-content>
  </v-layout>
</template>

<script>
import Header from "./Header";

export default {
  components: { Header }
};
</script>

<style lang="scss" scoped></style>
