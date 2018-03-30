<template>
  <div class="input-percent">
    <input
      ref="input"
      class="input"
      :value="inputValue"
      :style="style"
      @change="change"
      @mousedown="mouseDown"
    />
    <div class="bg"></div>
    <div class="progress" :style="progressStyle"></div>
  </div>
</template>

<script>
import round from 'lodash.round'

export default {
  name: 'InputPercent',
  model: {
    prop: 'outerValue',
    event: 'change'
  },
  props: {
    outerValue: Number,
    round: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      value: null,
      rect: null,
      x: null
    }
  },
  computed: {
    style () {
      return {
        cursor: this.rect ? 'pointer' : 'default'
      }
    },
    progressStyle () {
      if (Number.isNaN(this.value)) {
        return {}
      }
      return {
        width: (this.value * 100) + '%'
      }
    },
    inputValue: {
      get () {
        if (Number.isNaN(this.value)) {
          return '(не задано)'
        }
        return round(this.value * 100, this.round) + '%'
      },
      set (value) {
        this.$emit('change', value)
      }
    }
  },
  mounted () {
    this.updateExternalValue()
  },
  beforeDestroy () {
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
  },
  methods: {
    change () {
      console.log(this.$refs.input.value)
    },
    updateExternalValue () {
      let outerValue = this.outerValue
      if (!(outerValue instanceof Number)) {
        outerValue = Number(outerValue)
      }
      // console.log(outerValue)
      this.value = outerValue
    },
    mouseDown (e) {
      this.rect = null
      this.x = e.clientX
      this.$nextTick(vue => {
        window.addEventListener('mousemove', this.mouseMove)
        window.addEventListener('mouseup', this.mouseUp)
      })
    },
    mouseMove (e) {
      const k = e.clientX - this.x
      if (this.rect) {
        let value = round(((e.clientX - this.rect.left) / this.rect.width), 2) || 0
        if (value > 1) value = 1
        if (value < 0) value = 0
        this.$emit('change', value)
        this.$nextTick(vue => window.getSelection().removeAllRanges())
      } else if (k < -25 || k > 25) {
        this.rect = this.$el.getBoundingClientRect()
        this.x = e.clientX
      }
    },
    mouseUp (e) {
      this.rect = null
      window.removeEventListener('mousemove', this.mouseMove)
    }
  },
  watch: {
    outerValue (value) {
      this.updateExternalValue()
    }
  }
}
</script>

<style scoped>
  .input-percent {
    position: relative;
    width: 100%;
    padding: 0;
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
