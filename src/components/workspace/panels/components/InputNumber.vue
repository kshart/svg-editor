<template>
  <input
    class="input"
    v-model.number="value"
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
  data () {
    return {
      value: 123,
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
      console.log('mouseDown')
      this.saveValue = null
      this.x = e.clientX
      this.$nextTick(vue => {
        window.addEventListener('mousemove', this.mouseMove)
        window.addEventListener('mouseup', this.mouseUp)
      })
    },
    mouseMove (e) {
      const k = e.clientX - this.x
      // console.log(k)
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
  .input {
    width: 100%;
    margin: 0;
    padding: 3px;
    background: #ddd;
    border: none;
    font-size: 11pt;
    text-align: center;
    outline: none;
  }
</style>
