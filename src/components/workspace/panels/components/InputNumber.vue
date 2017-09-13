<template>
  <input
    class="input-number"
    v-model="value"
    @mousedown="mouseDown"
  />
</template>

<script>
import round from 'lodash.round'

export default {
  name: 'InputNumber',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: String
  },
  data () {
    return {
      saveValue: null,
      x: null
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
        this.value = round(this.saveValue + (k * k * Math.sign(k)) / 100) || 0
        this.$nextTick(vue => this.$el.setSelectionRange(0, 0))
      } else if (k < -50 || k > 50) {
        this.saveValue = this.value
        this.x = e.clientX
        this.$el.setAttribute('readonly', true)
      }
    },
    mouseUp (e) {
      this.saveValue = null
      this.$el.removeAttribute('readonly')
      window.removeEventListener('mousemove', this.mouseMove)
    }
  }
}
</script>

<style scoped>
  .input-number {
    width: 100%;
    margin: 0;
    padding: 3px;
    background: #666666;
    border: none;
    font-size: 11pt;
    text-align: center;
    outline: none;
    color: #cccccc;
  }
</style>
