import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.css";
import Anted from "ant-design-vue";

Vue.config.productionTip = false;

Vue.use(Anted)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
