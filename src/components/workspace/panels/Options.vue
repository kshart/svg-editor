<template>
  <div>
    Options
    <component v-for="conf in tools" :is="conf.component" :object="object"/>
  </div>
</template>

<script>
import { ShapeOptionsConfig } from '../shapes/Shape'

import PositionInput from './Options/PositionInput'

const config = {
  shape: ShapeOptionsConfig
}

export default {
  name: 'Options',
  components: { PositionInput },
  props: {
    object: Object
  },
  data () {
    return {
      tools: config.shape.tools
    }
  }
}
</script>
