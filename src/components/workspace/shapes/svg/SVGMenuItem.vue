<template>
  <div>
    <component v-for="child in object.childs" :is="'svg-' + child.name + '-menu-item'" :object="child" />
  </div>
</template>

<script>
import Vue from 'vue'
import { ShapeMenuItem } from '@/components/workspace/shapes/Shape'
import SVGLayerMenuItem from './SVGLayerMenuItem'
import GroupMenuItem from '../basic/GroupMenuItem'
import RectMenuItem from '../basic/RectMenuItem'
import CircleMenuItem from '../basic/CircleMenuItem'
import PathMenuItem from '../basic/PathMenuItem'
import UseMenuItem from '../basic/UseMenuItem'

Vue.component('svg-layer-menu-item', SVGLayerMenuItem)
Vue.component('svg-g-menu-item', GroupMenuItem)
Vue.component('svg-rect-menu-item', RectMenuItem)
Vue.component('svg-circle-menu-item', CircleMenuItem)
Vue.component('svg-path-menu-item', PathMenuItem)
Vue.component('svg-use-menu-item', UseMenuItem)

export default {
  name: 'SVG',
  mixins: [ ShapeMenuItem ]
}
</script>
