<template>
  <div>
    <div class="block">
      <p class="block-title">Режим</p>
      <input-radio-buttons v-model="mode" :buttons="buttons" />
    </div>
    <div class="block" style="margin-bottom:5px">
      <p class="block-title">Режим</p>
      <input-slider-gradient v-model="slider" />
    </div>
    <div class="block">
      <input-list-gradient v-model="slider" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapAttributes } from '@/store/modules/document'
import InputRadioButtons from '../components/InputRadioButtons'
import InputSliderGradient from '../components/InputSliderGradient'
import InputListGradient from '../components/InputListGradient'

export default {
  name: 'FillManagerGradient',
  components: { InputRadioButtons, InputSliderGradient, InputListGradient },
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
    const slider = [
      {
        color: '#00f',
        percent: 0
      }, {
        color: '#ff0',
        percent: 0.7
      }, {
        color: '#123456',
        percent: 0.3
      }, {
        color: '#f00',
        percent: 1
      }
    ]
    return {
      buttons: [
        {value: 'linear', title: 'linear'},
        {value: 'radial', title: 'radial'},
        {value: 'triangle', title: 'triangle'},
        {value: 'square', title: 'square'}
      ],
      mode: 'linear',
      slider: slider.sort((a, b) => a.percent - b.percent)
    }
  }
}
</script>

<style scoped src="../css/manager.css" />
