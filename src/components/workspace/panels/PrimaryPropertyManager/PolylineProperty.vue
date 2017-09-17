<template>
  <div class="body">
    <div class="group">
      <div class="block">
        <p class="block-title">points</p>
        <input-number v-model="points" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapAttributes } from '@/store/modules/document'
import InputNumber from '../components/InputNumber'
import InputPercent from '../components/InputPercent'
import InputColor from '../components/InputColor'
import InputStrokeLinecap from '../components/InputStrokeLinecap'

export default {
  name: 'PolylineProperty',
  components: { InputNumber, InputPercent, InputColor, InputStrokeLinecap },
  computed: {
    ...mapState('document', ['selectedItems']),
    isEnabled () {
      return this.selectedItems.length > 0
    },
    selectedItem () {
      return this.selectedItems[0]
    },
    ...mapAttributes('document', [
      'points'
    ])
  }
}
</script>

<style scoped src="../css/manager.css" />
