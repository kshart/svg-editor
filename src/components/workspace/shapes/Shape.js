export const Shape = {
  props: {
    object: Object
  },
  mounted () {
    this.object._el = this.$el
  },
  destroyed () {
    this.object._el = null
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
