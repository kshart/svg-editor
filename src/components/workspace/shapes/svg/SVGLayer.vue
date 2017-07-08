<template>
  <g>
    <component v-for="child in object.childs" key="id" :is="'svg-' + child.name" :object="child" />
  </g>
</template>

<script>
import { Shape } from '@/components/workspace/shapes/Shape'

export default {
  name: 'SVG-Layer',
  extends: Shape
}

/* export class LayerObject {
  name = 'SVG-Layer'
} */
</script>
