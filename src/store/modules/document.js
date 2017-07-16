import parser from 'xml-parser'

const types = {
  LOAD: 'LOAD',
  CREATE: 'CREATE',
  CREATE_PAGE: 'CREATE_PAGE',
  CREATE_LAYER: 'CREATE_LAYER'
}

const state = {
  _id_generator: 1,
  name: '',
  pages: [
    /* {
      name: 'Name 1',
      description: 'description, description, description, description, description',
      data: {
        name: 'svg-main',
        childs: [
          {
            name: 'svg-layer',
            childs: [
              {
                name: 'svg-g',
                childs: [
                  {
                    name: 'svg-rect',
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 50
                  }
                ]
              },
              {name: 'div'}
            ]
          }
        ]
      }
    } */
  ]
}

const getters = {
}

const mutations = {
  [types.LOAD] (state, { document }) {
    const doc = parser(document)
    if (!doc) {
      return false
    }
    let generator = 0
    let data = {
      childs: []
    }
    let hashTable = []
    const load = (element, { name, children, attributes }) => {
      let obj = null
      for (let attr in attributes) {
        const pos = attr.lastIndexOf(':')
        if (pos >= 0) {
          attributes[attr.substr(pos + 1)] = attributes[attr]
          delete attributes[attr]
        }
      }
      switch (name) {
        case 'svg':
          obj = {
            attributes,
            _key: Symbol(),
            name,
            childs: []
          }
          children.forEach(ch => load(obj, ch))
          break
        case 'g':
          obj = {
            attributes,
            _key: Symbol(),
            name: 'g',
            visible: true,
            childs: []
          }
          children.forEach(ch => load(obj, ch))
          break
        case 'rect':
        case 'use':
        case 'circle':
        case 'path':
          obj = {
            attributes,
            _key: Symbol(),
            name
          }
          break
        default:
          return
      }
      if (obj.attributes.id) hashTable[obj.attributes.id] = obj
      element.childs.push(obj)
    }
    load(data, doc.root)
    /* const registerUse = (element) => {
      switch (element.name) {
        case 'svg':
        case 'g':
          element.childs.forEach(ch => registerUse(ch))
          break
        case 'use':
          element.link = hashTable[element.attributes.href.substr(1)]
          break
      }
    }
    registerUse(data.childs[0]) */
    state.pages.push({
      _key: Symbol(),
      id: ++generator,
      name: 'Name 1',
      description: '',
      data: data.childs[0]
    })
    state._id_generator = generator
  },
  [types.CREATE] (state, { name }) {
    state.name = name
    state.pages = []
  },
  [types.CREATE_PAGE] (state, { name, description }) {
    state.pages.push({
      _key: Symbol(),
      id: ++state._id_generator,
      name: name || 'Страница',
      description,
      childs: []
    })
  }
  /* [types.CREATE_LAYER] (state, { page }) {
    page.childs.push({
      id: ++state._id_generator,
      name: 'svg-layer',
      childs: []
    })
  } */
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
