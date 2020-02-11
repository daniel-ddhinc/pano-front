<template>
  <v-layout id="home" content d-flex>
    <Sidebar />
    <v-flex v-show="!item.url">
      <v-card
        v-cloak
        @click="$refs.myFile.click()"
        @drop.prevent="fileChange($event, true)"
        @dragover.prevent
        width="100%"
        height="100%"
        class="dropzone justify-center align-center flex-column d-flex"
      >
        <v-icon :size="200">mdi-file-upload-outline</v-icon>
        <v-card-title>Drag and drop Panorama File</v-card-title>
        <v-card-subtitle class="text-center">
          or browse...
        </v-card-subtitle>
        <v-alert border="left" dense color="secondary">
          * DICOM, JPEG, PNG formats only available
        </v-alert>
      </v-card>
      <input
        type="file"
        ref="myFile"
        v-show="false"
        accept="image/jpeg, image/png, dicom"
        @change="fileChange"
      />
    </v-flex>
    <v-flex class="d3 align-self-center" v-show="item.url" />
    <v-btn
      v-show="!item.url"
      @click="handleFileEmpty"
      absolute
      color="warning"
      bottom
      right
      >DOWNLOAD SAMPLE FILES</v-btn
    >
  </v-layout>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import Sidebar from "./Sidebar";
import _ from "lodash";

export default {
  components: {
    Sidebar
  },
  computed: {
    ...mapGetters({
      drawer: "sidebar/drawer",
      item: "home/item",
      g: "home/g",
      rect: "home/rect",
      text: "home/text",
      detected: "home/detected"
    }),
    param() {
      const route = this.$route;
      return { id: route.params.id };
    }
  },
  data() {
    return {};
  },
  watch: {
    detected() {
      this.createSvgElements();
    }
  },
  methods: {
    ...mapMutations({
      setFile: "home/setFile"
    }),
    ...mapActions({
      handleFileEmpty: "home/handleFileEmpty",
      handleImage: "home/handleImage",
      createSvgElements: "home/createSvgElements"
    }),
    fileChange(e, drop) {
      const file = drop ? e.dataTransfer.files[0] : e.target.files[0];
      this.setFile(file);
      this.handleImage(URL.createObjectURL(file));
    }
  }
};
</script>
<style lang="scss">
.dropzone {
  cursor: pointer;
  &:hover {
    border: 1px dashed;
    opacity: 0.7;
  }
}
</style>
