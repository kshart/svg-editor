<template>
  <div
    class="document-box"
    @mouseenter="mouseEnter"
    @mouseleave="mouseLeave"
    @mousedown.left ="mouseDown"
    @mouseup="mouseUp"
  >
    <svg v-if="showGrid" class="grid" :viewBox="`0 0 ${rect.width} ${rect.height}`" :style="gridPosition">
      <line
        v-for="(item, key) in grid"
        class="grid-line"
        :key="key"
        :x1="item.x1"
        :y1="item.y1"
        :x2="item.x2"
        :y2="item.y2"
      />
    </svg>
    <svg-main
      v-if="document"
      ref="svg"
      class="svg"
      preserveAspectRatio="none"
      :style="svgStyle"
      :object="document"
      @click.native="click"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import SVG from '@/components/workspace/shapes/svg/SVG'
import { mapMutations } from 'vuex'

Vue.component('svg-main', SVG)

export default {
  name: 'Document',
  props: {
    rect: Object
  },
  data () {
    return {
      showGrid: false,
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
      console.log(this.position.x + this.rect.width / 2, this.position.y + this.rect.height / 2)
      return {
        // transform: `translate(${this.position.x - this.rect.width / 2}px, ${this.position.y - this.rect.height / 2}px)`,
        transform: `translate(${this.position.x + this.rect.width / 2}px, ${this.position.y + this.rect.height / 2}px) scale(${this.zoom})`,
        background: '#fff'
      }
    },
    grid () {
      const result = []
      for (let x = 0; x < 120; ++x) {
        result.push({
          x1: 0,
          x2: 2000,
          y1: x * 15,
          y2: x * 15
        })
      }
      for (let y = 0; y < 140; ++y) {
        result.push({
          x1: y * 15,
          x2: y * 15,
          y1: 0,
          y2: 2000
        })
      }
      return result
    },
    gridPosition () {
      return {
        transform: `translate(${this.position.x % 20 - 9}px, ${this.position.y % 20 - 9}px)`
      }
    }
  },
  methods: {
    mouseDown (e, item) {
      const bbox = this.getBox()
      this.offset = {
        x: e.clientX - bbox.x + (this.rect.width / 2),
        y: e.clientY - bbox.y + (this.rect.height / 2)
      }
      console.log(this.offset.x, bbox.x, e.clientX)
      this.$nextTick(vue => {
        window.addEventListener('mousemove', this.mouseMove)
        window.addEventListener('mouseup', this.mouseUp)
      })
    },
    mouseMove (e) {
      const bbox = this.$el.getBoundingClientRect()
      this.position.x = (e.clientX - bbox.x) - this.offset.x
      this.position.y = (e.clientY - bbox.y) - this.offset.y
      // console.log(this.position.x, this.position.y)
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
      console.log(e.target)
      if (e.target.__vue__) {
        this.selectItem({
          object: e.target.__vue__.object
        })
      }
    },
    wheel (e) {
      if (this.mouseOver) {
        this.zoom += e.deltaY / 2 / 1000
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
  mounted () {
    window.addEventListener('wheel', this.wheel)
    const bbox = this.getBox()
    this.aspectRatio = bbox.width / bbox.height
    this.position.x = -bbox.width / 2
    this.position.y = -bbox.height / 2
  },
  beforeDestroy () {
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
    window.removeEventListener('wheel', this.wheel)
  }
}
</script>

<style scoped>
  .document-box {
    user-select: none;
    overflow: scroll;
    background: #444;
    color: #eee;
  }

  .document-box::-webkit-scrollbar {
    background: #292929;
    width: auto;
    height: auto;
  }
  .document-box::-webkit-scrollbar-button {
    display: none;
  }
  .document-box::-webkit-scrollbar-thumb {
    background: #555;
  }
  .document-box::-webkit-scrollbar-thumb:hover {
    background: #5a5a5a;
  }
  .svg {
    position: absolute;
    /* transition: transform 1ms ease; */
  }
  .grid {
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .grid-line {
    stroke-width: 1;
    stroke: #555;
  }
</style>
