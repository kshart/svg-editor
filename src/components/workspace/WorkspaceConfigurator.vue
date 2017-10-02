<template>
  <div class="main">
    <workspace-configurator
      v-if="tree.a instanceof Object"
      class="tree"
      :style="styleA"
      :tree="tree.a"
    />
    <div v-else class="item" :style="styleA">{{ tree.a }}</div>

    <workspace-configurator
      v-if="tree.b instanceof Object"
      class="tree"
      :style="styleB"
      :tree="tree.b"
    />
    <div v-else class="item" :style="styleB">{{ tree.b }}</div>

    <div
      class="delimiter"
      :class="this.tree.type === 'vertical' ? 'delimiter-h' : 'delimiter-w'"
      :style="delimiter"
      @mousedown="mouseDown"
    />
    <div class="buttons" :style="buttons">
      {{ this.tree.length }}px
      <span v-if="tree.lengthFromEnd">revers</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WorkspaceConfigurator',
  props: {
    tree: Object
  },
  data () {
    return {
      bbox: null
    }
  },
  computed: {
    /*
    "type":"vertical",
    "length":50,
    "lengthFromEnd":false
     */
    styleA () {
      if (this.tree.type === 'vertical') {
        if (this.tree.lengthFromEnd) {
          return {
            left: 0,
            right: this.tree.length + 'px',
            top: 0,
            bottom: 0
          }
        }
        return {
          left: '0px',
          width: this.tree.length + 'px',
          top: '0px',
          bottom: '0px'
        }
      }
      if (this.tree.lengthFromEnd) {
        return {
          top: 0,
          bottom: this.tree.length + 'px',
          width: '100%'
        }
      }
      return {
        top: 0,
        height: this.tree.length + 'px',
        width: '100%'
      }
    },
    styleB () {
      if (this.tree.type === 'vertical') {
        if (this.tree.lengthFromEnd) {
          return {
            width: this.tree.length + 'px',
            right: 0,
            height: '100%'
          }
        }
        return {
          left: this.tree.length + 'px',
          right: 0,
          height: '100%'
        }
      }
      if (this.tree.lengthFromEnd) {
        return {
          height: this.tree.length + 'px',
          bottom: 0,
          width: '100%'
        }
      }
      return {
        top: this.tree.length + 'px',
        bottom: 0,
        width: '100%'
      }
    },
    delimiter () {
      if (this.tree.type === 'vertical') {
        if (this.tree.lengthFromEnd) {
          return {
            right: this.tree.length + 'px'
          }
        }
        return {
          left: this.tree.length + 'px'
        }
      }
      if (this.tree.lengthFromEnd) {
        return {
          bottom: this.tree.length + 'px'
        }
      }
      return {
        top: this.tree.length + 'px'
      }
    },
    buttons () {
      if (this.tree.type === 'vertical') {
        if (this.tree.lengthFromEnd) {
          return {
            right: this.tree.length + 'px',
            top: '50%',
            transform: 'rotate(-90deg)',
            cursor: 'w-resize'
          }
        }
        return {
          left: this.tree.length + 'px',
          top: '50%',
          transform: 'rotate(90deg)',
          cursor: 'w-resize'
        }
      }
      if (this.tree.lengthFromEnd) {
        return {
          bottom: this.tree.length + 'px',
          'margin-bottom': '10px',
          left: '50%',
          cursor: 'n-resize'
        }
      }
      return {
        top: this.tree.length + 'px',
        'margin-top': '10px',
        left: '50%',
        cursor: 'n-resize'
      }
    }
  },
  methods: {
    mouseDown (e, item) {
      this.bbox = this.$el.getBoundingClientRect()
      this.$nextTick(vue => {
        window.addEventListener('mousemove', this.mouseMove)
        window.addEventListener('mouseup', this.mouseUp)
      })
    },
    mouseMove (e) {
      if (this.tree.type === 'vertical') {
        if (this.tree.lengthFromEnd) {
          this.tree.length = this.bbox.width - (e.clientX - this.bbox.left)
        } else {
          this.tree.length = e.clientX - this.bbox.left
        }
      } else {
        if (this.tree.lengthFromEnd) {
          this.tree.length = this.bbox.height - (e.clientY - this.bbox.top)
        } else {
          this.tree.length = e.clientY - this.bbox.top
        }
      }
      if (this.tree.length < 0) {
        this.tree.length = 0
      } else if (this.tree.type === 'vertical' ? this.tree.length > this.bbox.width : this.tree.length > this.bbox.height) {
        this.tree.length = this.tree.type === 'vertical' ? this.bbox.width : this.bbox.height
      }
    },
    mouseUp (e) {
      this.bbox = null
      window.removeEventListener('mousemove', this.mouseMove)
    }
  },
  beforeDestroy () {
    window.removeEventListener('mousemove', this.mouseMove)
    window.removeEventListener('mouseup', this.mouseUp)
  }
}
</script>

<style scoped>
  .configurator {
    position: absolute;
    color: #f00;
    user-select: none;
  }

  .tree {
    position: absolute;
  }
  .item {
    position: absolute;
    background: rgba(255, 0, 0, 0.1);
  }

  .delimiter {
    position: absolute;
    background: #888;
  }
  .delimiter-w {
    height: 1px;
    width: 100%;
    cursor: n-resize;
  }
  .delimiter-w:after {
    content: '';
    display: block;
    margin-top: -3px;
    height: 6px;
    width: 100%;
  }
  .delimiter-h {
    width: 1px;
    height: 100%;
    cursor: w-resize;
  }
  .delimiter-h:after {
    content: '';
    display: block;
    margin-left: -3px;
    height: 100%;
    width: 6px;
  }

  .buttons {
    position: absolute;
    background: #0f0;
  }
</style>
