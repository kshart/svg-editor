<template>
  <div
    class="document-box"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
  >
    <svg-main
      v-if="document"
      ref="svg"
      class="svg"
      preserveAspectRatio="none"
      :style="svgStyle"
      :object="document"
      @click.native="click"
    />
    <div class="grid" :style="gridPosition">
      <div v-for="item in gridX" class="grid-x" :style="item" />
      <div v-for="item in gridY" class="grid-y" :style="item" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import SVG from '@/components/workspace/shapes/svg/SVG'
import { mapMutations } from 'vuex'

Vue.component('svg-main', SVG)

export default {
  name: 'Document',
  data () {
    return {
      offset: null,
      zoom: 1,
      aspectRatio: 1,
      position: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    document () {
      return this.$store.state.document.pages.length > 0 ? this.$store.state.document.pages[0] : null
    },
    svgStyle () {
      const bbox = this.getBox()
      console.log(this.aspectRatio)
      return {
        left: this.position.x,
        top: this.position.y,
        'margin-left': -bbox.width / 2,
        'margin-top': -bbox.height / 2,
        width: this.zoom * 100 + 'px',
        height: this.zoom * 100 * this.aspectRatio + 'px',
        background: '#fff'
      }
    },
    gridX () {
      const result = []
      for (let x = 0; x < 100; ++x) {
        result.push({
          left: x * 20 + 'px',
          width: '1px',
          height: '150%',
          background: '#f00',
          position: 'absolute'
        })
      }
      return result
    },
    gridY () {
      console.log(123)
      const result = []
      for (let y = 0; y < 40; ++y) {
        result.push({
          top: y * 20 + 'px',
          width: '150%',
          height: '1px',
          background: '#f00',
          position: 'absolute'
        })
      }
      return result
    },
    gridPosition () {
      return {
        left: this.position.x % 20 - 20 + 'px',
        top: this.position.y % 20 - 20 + 'px',
        width: '100%',
        height: '100%',
        position: 'absolute'
      }
    }
  },
  methods: {
    mouseDown (e, item) {
      const bbox = this.getBox()
      this.offset = {
        x: e.clientX - bbox.left - bbox.width / 2,
        y: e.clientY - bbox.top - bbox.height / 2
      }
      console.log(this.offset.x, this.offset.y)
      this.$nextTick(vue => {
        window.addEventListener('mousemove', this.mouseMove)
        window.addEventListener('mouseup', this.mouseUp)
      })
    },
    mouseMove (e) {
      const bbox = this.$el.getBoundingClientRect()
      this.position.x = e.clientX - bbox.left - this.offset.x
      this.position.y = e.clientY - bbox.top - this.offset.y
    },
    mouseUp (e) {
      window.removeEventListener('mousemove', this.mouseMove)
    },
    mouseEnter (e) {
      this.mouseOver = true
    },
    mouseLeave (e) {
      this.mouseOver = false
    },
    click (e) {
      if (e.target.__vue__) {
        this.selectItem({
          object: e.target.__vue__.object
        })
      }
    },
    wheel (e) {
      if (this.mouseOver) {
        this.zoom += e.deltaY / 100
        if (this.zoom < 0.1) {
          this.zoom = 0.1
        } else if (this.zoom > 100) {
          this.zoom = 100
        }
      }
    },
    getBox () {
      return this.$refs.svg ? this.$refs.svg.$el.getBoundingClientRect() : {}
    },
    getViewport () {
      return this.$refs.svg.$el.viewBox.baseVal
    },
    ...mapMutations('document', ['selectItem'])
  },
  beforeDestroy () {
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
    window.removeEventListener('wheel', this.wheel)
  },
  mounted () {
    window.addEventListener('wheel', this.wheel)
    const bbox = this.getBox()
    this.aspectRatio = bbox.width / bbox.height
  }
}
</script>

<style scoped>
  .document-box {
    overflow: hidden;
    background-color: #444;
  }

  .svg {
    position: absolute;
  }
  .grid-x {
    width: 1px;
    height: 150%;
    background: #f00;
    position: absolute;
    pointer-events: none;
  }
  .grid-y {
    width: 1px;
    height: 150%;
    background: #f00;
    position: absolute;
    pointer-events: none;
  }
</style>
