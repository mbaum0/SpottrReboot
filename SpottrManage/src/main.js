import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import VueSocketIO from 'vue-socket.io'

//Vue.config.productionTip = false;

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:8001',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

new Vue({
  store,
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
