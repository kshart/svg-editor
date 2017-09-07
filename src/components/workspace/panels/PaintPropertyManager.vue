<template>
  <div class="main">
    <span class="title">{{title}}</span>
    <div class="body">
      <div class="group">
        <div class="block">
          <p class="block-title">Толщина</p>
          <input-number v-model="x" />
        </div>
        <div class="block">
          <p class="block-title">Цвет</p>
          <input-color v-model="color" />
        </div>
      </div>
      <div class="block">
        <p class="block-title">Прозрачность</p>
        <input-percent v-model="x" />
      </div>
      <div class="block">
        <p class="block-title">Форма</p>
        <input-stroke-linecap v-model="mode" style="margin-bottom:10px" />
        <input-stroke-linecap v-model="mode" />
      </div>
        <div class="block">
          <p class="block-title">Расстояние до «угла»</p>
          <input-number v-model="x" />
        </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import InputNumber from './components/InputNumber'
import InputPercent from './components/InputPercent'
import InputColor from './components/InputColor'
import InputStrokeLinecap from './components/InputStrokeLinecap'

export default {
  name: 'PaintPropertyManager',
  components: { InputNumber, InputPercent, InputColor, InputStrokeLinecap },
  data () {
    return {
      title: 'Позиция',
      x: 111,
      mode: '',
      color: '#cccccc'
    }
  },
  computed: {
    ...mapState('document', ['selectedItems']),
    isEnabled () {
      return this.selectedItems.length > 0
    },
    selectedItem () {
      return this.selectedItems[0]
    }
  }
}
</script>

<style scoped>
  .main {
    position: relative;
    background: #4d4d4d;
    width: 300px;
    padding: 4px;
  }
  .title {
    display: block;
    padding: 3px;
    padding-bottom: 0;
    color: #aaa;
    font-size: 12pt;
  }
  .block {
    width: 100%;
    padding: 3px;
    position: relative;
  }
  .block-title {
    padding: 3px 0;
    margin: 0;
    color: #b3b3b3;
  }
  .group {
    display: flex;
  }

  
</style>
