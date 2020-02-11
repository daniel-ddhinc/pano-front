<template>
  <div>
    <v-navigation-drawer
      id="navigation-drawer"
      v-model="drawer"
      right
      bottom
      app
      clipped
      width="128"
    >
      <!-- item list -->
      <template v-for="(item, index) in itemsDroppedLast">
        <v-list-item
          class="px-2"
          :class="{ active: item.active }"
          @click="handleClickItem({ item })"
          :key="item.title"
          active-class="active"
        >
          <div :class="{ 'children-container': item.children }" />
          <v-avatar
            size="120px"
            :max-height="item.small ? 64 : 128"
            class="d-flex py-8 justify-start"
            :class="{ 'flex-column': !item.small }"
          >
            <v-icon v-text="item.icon" :class="{ 'small-icon': item.small }" />
            <div
              :class="{
                'font-small-container': item.small
              }"
            >
              <span
                :class="{ 'font-big': !item.small, 'font-small': item.small }"
                >{{ item.title }}</span
              >
            </div>
          </v-avatar>
        </v-list-item>
        <v-divider :key="index + 'divider'" />
      </template>
      <!-- last item (clear) -->
      <template v-slot:append>
        <v-list-item
          class="px-2"
          @click="handleClickItem({ item: lastItem })"
          :key="lastItem.title"
          active-class="active"
        >
          <div :class="{ 'children-container': lastItem.children }" />
          <v-avatar
            size="120px"
            max-height="64"
            class="d-flex py-8 justify-start"
          >
            <v-icon v-text="lastItem.icon" class="small-icon" />
            <div class="font-small-container">
              <span class="font-small">{{ lastItem.title }}</span>
            </div>
          </v-avatar>
        </v-list-item>
      </template>
    </v-navigation-drawer>
    <!-- child item list -->
    <template v-if="activeParentItem">
      <v-list-item
        v-for="(child, index) in activeParentItem.children"
        v-show="activeParentItem.active"
        class="px-2 children-drawer"
        :class="{ active: child.active }"
        :style="{
          top: `${(items.indexOf(activeParentItem) + 1) * 120 - 64 * index}px`
        }"
        @click="handleClickChild({ child })"
        :key="child.title"
        active-class="active"
      >
        <v-avatar
          size="120px"
          :max-height="128 / 3"
          class="d-flex py-8 justify-start"
        >
          <v-icon v-text="child.icon" class="small-icon" />
          <div class="font-small-container">
            <span class="font-small">{{ child.title }}</span>
          </div>
        </v-avatar>
      </v-list-item>
    </template>
    <!-- palette -->
    <v-overlay :value="activeChildItem === 'palette' && activeChildItem.active">
      <v-color-picker v-model="color" class="ma-2" mode="hexa" />
      <v-btn class="picker-btn" @click="updateColor">save</v-btn>
    </v-overlay>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import _ from "lodash";

export default {
  computed: {
    ...mapGetters({
      getDrawer: "sidebar/drawer",
      getColor: "sidebar/color",
      items: "sidebar/items",
      activeChildItem: "sidebar/activeChildItem",
      activeParentItem: "sidebar/activeParentItem"
    }),
    drawer: {
      get() {
        return this.getDrawer;
      },
      set(v) {
        this.setDrawer(v);
      }
    },
    color: {
      get() {
        return this.getColor;
      },
      set(v) {
        this.setColor(v);
      }
    },
    itemsDroppedLast() {
      return _.dropRight(this.items);
    },
    lastItem() {
      return this.items[this.items.length - 1];
    }
  },
  methods: {
    ...mapMutations({
      setDrawer: "sidebar/setDrawer",
      setColor: "sidebar/setColor"
    }),
    ...mapActions({
      handleClickItem: "sidebar/handleClickItem",
      handleClickChild: "sidebar/handleClickChild",
      updateColor: "sidebar/updateColor"
    })
  }
};
</script>

<style lang="scss" scoped>
.border-even {
  border-bottom: 1px solid;
  border-color: rgba(255, 255, 255, 0.12);
}
.border-odd {
  border-right: 1px solid;
  border-bottom: 1px solid;
  border-color: rgba(255, 255, 255, 0.12);
}
.active {
  .v-icon,
  span {
    color: #00baff;
  }
  .children-container {
    border-bottom-color: #00baff;
  }
}
.v-icon,
span {
  color: rgba(255, 255, 255, 0.7);
}
.font-big {
  font-size: 16px;
}
.font-small-container {
  width: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.font-small {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
}
.small-icon {
  width: 48px !important;
}
.children-container {
  position: absolute;
  height: calc(100% - 16px);
  border: 7.5px solid transparent;
  border-left: 0;
  border-bottom-color: rgba(255, 255, 255, 0.7);
}
.children-drawer {
  background-color: #363636;
  position: fixed;
  right: 126px;
}
.sidebar-bottom {
  bottom: 0;
  position: absolute;
}
.picker-btn {
  width: 300px;
  margin: 8px;
}
</style>
