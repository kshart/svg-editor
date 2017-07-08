<template>
  <g v-attr="object.attributes">
    <component v-for="child in object.childs" key="id" :is="'svg-' + child.name" :object="child"  />
  </g>
</template>

<script>
import { Shape } from '@/components/workspace/shapes/Shape'

export default {
  name: 'SVG-Group',
  extends: Shape,
  mounted () {
    this.$el.id = this.object.attributes.id
  }
}

/* export class GroupObject {
  name = 'SVG-Group'
} */
</script>
