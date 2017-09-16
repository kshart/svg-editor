<template>
  <div class="main">
    <span class="title">Primary</span>
    {{ stroke }}
    <component :is="'ellipse-property'"/>
  </div>
</template>

<script>
import { mapAttributes } from '@/store/modules/document'
import { mapState, mapGetters, mapMutations } from 'vuex'
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
    ...mapGetters('document', ['getAttribute']),
    isEnabled () {
      return this.selectedItems.length > 0
    },
    selectedItem () {
      return this.selectedItems[0]
    },
    ...mapAttributes('document', ['stroke']),
    strokeWidth: {
      get () {
        if (!this.isEnabled) return ''
        return this.getAttribute(this.selectedItem, 'stroke-width')
      },
      set (val) {
        if (this.isEnabled) {
          this.setAttributes(this.selectedItem, {'stroke-width': val})
        }
      }
    }
  },
  methods: mapMutations('document', ['setAttributes']),
  mounted () {
    console.log(this.$store.getters[''])
  }
}
</script>

<style scoped src="../css/manager.css" />
