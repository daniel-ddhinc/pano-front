const path = require("path");

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: process.env.VUE_APP_ROOT_API,
        changeOrigin: true,
        secure: false
      }
    },
    port: 8080
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.join(__dirname, "src/")
      }
    }
  },
  transpileDependencies: ["vuetify"]
};
