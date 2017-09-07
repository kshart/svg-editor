<template>
  <g>
    <component v-for="(child, key) in object.childs" :key="key" :is="'svg-' + child.name" :object="child" />
  </g>
</template>

<script>
import { Shape } from '@/components/workspace/shapes/Shape'

export default {
  name: 'SVG-Layer',
  mixins: [ Shape ]
}
</script>
