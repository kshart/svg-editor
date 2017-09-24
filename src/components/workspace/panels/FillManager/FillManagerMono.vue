<template>
  <div>
  123
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapAttributes } from '@/store/modules/document'
import InputRadioButtons from '../components/InputRadioButtons'
import InputPercent from '../components/InputPercent'
import InputColor from '../components/InputColor'
import InputStrokeLinecap from '../components/InputStrokeLinecap'

export default {
  name: 'FillManagerMono',
  components: { InputRadioButtons, InputPercent, InputColor, InputStrokeLinecap },
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

<style scoped src="../css/manager.css" />
