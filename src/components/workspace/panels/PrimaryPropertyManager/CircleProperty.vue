<template>
  <div class="body">
    <div class="group">
      <div class="block">
        <p class="block-title">cx</p>
        <input-number v-model="cx" />
      </div>
      <div class="block">
        <p class="block-title">cy</p>
        <input-number v-model="cy" />
      </div>
      <div class="block">
        <p class="block-title">r</p>
        <input-number v-model="r" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { mapAttributes } from '@/store/modules/document'
import InputNumber from '../components/InputNumber'
import InputPercent from '../components/InputPercent'
import InputColor from '../components/InputColor'
import InputStrokeLinecap from '../components/InputStrokeLinecap'

export default {
  name: 'CircleProperty',
  components: { InputNumber, InputPercent, InputColor, InputStrokeLinecap },
  computed: {
    ...mapState('document', ['selectedItems']),
    ...mapGetters('document', ['getAttribute']),
    isEnabled () {
      return this.selectedItems.length > 0
    },
    selectedItem () {
      return this.selectedItems[0]
    },
    ...mapAttributes('document', [
      'cx',
      'cy',
      'r'
    ])
  },
  methods: mapMutations('document', ['setAttributes'])
}
</script>

<style scoped src="../css/manager.css" />
