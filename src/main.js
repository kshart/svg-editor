import './path-data-polyfill'
import 'normalize.css'
import Vue from 'vue'
import App from './App'
import store from './store/index'
import router from './router'
import VueMaterial from 'vue-material'
import VueScroll from 'vue-scroll'
import VueResize from 'vue-resize'
import 'vue-material/dist/vue-material.css'
import Storage from './Storage'
import pako from 'pako'
Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(VueScroll)
Vue.use(VueResize)
Vue.use(Storage, {
  compress (rawData) {
    return pako.deflate(rawData, { to: 'string', level: 1 })
  },
  decompress (rawData) {
    return pako.inflate(rawData, { to: 'string', level: 1 })
  }
})

Vue.material.registerTheme({
  default: {
    primary: {
      color: 'white',
      hue: 700
    },
    accent: 'red'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
