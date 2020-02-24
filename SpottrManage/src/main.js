import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import VueSocketIO from 'vue-socket.io'
import router from './router'

import VueLayers from 'vuelayers'
import 'vuelayers/lib/style.css'

Vue.use(VueLayers, {
  dataProjection: 'EPSG:4326'
})

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://192.168.1.19:8001',
  vuex: {
    store,
    actionPrefix: 'SOCKET_',
    mutationPrefix: 'SOCKET_'
  }
}))

new Vue({
  store,
  vuetify,
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
