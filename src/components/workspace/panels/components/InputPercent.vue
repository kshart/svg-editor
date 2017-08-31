<template>
  <div class="main">
    <input
      class="input"
      :value="formatedValue"
      @change="change"
      @mousedown="mouseDown"
    />
    <div class="bg"></div>
    <div class="progress" :style="{width: value + '%'}"></div>
  </div>
</template>

<script>
import round from 'lodash.round'

export default {
  name: 'InputPercent',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: Number,
    normal: Boolean
  },
  data () {
    return {
      saveValue: null,
      x: null
    }
  },
  computed: {
    formatedValue () {
      return this.normal ? this.value : this.value + '%'
    }
  },
  watch: {
    value (val) {
      if (this.normal) {
        if (val > 1) this.value = 1
      } else {
        if (val > 100) this.value = 100
      }
      if (val < 0) this.value = 0
    }
  },
  mounted () {
    if (this.normal) {
      if (this.value > 1) this.value = 1
    } else {
      if (this.value > 100) this.value = 100
    }
    if (this.value < 0) this.value = 0
  },
  beforeDestroy () {
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
  },
  methods: {
    change () {

    },
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
        let value = round(this.normal ? this.saveValue + k / 100 : this.saveValue + k, 2) || 0
        if (this.normal) {
          if (value > 1) value = 1
        } else {
          if (value > 100) value = 100
        }
        if (value < 0) value = 0
        this.value = value
        this.$nextTick(vue => this.$el.setSelectionRange(0, 0))
      } else if (k < -25 || k > 25) {
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
  .main {
    position: relative;
  }
  .input {
    position: relative;
    width: 100%;
    margin: 0;
    padding: 3px;
    background: none;
    border: none;
    font-size: 11pt;
    text-align: center;
    outline: none;
    color: #cccccc;
    z-index: 30;
  }
  .progress {
    position: absolute;
    top: 0;
    width: 5%;
    height: 100%;
    background: #808080;
  }
  .bg {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background: #666666;
  }
</style>
