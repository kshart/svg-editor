<template>
  <div class="main">
    <span class="title">Fill</span>
    <div class="body">
      <div class="block">
        <p class="block-title">Режим</p>
        <input-radio-buttons v-model="mode" :buttons="buttons" />
      </div>
      <component :is="'fill-manager-' + mode" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapAttributes } from '@/store/modules/document'
import InputRadioButtons from '../components/InputRadioButtons'
import InputPercent from '../components/InputPercent'
import InputColor from '../components/InputColor'
import FillManagerMono from './FillManagerMono'
import FillManagerGradient from './FillManagerGradient'

export default {
  name: 'FillManager',
  components: { InputRadioButtons, InputPercent, InputColor, FillManagerMono, FillManagerGradient },
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
  },
  data () {
    return {
      buttons: [
        {value: 'mono', title: 'mono'},
        {value: 'gradient', title: 'gradient'},
        {value: 'template', title: 'template'}
      ],
      mode: 'mono'
    }
  }
}
</script>

<style scoped src="../css/manager.css" />
