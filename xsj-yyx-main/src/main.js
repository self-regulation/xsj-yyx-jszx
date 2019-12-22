import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import socket from "./utils/socket";
import { Button, Layout, Col, Row } from "ant-design-vue";
// import "ant-design-vue/lib/button/style/css";

Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Layout);
Vue.use(Col);
Vue.use(Row);
// Vue.use(Layout);

socket.on("connect", () => {
  console.log("连接成功");
});

socket.on("disconnect", () => {
  console.log("连接断开");
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
