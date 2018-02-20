<template>
  <div class="input-list">
    <div class="markers">
      <div
        v-for="(item, key) in items"
        class="marker"
        :key="key"
        @click="$emit('select', item)"
      >
        <span class="marker-color" :style="{
          background: item.color,
          color: isDark(item.color) ? '#fff' : '#000'
        }" />
        <input-percent />
        <span class="marker-percent">
          {{ formated(item.percent) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import round from 'lodash.round'
import InputPercent from '../components/InputPercent'
import Color from 'color'

export default {
  name: 'InputListGradient',
  components: { InputPercent },
  model: {
    prop: 'items',
    event: 'change'
  },
  props: {
    items: Array,
    staticMarkers: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      selectedItem: null,
      rect: null
    }
  },
  methods: {
    removeItem (item) {
      const index = this.items.indexOf(item)
      this.items.splice(index, 1)
    },
    isDark (color) {
      return Color(color).dark()
    },
    formated (number) {
      return round(number * 100, 2) + '%'
    }
  }
}
</script>

<style scoped>
  .input-list {
  }
  .marker {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
    color: #cccccc;
    font-size: 11pt;
  }
  .marker:hover {
    background: #555555;
  }
  .marker-color {
    display: block;
    height: 22px;
    width: 150px;
    margin: 0 5px;
    padding: 1px 10px;
  }
  .marker-percent {
    display: block;
    width: 120px;
    margin: 0 5px;
  }
</style>
