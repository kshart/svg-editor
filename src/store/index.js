import Vue from 'vue'
import Vuex from 'vuex'
import workspace from './modules/workspace'
import document from './modules/document'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    workspace,
    document
  },
  strict: debug
})
