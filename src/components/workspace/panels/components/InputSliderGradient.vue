<template>
  <div class="input-slider">
    <div
      class="bg"
      :style="{ background: background }"
      @dblclick="addItem"
    ></div>
    <div class="markers-color">
      <span
        v-for="item in items"
        class="marker"
        :style="{
          'border-bottom': `10px solid ${item.color}`,
          left: (item.percent * 100) + '%'
        }"
        :title="item.color"
        @mousedown="mouseDown($event, item)"
        @click="$emit('select', item)"
        @dblclick="removeItem(item)"
      />
    </div>
  </div>
</template>

<script>
import Color from 'color'

const diffColor = (prevColor, prevPercent, nextColor, nextPercent, value) => {
  const width = Math.abs(prevPercent - nextPercent)
  const normalizeValue = (value - Math.min(prevPercent, nextPercent)) / width
  let color = Color(prevColor)
  color = color.mix(Color(nextColor), normalizeValue)
  return '#' + color.rgbNumber().toString(16).padStart(6, '0')
}

export default {
  name: 'InputSliderGradient',
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
  computed: {
    background () {
      let str = ''
      this.items.forEach(item => {
        str += item.color + ' ' + item.percent * 100 + '%,'
      })
      str = str.substr(0, str.length - 1)
      return 'linear-gradient(to right, ' + str + ')'
    }
  },
  beforeDestroy () {
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
  },
  methods: {
    mouseDown (e, item) {
      this.selectedItem = item
      this.rect = this.$el.getBoundingClientRect()
      this.$nextTick(vue => {
        window.addEventListener('mousemove', this.mouseMove)
        window.addEventListener('mouseup', this.mouseUp)
      })
    },
    mouseMove (e) {
      let value = (e.clientX - this.rect.left) / this.rect.width
      if (value > 1) value = 1
      if (value < 0) value = 0
      this.selectedItem.percent = value
    },
    mouseUp (e) {
      this.selectedItem = null
      this.rect = null
      window.removeEventListener('mousemove', this.mouseMove)
    },
    removeItem (item) {
      const index = this.items.indexOf(item)
      this.items.splice(index, 1)
    },
    addItem (e) {
      const rect = this.$el.getBoundingClientRect()
      let percent = (e.clientX - rect.left) / rect.width
      if (percent > 1) percent = 1
      if (percent < 0) percent = 0
      let prev = null
      let next = null
      this.items.forEach(item => {
        if (item.percent < percent) {
          if (prev) {
            prev = prev.percent < item.percent ? item : prev
          } else {
            prev = item
          }
        }
        if (item.percent > percent) {
          if (next) {
            next = next.percent > item.percent ? item : next
          } else {
            next = item
          }
        }
      })
      let color = null
      if (prev === null && next === null) {
        color = '#fff'
      } else if (prev === null) {
        color = next.color
      } else if (next === null) {
        color = prev.color
      } else {
        color = diffColor(prev.color, prev.percent, next.color, next.percent, percent)
      }
      const nextIndex = this.items.indexOf(next)
      const index = nextIndex < 0 ? 0 : nextIndex
      this.items.splice(index, 0, {
        color,
        percent
      })
    }
  }
}
</script>

<style scoped>
  .input-slider {
    position: relative;
    width: 100%;
    padding: 0;
  }
  .bg {
    width: 100%;
    height: 15px;
    /* background: linear-gradient(to left, rgba(169,3,41,1) 0%, rgba(143,2,34,1) 44%, rgba(109,0,25,1) 100%); */
  }

  .markers-color {
    position: relative;
  }
  .marker {
    position: absolute;
    margin-left: -5px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
</style>
