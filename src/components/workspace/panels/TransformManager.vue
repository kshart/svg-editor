<template>
  <div class="main">
    <span class="title">Transform</span>
    <div class="body">
      <div class="group">
        <div class="block">
          <p class="block-title">translate</p>
          <input-number v-model="translate" />
        </div>
        <div class="block">
          <p class="block-title">scale</p>
          <input-number v-model="scale" />
        </div>
        <div class="block">
          <p class="block-title">rotate</p>
          <input-number v-model="rotate" />
        </div>
      </div>
      <div class="group">
        <div class="block">
          <p class="block-title">skewX</p>
          <input-number v-model="skewX" />
        </div>
        <div class="block">
          <p class="block-title">skewY</p>
          <input-number v-model="skewY" />
        </div>
        <div class="block">
          <p class="block-title">matrix?</p>
          <input-number v-model="matrix" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { mapAttributes } from '@/store/modules/document'
import InputNumber from './components/InputNumber'
import InputPercent from './components/InputPercent'
import InputColor from './components/InputColor'
import InputStrokeLinecap from './components/InputStrokeLinecap'

export default {
  name: 'TransformManager',
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
    ...mapAttributes('document', [
      'translate',
      'scale',
      'rotate',
      'skewX',
      'skewY',
      'matrix'
    ])
  },
  methods: mapMutations('document', ['setAttributes'])
}
</script>

<style scoped src="./css/manager.css" />
