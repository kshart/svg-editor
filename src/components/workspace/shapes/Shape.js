import { hashElements } from '@/store/modules/document'

export const Shape = {
  props: {
    object: Object
  },
  mounted () {
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
      component: 'StringInput',
      title: 'Name',
      change: (object, e) => {
        console.log(object, e)
        object.title = e.target.value
      }
    }
  ]
}
