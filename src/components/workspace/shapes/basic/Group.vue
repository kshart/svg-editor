<template>
  <g v-if="object.visible" v-attr="object.attributes">
    <component v-for="child in object.childs" key="id" :is="'svg-' + child.name" :object="child"  />
  </g>
</template>

<script>
import { Shape } from '@/components/workspace/shapes/Shape'

export default {
  name: 'SVGGroup',
  mixins: [ Shape ]
}
</script>
