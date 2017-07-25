<template>
  <div class="root">
    <div class="control">
      <md-button class="md-raised" @click.native="setAction('draw-line')">Square</md-button>
      <md-button class="md-raised" @click.native="setAction('draw')">Line</md-button>
      <md-button class="md-raised" @click.native="setAction('')"></md-button>
    </div>
    <canvas ref="canvas" class="layer"></canvas>
    <canvas ref="actionCanvas" :style="{ cursor:action.cursor }" @click="action.click" @mousemove="action.move"></canvas>
  </div>
</template>

<script>
const render = {
  line (context) {
    context.beginPath()
    context.strokeStyle = 'black'
    context.beginPath()
    context.moveTo(0, 0)
    context.lineTo(100, 100)
    context.stroke()
  }
}

export default {
  name: 'TestPage',
  data () {
    return {
      action: {
        mode: null,
        cursor: '',
        click: e => e,
        move: e => e
      },
      context: null,
      actionContext: null,
      shapeState: ''
    }
  },
  mounted () {
    this.context = this.$refs.canvas.getContext('2d')
    this.actionContext = this.$refs.actionCanvas.getContext('2d')
    this.$refs.canvas.width = this.$refs.actionCanvas.width = 500
    this.$refs.canvas.height = this.$refs.actionCanvas.height = 500
    requestAnimationFrame(this.redraw)
  },
  methods: {
    redraw () {
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
      render.line(this.context)
      requestAnimationFrame(this.redraw)
    },
    setAction (mode) {
      if (this.action.end) this.action.end()
      this.action = {
        mode: null,
        cursor: '',
        click: e => e
      }
      switch (mode) {
        case 'draw-line':
          this.action = {
            mode,
            lastPoint: null,
            click: e => {
              this.action.lastPoint = [e.offsetX, e.offsetY]
            },
            move: e => {
              if (this.action.lastPoint == null) return
              this.actionContext.clearRect(0, 0, this.actionContext.canvas.width, this.actionContext.canvas.height)
              this.actionContext.beginPath()
              this.actionContext.moveTo(this.action.lastPoint[0], this.action.lastPoint[1])
              this.actionContext.lineTo(e.offsetX, e.offsetY)
              this.actionContext.stroke()
            },
            start: e => {
              this.actionContext.strokeStyle = '#000'
            },
            end: e => {
              this.actionContext.clearRect(0, 0, this.actionContext.canvas.width, this.actionContext.canvas.height)
            },
            cursor: 'crosshair'
          }
          break
      }
      if (this.action.start) this.action.start()
    }
  }
}
</script>

<style scoped>
  .root {
    position: relative;
    width: 100%;
  }
  .layer {
    position: absolute;
    top: 50px;
    left: 0;
    width: 500px;
    height: 500px;
    background-color: #FFF;
  }
</style>
