<template>
  <div class="main">
    <span class="title">Primary</span>
    <component v-if="component" :is="component"/>
    <p v-else>unsupported</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RectProperty from './RectProperty'
import CircleProperty from './CircleProperty'
import EllipseProperty from './EllipseProperty'
import LineProperty from './LineProperty'
import PolylineProperty from './PolylineProperty'
import PolygonProperty from './PolygonProperty'

export default {
  name: 'PrimaryPropertyManager',
  components: {
    RectProperty,
    CircleProperty,
    EllipseProperty,
    LineProperty,
    PolylineProperty,
    PolygonProperty
  },
  computed: {
    ...mapState('document', ['selectedItems']),
    isEnabled () {
      return this.selectedItems.length > 0
    },
    selectedItem () {
      return this.selectedItems[0]
    },
    component () {
      if (!this.selectedItem) {
        return false
      }
      switch (this.selectedItem.name) {
        case 'rect':
          return 'RectProperty'
        case 'circle':
          return 'CircleProperty'
        case 'ellipse':
          return 'EllipseProperty'
        case 'line':
          return 'LineProperty'
        case 'polyline':
          return 'PolylineProperty'
        case 'polygon':
          return 'PolygonProperty'
        default:
          return false
      }
    }
  }
}
</script>

<style scoped src="../css/manager.css" />
