<template>
  <svg v-attr="object.attributes">
    <component v-for="child in object.childs" key="_key" :is="'svg-' + child.name" :object="child" />
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
Vue.directive('attr', {
  inserted: function (el, binding, vnode) {
    for (const e in binding.value) {
      el.setAttribute(e, binding.value[e])
    }
  }
})

export default {
  name: 'SVG',
  extends: Shape
}
</script>

<style scoped>
svg {
  height: 100%;
  width: 100%;
  background-color: #444;
}
</style>
