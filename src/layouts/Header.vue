<template>
  <v-app-bar app clipped-right>
    <v-btn
      text
      class="navigation-title"
      @click="logoClicked"
      color="transparent"
    >
      <v-list-item-title class="pano-font">DDHAIM PANO</v-list-item-title>
    </v-btn>
    <v-tooltip bottom v-for="icon in icons" :key="icon.span">
      <template v-slot:activator="{ on }">
        <v-btn icon @click="icon.handleClick" v-on="on">
          <v-icon v-text="icon.text" />
        </v-btn>
      </template>
      <span>{{ icon.span }}</span>
    </v-tooltip>
    <v-spacer />
    <v-toolbar-title>
      <v-menu transition="slide-y-transition" bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">
            <span class="title">루센트 치과의원</span>
            <v-icon>
              mdi-chevron-down
            </v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="handleClick"
          >
            <v-list-item-avatar>
              <v-icon v-text="item.icon" class="secondary white--text" />
            </v-list-item-avatar>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      icons: [
        {
          text: "mdi-printer",
          span: "Print",
          handleClick: () => this.logout()
        },
        {
          text: "mdi-help",
          span: "Get help",
          handleClick: () => console.log("help")
        }
      ],
      items: [
        { title: "Sign out", icon: "mdi-account-off" },
        { title: "Update Account", icon: "mdi-account" },
        { title: "Update Password", icon: "mdi-lock" }
      ]
    };
  },
  computed: {},
  methods: {
    ...mapMutations({ setSidebarDrawer: "setSidebarDrawer" }),
    ...mapActions({
      logout: "logout",
      handleFileEmpty: "home/handleFileEmpty"
    }),
    handleClick() {
      console.log(123);
    },
    logoClicked() {
      this.handleFileEmpty();
    }
  }
};
</script>

<style lang="scss" scoped>
.pano-font {
  color: #fff !important;
  font-weight: 900;
  font-size: 19px;
}
</style>
