<template>
  <div class="number">
    <input
      ref="input"
      v-model="inputValue"
      class="input-number"
      :style="inputStyle"
      @mousedown="mouseDown"
    />
  </div>
</template>

<script>
import round from 'lodash.round'

export default {
  name: 'InputNumber',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: ['value'],
  data () {
    return {
      saveValue: null,
      x: null
    }
  },
  computed: {
    inputValue: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('change', value)
      }
    },
    inputStyle () {
      return {
        cursor: this.saveValue === null ? 'text' : 'ew-resize'
      }
    }
  },
  beforeDestroy () {
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
  },
  methods: {
    mouseDown (e) {
      this.saveValue = null
      this.x = e.clientX
      this.$nextTick(vue => {
        window.addEventListener('mousemove', this.mouseMove)
        window.addEventListener('mouseup', this.mouseUp)
      })
    },
    mouseMove (e) {
      const k = e.clientX - this.x
      if (this.saveValue !== null) {
        this.$emit('change', round(this.saveValue + (k * k * Math.sign(k)) / 100) || 0)
        this.$nextTick(vue => window.getSelection().removeAllRanges())
      } else if (k < -50 || k > 50) {
        this.saveValue = this.value
        this.x = e.clientX
        this.$refs.input.setAttribute('readonly', true)
      }
    },
    mouseUp (e) {
      this.saveValue = null
      this.$refs.input.removeAttribute('readonly')
      window.removeEventListener('mousemove', this.mouseMove)
    }
  }
}
</script>

<style scoped>
  .number {
    position: relative;
    width: 100%;
    margin: 0;
    padding: 3px;
    background: #666666;
  }
  .input-number {
    width: 100%;
    text-align: center;
    background: none;
    border: none;
    color: #cccccc;
    outline: none;
    font-size: 11pt;
  }
</style>
