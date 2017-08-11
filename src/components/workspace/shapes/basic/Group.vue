<template>
  <g v-if="object.visible">
    <component v-for="child in object.childs" :is="'svg-' + child.name" :object="child"  />
  </g>
</template>

<script>
import { Shape } from '@/components/workspace/shapes/Shape'

export default {
  name: 'SVGGroup',
  mixins: [ Shape ]
}
</script>
