<template>
  <div class="main">
    <input
      class="input"
      :value="inputColor"
      @change="change"
      :style="{ background: value, color: getInvertedColor(value) }"
    />
    <button class="drop-button" @click="mode = mode === 'best-colors' ? null : 'best-colors'">
      >
    </button>
    <div v-if="mode === 'best-colors'" class="best-colors">
      <div
        v-for="(color, key) in bestColors"
        :key="key"
        class="color"
        :style="{ background: color, color: getInvertedColor(color) }"
        @click="setColor(color) && (mode = null)"
      >
        {{ color }}
      </div>
    </div>
  </div>
</template>

<script>
import Color from 'color'
export default {
  name: 'InputColor',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: String
  },
  data () {
    return {
      mode: null,
      bestColors: ['#fff', '#f00', '#0f0', '#00f']
    }
  },
  computed: {
    inputColor () {
      try {
        const color = Color(this.value).string()
        return color
      } catch (e) {
        console.warn(`Color(${this.value}).string()`)
      }
    }
  },
  methods: {
    setColor (val) {
      try {
        const color = Color(val).string()
        this.$emit('change', color)
        return color
      } catch (e) {
        console.warn(`Color(${val}).string()`)
        return false
      }
    },
    getInvertedColor (color) {
      try {
        return Color(color).negate().string()
      } catch (e) {
        console.warn('Color not inverted ' + color)
        return '#eee'
      }
    },
    change ({ value }) {
      try {
        const color = Color(value).string()
        this.$emit('change', color)
      } catch (e) {
      }
    }
  }
}
</script>

<style scoped>
  .main {
    position: relative;
    width: 100%;
    padding: 0;
  }
  .input {
    width: 100%;
    margin: 0;
    padding: 3px 5px;
    border: none;
    color: #cccccc;
    background: #666666;
    font-size: 11pt;
    text-align: left;
    outline: none;
  }
  .drop-button {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    border: none;
    background: none;
  }
  .drop-button:hover {
    background: #808080;
  }
  .drop-button:active {
    background: #909090;
  }
  .drop-button,
  .drop-button:hover,
  .drop-button:active {
    transition: 0.1s background;
  }

  .best-colors {
    position: absolute;
    width: 100%;
    z-index: 100;
  }
  .color {
    width: 100%;
    padding: 3px 5px;
  }
</style>
