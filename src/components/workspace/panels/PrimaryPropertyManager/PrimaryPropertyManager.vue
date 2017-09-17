<template>
  <div class="main">
    <span class="title">Primary</span>
    <component :is="'ellipse-property'"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CircleProperty from './CircleProperty'
import EllipseProperty from './EllipseProperty'
import LineProperty from './LineProperty'
import PolygonProperty from './PolygonProperty'
import PolylineProperty from './PolylineProperty'
import RectProperty from './RectProperty'

export default {
  name: 'PrimaryPropertyManager',
  components: {
    CircleProperty,
    EllipseProperty,
    LineProperty,
    PolygonProperty,
    PolylineProperty,
    RectProperty
  },
  computed: {
    ...mapState('document', ['selectedItems']),
    isEnabled () {
      return this.selectedItems.length > 0
    },
    selectedItem () {
      return this.selectedItems[0]
    }
  }
}
</script>

<style scoped src="../css/manager.css" />
