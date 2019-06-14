import Vue from "vue";
import VCharts from 'v-charts';
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
Vue.use(Element);
Vue.use(VCharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
