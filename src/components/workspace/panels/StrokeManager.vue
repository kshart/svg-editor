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
    strokeWidth: {
      get () {
        if (!this.isEnabled) return ''
        return this.getAttribute(this.selectedItem, 'stroke-width')
      },
      set (val) {
        if (this.isEnabled) {
          this.setAttributes(this.selectedItem, {'stroke-width': val})
        }
      }
    },
    stroke: {
      get () {
        if (!this.isEnabled) return ''
        return this.getAttribute(this.selectedItem, 'stroke')
      },
      set (val) {
        if (this.isEnabled) {
          this.setAttributes(this.selectedItem, {'stroke': val})
        }
      }
    },
    strokeOpacity: {
      get () {
        if (!this.isEnabled) return ''
        return this.getAttribute(this.selectedItem, 'stroke-opacity')
      },
      set (val) {
        if (this.isEnabled) {
          this.setAttributes(this.selectedItem, {'stroke-opacity': val})
        }
      }
    },
    strokeMiterlimit: {
      get () {
        if (!this.isEnabled) return ''
        return this.getAttribute(this.selectedItem, 'stroke-miterlimit')
      },
      set (val) {
        if (this.isEnabled) {
          this.setAttributes(this.selectedItem, {'stroke-miterlimit': val})
        }
      }
    }
  },
  methods: mapMutations('document', ['setAttributes'])
}
</script>

<style scoped>
  .main {
    position: relative;
    background: #4d4d4d;
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
