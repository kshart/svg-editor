<template>
  <svg>
    <component v-for="(child, key) in object.childs" :key="key" :is="'svg-' + child.name" :object="child" />
  </svg>
</template>

<script>
import Vue from 'vue'
import { Shape } from '@/components/workspace/shapes/Shape'
import SVGLayer from '@/components/workspace/shapes/svg/SVGLayer'
import SVGGroup from '@/components/workspace/shapes/basic/Group'
import SVGBasic from '@/components/workspace/shapes/basic/Basic'

Vue.component('svg-layer', SVGLayer)
Vue.component('svg-g', SVGGroup)
Vue.component('svg-rect', SVGBasic)
Vue.component('svg-circle', SVGBasic)
Vue.component('svg-use', SVGBasic)
Vue.component('svg-path', SVGBasic)

export default {
  name: 'SVG',
  mixins: [ Shape ],
  mounted () {
    const style = document.createElement('style')
    style.innerHTML = '.sss {fill: #ff0;}'
    this.$el.appendChild(style)
    // this.$el.removeChild(style)
    console.log(style)
  }
}
</script>
