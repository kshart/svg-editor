import Vue from 'vue'
import parser from 'xml-parser'

const types = {
  LOAD: 'LOAD',
  CREATE: 'CREATE',
  CREATE_PAGE: 'CREATE_PAGE',
  CREATE_LAYER: 'CREATE_LAYER',
  selectItem: 'selectItem',
  setAttributes: 'setAttributes'
}

export let hashElements = new Map()

const state = {
  _id_generator: 1,
  name: '',
  selectedItems: [],
  selectedPage: null,
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

const actions = {
}

const getters = {
  getAttribute: state => (object, attribute) => {
    if (!object || !object.attributes) {
      console.warn('getAttribute:: !object || !object.attributes')
      return
    }
    if (object.attributes[attribute]) {
      return object.attributes[attribute]
    }
    console.warn(`getAttribute:: object attribute ${attribute}`, object)
    const el = hashElements.get(object._key)
    if (!el) {
      return
    }
    return window.getComputedStyle(el).getPropertyValue(attribute)
  }
}

const mutations = {
  [types.LOAD] (state, { document }) {
    const doc = parser(document)
    if (!doc) {
      return false
    }
    let generator = 0
    const elements = []
    let data = {
      childs: []
    }
    // let hashTable = []
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
            title: '',
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
            childs: [],
            title: ''
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
            name,
            title: ''
          }
          break
        default:
          return
      }
      // if (obj.attributes.id) hashTable[obj.attributes.id] = obj
      elements.push(obj)
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
    state.pages.push(data.childs[0])
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
  },
  [types.selectItem] (state, { object, add, remove }) {
    if (!object && !add && !remove) {
      return
    }
    if (!add && !remove) {
      state.selectedItems = [object]
    } else if (add) {
      state.selectedItems.push(object)
    } else if (remove) {
      const index = state.selectedItems.indexOf(object)
      state.selectedItems.splice(index, 1)
    }
  },
  [types.setAttributes] (state, { object, attributes }) {
    if (!object || !object.attributes) {
      return
    }
    attributes.forEach((value, attr) => {
      Vue.set(object.attributes[attr], value)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
