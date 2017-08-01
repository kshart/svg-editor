<template>
  <component :is="object.name"/>
</template>

<script>
import { Shape } from '@/components/workspace/shapes/Shape'

export default {
  name: 'SVGBasic',
  mixins: [ Shape ]
}
</script>
