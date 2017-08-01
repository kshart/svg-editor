<template>
  <svg-main v-if="data" class="svg" :object="data" ref="svg"/>
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
  },
  methods: {
    getBox () {
      return this.$refs.svg.$el.getBoundingClientRect()
    },
    getViewport () {
      return this.$refs.svg.$el.viewBox.baseVal
    }
  }
}
</script>

<style scoped>
  .svg {
    width: auto;
  }
</style>
