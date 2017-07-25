<template>
  <component :is="object.name" v-attr="object.attributes"/>
</template>

<script>
import { Shape } from '@/components/workspace/shapes/Shape'

export default {
  name: 'SVGBasic',
  mixins: [ Shape ]
}
</script>
