<template>
  <div class="main">
    <span class="title">Fill</span>
    <div class="body">
      <div class="group">
        <div class="block">
          <p class="block-title">Цвет</p>
          <input-color v-model="fill" />
        </div>
        <div class="block">
          <p class="block-title">fill-rule</p>
          <input-number v-model="fillRule" />
        </div>
      </div>
      <div class="block">
        <p class="block-title">Прозрачность</p>
        <input-percent v-model="fillOpacity" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapAttributes } from '@/store/modules/document'
import InputNumber from './components/InputNumber'
import InputPercent from './components/InputPercent'
import InputColor from './components/InputColor'
import InputStrokeLinecap from './components/InputStrokeLinecap'

export default {
  name: 'FillManager',
  components: { InputNumber, InputPercent, InputColor, InputStrokeLinecap },
  computed: {
    ...mapState('document', ['selectedItems']),
    ...mapAttributes('document', {
      fill: 'fill',
      fillRule: 'fill-rule',
      fillOpacity: 'fill-opacity'
    }),
    isEnabled () {
      return this.selectedItems.length > 0
    },
    selectedItem () {
      return this.selectedItems[0]
    }
  }
}
</script>

<style scoped src="./css/manager.css" />
