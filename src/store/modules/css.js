const types = {
  loadModule: 'loadModule',
  unloadModule: 'unloadModule'
}

const state = {
  modules: []
}

const getters = {
  getProjects: state => search => {
    return 1
  }
}

const mutations = {
  [types.loadModule] (state, { name }) {
  },
  [types.unloadModule] (state, { name }) {
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
