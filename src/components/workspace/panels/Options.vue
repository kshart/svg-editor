<template>
  <div>
    Options
    <component v-for="conf in tools" :is="conf.component" @change="change(conf, $event)"/>
  </div>
</template>

<script>
import { ShapeOptionsConfig } from '../shapes/Shape'

import StringInput from './Options/StringInput'

const config = {
  shape: ShapeOptionsConfig
}

export default {
  name: 'Options',
  components: { StringInput },
  props: {
    object: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      tools: config.shape.tools
    }
  },
  methods: {
    change (conf, event) {
      this.$store.commit('document/UPDATE_ELEMENT', {
        callback: conf.change,
        object: this.object,
        event
      })
    }
  }
}
</script>
