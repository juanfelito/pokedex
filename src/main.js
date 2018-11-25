import Vue from "vue";
import App from "./App.vue";
import { ObserveVisibility } from "vue-observe-visibility";

Vue.config.productionTip = false;

Vue.directive("observe-visibility", ObserveVisibility);

Vue.filter("capitalize", function(value) {
  value = value.split("-");
  return value[0].charAt(0).toUpperCase() + value[0].slice(1);
});

new Vue({
  render: h => h(App)
}).$mount("#app");
