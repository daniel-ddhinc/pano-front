<template>
  <v-flex class="background">
    <v-flex class="content fill-height fill-width">
      <v-container class="d-flex flex-start">
        <span class="logo-font">ddhaim pano</span>
      </v-container>
      <router-view />
    </v-flex>
  </v-flex>
</template>

<style lang="scss" scoped>
.background {
  width: 100%;
  height: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.container {
  width: 480px;
}
.logo-font {
  color: #fff;
  font-size: 24px;
  display: flex;
  letter-spacing: 1.2px;
  padding-left: 6px;
  line-height: 0.75;
  align-items: flex-end;
  font-weight: 900;
  text-transform: uppercase;
}
</style>
