<template>
  <div class="main">
    <span class="title">Fill</span>
    <div class="body">
      <div class="group">
        <div class="block">
          <p class="block-title">Цвет</p>
          <input-color v-model="stroke" />
        </div>
        <div class="block">
          <p class="block-title">fill-rule</p>
          <input-number v-model="strokeOpacity" />
        </div>
      </div>
      <div class="block">
        <p class="block-title">Прозрачность</p>
        <input-percent v-model="strokeOpacity" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import InputNumber from './components/InputNumber'
import InputPercent from './components/InputPercent'
import InputColor from './components/InputColor'
import InputStrokeLinecap from './components/InputStrokeLinecap'

export default {
  name: 'FillManager',
  components: { InputNumber, InputPercent, InputColor, InputStrokeLinecap },
  data () {
    return {
      mode: ''
    }
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
    },
    stroke: {
      get () {
        if (!this.isEnabled) return ''
        return this.getAttribute(this.selectedItem, 'stroke')
      },
      set (val) {
        if (this.isEnabled) {
          this.setAttributes(this.selectedItem, {'stroke': val})
        }
      }
    },
    strokeOpacity: {
      get () {
        if (!this.isEnabled) return ''
        return this.getAttribute(this.selectedItem, 'stroke-opacity')
      },
      set (val) {
        if (this.isEnabled) {
          this.setAttributes(this.selectedItem, {'stroke-opacity': val})
        }
      }
    },
    strokeMiterlimit: {
      get () {
        if (!this.isEnabled) return ''
        return this.getAttribute(this.selectedItem, 'stroke-miterlimit')
      },
      set (val) {
        if (this.isEnabled) {
          this.setAttributes(this.selectedItem, {'stroke-miterlimit': val})
        }
      }
    }
  },
  methods: mapMutations('document', ['setAttributes'])
}
</script>

<style scoped src="./css/manager.css" />
