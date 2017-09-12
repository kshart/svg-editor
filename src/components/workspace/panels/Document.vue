<template>
  <svg-main
    v-if="document"
    class="svg"
    :object="document"
    ref="svg"
    @mousedown.native="mouseDown"
    @mouseup.native="mouseUp"
    @click.native="click"
  />
</template>

<script>
import Vue from 'vue'
import SVG from '@/components/workspace/shapes/svg/SVG'
import { mapMutations } from 'vuex'

Vue.component('svg-main', SVG)

export default {
  name: 'Document',
  methods: {
    mouseDown (event) {
      // console.log(event)
    },
    mouseUp (event) {
      // console.log(event)
    },
    click (event) {
      if (event.target.__vue__) {
        this.selectItem({
          object: event.target.__vue__.object
        })
      }
    },
    getBox () {
      return this.$refs.svg.$el.getBoundingClientRect()
    },
    getViewport () {
      return this.$refs.svg.$el.viewBox.baseVal
    },
    ...mapMutations('document', ['selectItem'])
  },
  computed: {
    document () {
      return this.$store.state.document.pages.length > 0 ? this.$store.state.document.pages[0] : null
    }
  }
}
</script>

<style scoped>
  .svg {
    width: auto;
  }
</style>
