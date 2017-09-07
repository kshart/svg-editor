/* import shop from '../../api/shop' */

const types = {
  CHANGE_SECOND_MENU: 'CHANGE_SECOND_MENU',
  CHANGE_FIRST_MENU_STATUS: 'CHANGE_FIRST_MENU_STATUS'
}

const state = {
  menuName: null/* 'menu-projects' */,
  menuFull: false,
  projectsLoadingProgress: -1,
  projects: [
    {
      id: 1,
      name: 'Название проекта 1',
      description: 'aaa ddd',
      lastChage: new Date()
    }, {
      id: 2,
      name: 'Название проекта 2',
      description: 'aadd',
      lastChage: new Date()
    }, {
      id: 3,
      name: 'Название проекта 3',
      description: 'dasd',
      lastChage: new Date()
    }, {
      id: 4,
      name: 'Название проекта 4',
      description: 'aaaa',
      lastChage: new Date()
    }
  ]
}

const getters = {
  getProjects: state => search => {
    if (!search) return state.projects
    let result = []
    let projects = state.projects.slice()
    search.split(' ').forEach(e => {
      projects.forEach((p, i) => {
        if (p.id === e || p.name.indexOf(e) >= 0 || p.description.indexOf(e) >= 0) {
          const rx = result.find(e => e.id === p.id)
          if (rx) {
            rx.sortWeight++
          } else {
            p.sortWeight = 1
            result.push(p)
          }
        }
      })
    })
    result.sort((a, b) => b.sortWeight - a.sortWeight)
    return result
  }
}

const mutations = {
  [types.CHANGE_SECOND_MENU] (state, { name }) {
    state.menuName = name
  },
  [types.CHANGE_FIRST_MENU_STATUS] (state, { status }) {
    state.menuFull = status
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations
}
