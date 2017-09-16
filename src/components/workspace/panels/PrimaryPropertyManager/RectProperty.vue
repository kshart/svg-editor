<template>
  <div class="body">
    <div class="group">
      <div class="block">
        <p class="block-title">x</p>
        <input-number v-model="x" />
      </div>
      <div class="block">
        <p class="block-title">width</p>
        <input-number v-model="width" />
      </div>
      <div class="block">
        <p class="block-title">rx</p>
        <input-number v-model="rx" />
      </div>
    </div>
    <div class="group">
      <div class="block">
        <p class="block-title">y</p>
        <input-number v-model="y" />
      </div>
      <div class="block">
        <p class="block-title">height</p>
        <input-number v-model="height" />
      </div>
      <div class="block">
        <p class="block-title">ry</p>
        <input-number v-model="ry" />
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
  name: 'RectProperty',
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
      'x',
      'y',
      'rx',
      'ry',
      'width',
      'height'
    ])
  },
  methods: mapMutations('document', ['setAttributes'])
}
</script>

<style scoped src="../css/manager.css" />
