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
import { mapState, mapGetters, mapMutations } from 'vuex'
import { mapAttributes } from '@/store/modules/document'
import InputNumber from '../components/InputNumber'
import InputPercent from '../components/InputPercent'
import InputColor from '../components/InputColor'
import InputStrokeLinecap from '../components/InputStrokeLinecap'

export default {
  name: 'PolygonProperty',
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
      'points'
    ])
  },
  methods: mapMutations('document', ['setAttributes'])
}
</script>

<style scoped src="../css/manager.css" />
