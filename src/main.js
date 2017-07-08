import 'normalize.css'
import Vue from 'vue'
import App from './App'
import store from './store/index'
import router from './router'
import pjson from '../package.json'
import VueMaterial from 'vue-material'
import VueScroll from 'vue-scroll'
import 'vue-material/dist/vue-material.css'

Vue.config.productionTip = false

Vue.use(VueMaterial)
Vue.use(VueScroll)

Vue.material.registerTheme({
  default: {
    primary: {
      color: 'white',
      hue: 700
    },
    accent: 'red'
  }
})

console.log(pjson.version)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
