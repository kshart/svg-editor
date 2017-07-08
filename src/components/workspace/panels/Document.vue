<template>
  <svg-main v-if="data" :object="data" />
</template>

<script>
import Vue from 'vue'
import SVG from '@/components/workspace/shapes/svg/SVG'

Vue.component('svg-main', SVG)

export default {
  name: 'Document',
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>
