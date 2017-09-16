<template>
  <div class="body">
    <div class="group">
      <div class="block">
        <p class="block-title">x1</p>
        <input-number v-model="x1" />
      </div>
      <div class="block">
        <p class="block-title">y1</p>
        <input-number v-model="y1" />
      </div>
      <div class="block">
        <p class="block-title">x2</p>
        <input-number v-model="x2" />
      </div>
      <div class="block">
        <p class="block-title">y2</p>
        <input-number v-model="y2" />
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
  name: 'LineProperty',
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
      'x1',
      'y1',
      'x2',
      'y2'
    ])
  },
  methods: mapMutations('document', ['setAttributes'])
}
</script>

<style scoped src="../css/manager.css" />
