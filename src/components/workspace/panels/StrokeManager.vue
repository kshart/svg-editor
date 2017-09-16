<template>
  <div class="main">
    <span class="title">Stroke</span>
    <div class="body">
      <div class="group">
        <div class="block">
          <p class="block-title">Толщина</p>
          <input-number v-model="strokeWidth" />
        </div>
        <div class="block">
          <p class="block-title">Цвет</p>
          <input-color v-model="stroke" />
        </div>
      </div>
      <div class="block">
        <p class="block-title">Прозрачность</p>
        <input-percent v-model="strokeOpacity" />
      </div>
      <div class="block">
        <p class="block-title">Форма</p>
        <input-stroke-linecap v-model="mode" style="margin-bottom:10px" />
        <input-stroke-linecap v-model="mode" />
      </div>
        <div class="block">
          <p class="block-title">Расстояние до «угла»</p>
          <input-number v-model="strokeMiterlimit" />
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
  name: 'StrokeManager',
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
      'strokeWidth',
      'stroke',
      'strokeOpacity',
      'strokeMiterlimit'
    ])
  },
  methods: mapMutations('document', ['setAttributes'])
}
</script>

<style scoped src="./css/manager.css" />
