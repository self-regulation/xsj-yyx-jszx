module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/": {
        ws: false, // websocket 不需要代理
        target: "http://localhost:3001",
        changeOrigin: true
      }
    }
    // port: "8081"
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#1DA57A"
        },
        javascriptEnabled: true
      }
    }
  },
  // configureWebpack: {
  //   plugins: [themePlugin, new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)],
  //   resolve: {
  //     alias: {
  //       // "@ant-design/icons/lib/dist$": path.resolve(__dirname, "./src/icons.js")
  //     }
  //   }
  // },
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");

    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear();

    // 添加要替换的 loader
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");

    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    // config.resolve.symlinks(true);
    // config.entry("index").add("babel-polyfill");
  }
};
