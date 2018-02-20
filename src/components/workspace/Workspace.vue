<template>
  <div class="workspace" :style="styleCursor" @click="listPoints">
    <component
      v-for="(comp, key) in layout"
      class="component scrollbar"
      :is="comp.component"
      :key="key"
      :rect="comp.box"
      :style="{
        left: comp.box.left + 'px',
        top: comp.box.top + 'px',
        width: comp.box.width + 'px',
        height: comp.box.height + 'px'
      }"
    />
    <workspace-configurator v-if="setup" class="configurator" :tree="tree" />
    <resize-observer @notify="resize" />
    <!--<component v-for="comp in layout" :is="comp.component" class="component" :style="comp.position" />
    <div style="width:400px;display:flex;flex-direction:column;">
    </div>
    <document
      v-if="document"
      ref="doc"
      :data="document"
      @mousedown.native="startDragAndDrop"
      @mouseup.native="stopDragAndDrop"
    />
    <div class="points" :style="documentRect">
      <div v-for="point in points" :style="{left: point.x * 100 + '%', top: point.y * 100 + '%'}" class="point" />
    </div>-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import BTree from '@/btree'
import { Matrix3, Vector3 } from 'three'
import WorkspaceConfigurator from './WorkspaceConfigurator'
import PageManager from './panels/PageManager/PageManager'
import Document from './panels/Document'
import FillManager from './panels/FillManager/FillManager'
import ToolBar from './panels/ToolBar'
import PositionInput from './panels/PositionInput'
import StrokeManager from './panels/StrokeManager'
import TransformManager from './panels/TransformManager'
import PrimaryPropertyManager from './panels/PrimaryPropertyManager/PrimaryPropertyManager'

export default {
  name: 'Workspace',
  components: {
    WorkspaceConfigurator,
    PageManager,
    Document,
    FillManager,
    ToolBar,
    PositionInput,
    StrokeManager,
    TransformManager,
    PrimaryPropertyManager
  },
  data () {
    const tree = new BTree('tool-bar', 'page-manager', 'vertical', 50)
    tree.slice(2, 'document', 'vertical', 300)
      .slice(2, 'stroke-manager', 'vertical', 350, true)
      .slice(2, 'transform-manager', 'horisontal', 300)
      .slice(2, 'fill-manager', 'horisontal', 160)
      .slice(2, 'primary-property-manager', 'horisontal', 400)

    return {
      dragAndDrop: null,
      documentRect: null,
      points: [],
      tree,
      setup: false,
      width: 0,
      height: 0
    }
  },
  computed: {
    styleCursor () {
      return {
        cursor: this.dragAndDrop ? 'pointer' : 'default'
      }
    },
    layout () {
      if (this.width <= 0 || this.height <= 0) {
        return []
      }
      return this.tree.allItems(0, 0, this.width, this.height)
    },
    ...mapGetters('document', ['getPoints'])
  },
  mounted () {
    this.width = this.$el.offsetWidth
    this.height = this.$el.offsetHeight
    this.$store.commit('document/LOAD', { document: `<?xml version="1.0"?>
      <!--<svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
        <g>
          <title>SVG Title Demo example</title>
          <rect x="10" y="10" width="200" height="50" style="fill:none; stroke:blue; stroke-width:1px"/>
        </g>
      </svg>-->
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-50 -50 100 100">
      <rect id="background" class="sss" x="-50" y="-50" width="100" height="100" rx="4"/>
      <rect id="top-left" x="-50" y="-50" width="50" height="50" rx="4" fill="#ffb13b"/>
      <rect id="bottom-right" width="50" height="50" rx="4" fill="#de8500"/>
      <use stroke="#f90" stroke-width="22.6" xlink:href="#a"/>
      <circle r="26"/>
      <use stroke="#000" stroke-width="12" xlink:href="#a"/>
      <g id="a">
        <g id="b">
          <g id="c">
            <circle id="n" cy="-31.6" r="7.1" fill="#fff"/>
            <path d="m0 31.6v-63.2" stroke="#fff" stroke-width="10"/>
            <use y="63.2" xlink:href="#n"/>
          </g>
          <use transform="rotate(90)" xlink:href="#c"/>
        </g>
        <use transform="rotate(45)" xlink:href="#b"/>
      </g>
      <path id="text-backdrop" d="m44.68 0v40c0 3.333-1.667 5-5 5h-79.38c-3.333 0-5-1.667-5-5v-40"/>
      <path id="shine" d="m36 4.21c2.9 0 5.3 2.4 5.3 5.3v18c-27.6-3.4-54.9-8-82-7.7v-10.2c0-2.93 2.4-5.3 5.3-5.3z" fill="#3f3f3f"/>
      <g id="svg-text" stroke="#fff" stroke-width="6.4">
        <g id="s">
          <path fill="none" d="m-31.74 31.17a8.26 8.26 0 1 0 8.26 -8.26 8.26 8.26 0 1 1 8.26 -8.26M23.23 23h8.288v 8.26a8.26 8.26 0 0 1 -16.52 0v-16.52a8.26 8.26 0 0 1 16.52 0"/>
          <g stroke-width=".5" stroke="#000">
            <path d="m4.76 3h6.83l-8.24 39.8h-6.85l-8.26-39.8h6.85l4.84 23.3z" fill="#fff"/>
            <path d="m23.23 19.55v6.9m4.838-11.71h6.9m-70.16 16.43h6.9m9.62-16.52h6.9" stroke-linecap="square"/>
          </g>
        </g>
      </g>
      <use stroke="#000" stroke-width="7.4" xlink:href="#s"/>
      <use stroke="#000" stroke-width="7.4" xlink:href="#svg-text"/>
      </svg>` })
  },
  methods: {
    resize (e) {
      this.width = this.$el.offsetWidth
      this.height = this.$el.offsetHeight
    },
    listPoints () {
      const settings = {
        center: false,
        centerEdges: false,
        edges: false
      }
      if (!document || !this.$refs.doc) return
      const viewport = this.$refs.doc.getViewport()
      const {left, right, top, bottom} = this.$refs.doc.getBox()
      this.documentRect = {
        left: left + 'px',
        width: (right - left) + 'px',
        top: top + 'px',
        height: (bottom - top) + 'px'
      }
      let array = []
      const points = (element) => {
        switch (element.nodeName) {
          case 'svg':
          case 'g':
            for (const i in element.childNodes) points(element.childNodes[i])
            return
          case 'rect': {
            const x = element.x.baseVal.value
            const y = element.y.baseVal.value
            const width = element.width.baseVal.value
            const height = element.height.baseVal.value
            if (settings.center) {
              array.push({x: x + width / 2, y: y + height / 2})
            }
            if (settings.edges) {
              array.push({x, y})
              array.push({x: x + width, y})
              array.push({x, y: y + height})
              array.push({x: x + width, y: y + height})
            }
            if (settings.centerEdges) {
              array.push({x: x + width / 2, y})
              array.push({x: x + width / 2, y: y + height})
              array.push({x, y: y + height / 2})
              array.push({x: x + width, y: y + height / 2})
            }
            return
          }
          case 'circle': {
            const x = element.cx.baseVal.value
            const y = element.cy.baseVal.value
            const r = element.r.baseVal.value
            if (settings.center) {
              array.push({x, y})
            }
            if (settings.edges || settings.centerEdges) {
              array.push({x: x + r, y})
              array.push({x: x - r, y})
              array.push({x, y: y + r})
              array.push({x, y: y - r})
            }
            return
          }
          case 'path': {
            // for (var key in element) console.log(key, typeof element[key])
            element.getPathData().forEach(seg => {
              for (let i = 0; i < seg.values.length; i += 2) {
                if (seg.type === 'M') {
                  let [x, y] = seg.values
                  array.push({x, y})
                } else if (seg.type === 'L') {
                  let [x, y] = seg.values
                  array.push({x, y})
                } else if (seg.type === 'C') {
                  let [x1, y1, x2, y2, x, y] = seg.values
                  array.push({x, y})
                  array.push({x1, y1})
                  array.push({x2, y2})
                } else {
                  // console.info(seg.type)
                }
              }
            })
            // console.info(element.getPathData())
            break
          }
          case 'use':
            // for (var key in element) console.log(key, typeof element[key])
            // console.dir(element.instanceRoot)
        }
      }
      points(this.$refs.doc.$el)
      this.points = array.map(point => {
        return {
          x: (point.x - viewport.x) / viewport.width,
          y: (point.y - viewport.y) / viewport.height
        }
      })
    },
    startDragAndDrop (event) {
      const { a, c, e, b, d, f } = event.target.getCTM()
      const m1 = new Matrix3()
      m1.set(
        a, b, 0,
        c, d, 0,
        e, f, 1
      )
      const p = new Vector3(
        event.offsetX,
        event.offsetY,
        1
      )
      const point = p.applyMatrix3(m1.getInverse(m1))
      const box = event.target.getBBox()
      point.x -= box.x + 50
      point.y -= box.y + 50
      this.dragAndDrop = {
        point,
        target: event.target.__vue__
      }
      this.$el.addEventListener('mousemove', this.moveDragAndDrop)
    },
    moveDragAndDrop (event) {
      if (!this.dragAndDrop) return
      const { a, c, e, b, d, f } = event.target.getCTM()
      const m1 = new Matrix3()
      m1.set(
        a, b, 0,
        c, d, 0,
        e, f, 1
      )
      const point = new Vector3(
        event.offsetX,
        event.offsetY,
        1
      )
      const p = point.applyMatrix3(m1.getInverse(m1))
      this.$set(this.dragAndDrop.target.object.attributes, 'x', p.x - 50 - this.dragAndDrop.point.x)
      this.$set(this.dragAndDrop.target.object.attributes, 'y', p.y - 50 - this.dragAndDrop.point.y)
    },
    stopDragAndDrop (event) {
      this.$el.removeEventListener('mousemove', this.moveDragAndDrop)
      this.dragAndDrop = null
    }
  }
}
</script>

<style scoped>
  .workspace {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .component {
    position: absolute;
    overflow: auto;
  }

  .points {
    position: fixed;
    pointer-events: none;
  }
  .point {
    position: absolute;
    width: 10px;
    height: 10px;
    margin-top: -5px;
    margin-left: -5px;
    background-color: #F00;
  }
  .configurator {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>
