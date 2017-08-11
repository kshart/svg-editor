import { hashElements } from '@/store/modules/document'

export const Shape = {
  props: {
    object: Object
  },
  mounted () {
    const update = (newVal, oldVal) => {
      console.log(newVal ? newVal.x : null, oldVal ? oldVal.x : null)
      for (const e in this.object.attributes) {
        this.$el.setAttribute(e, this.object.attributes[e])
      }
    }
    this.$watch('object.attributes', update, {
      deep: true,
      immediate: true
    })
    hashElements.set(this.object._key, this.$el)
  },
  destroyed () {
    hashElements.delete(this.object._key)
  }
}

export class ShapeObject {
  name = 'Shape'
}

export const ShapeMenuItem = {
  props: {
    object: Object
  }
}
export const ShapeOptionsConfig = {
  tools: [
    {
      component: 'PositionInput'
    }/* , {
      component: 'NumberInput',
      title: 'Name',
      change: (object, e) => {
        console.log(object, e)
        object.title = e.target.value
      }
    }, {
      component: 'PositionInput',
      title: 'PositionInput',
      change: (object, e) => {
        console.log(object, e)
        object.title = e.target.value
      }
    } */
  ]
}
