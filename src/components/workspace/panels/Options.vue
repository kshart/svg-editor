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
  data () {
    return {
      tools: config.shape.tools
    }
  },
  computed: {
    object () {
      return this.$store.state.document.pages.length > 0 ? this.$store.state.document.pages[0].data.childs[0] : null
    }
  }
}
</script>
