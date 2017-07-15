<template>
  <div class="workspace" @click="listPoints">
    <page-manager :pages="pages" selection="123"/>
    <document v-if="document" :data="document" ref="doc"/>
    <div class="points" :style="documentRect">
      <div v-for="point in points" :style="{left: point.x * 100 + '%', top: point.y * 100 + '%'}" class="point" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PageManager from './panels/PageManager'
import Document from './panels/Document'

export default {
  name: 'Workspace',
  mounted () {
    this.$store.commit('document/LOAD', { document: `<?xml version="1.0"?>
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="-50 -50 100 100">
      <rect id="background" x="-50" y="-50" width="100" height="100" rx="4" fill="#f90"/>
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
      <use stroke="#000" stroke-width="7.4" xlink:href="#s"/>
      <g id="svg-text" stroke="#fff" stroke-width="6.4">
        <g id="s">
          <path fill="none" d="m-31.74 31.17a8.26 8.26 0 1 0 8.26 -8.26 8.26 8.26 0 1 1 8.26 -8.26M23.23 23h8.288v 8.26a8.26 8.26 0 0 1 -16.52 0v-16.52a8.26 8.26 0 0 1 16.52 0"/>
          <g stroke-width=".5" stroke="#000">
            <path d="m4.76 3h6.83l-8.24 39.8h-6.85l-8.26-39.8h6.85l4.84 23.3z" fill="#fff"/>
            <path d="m23.23 19.55v6.9m4.838-11.71h6.9m-70.16 16.43h6.9m9.62-16.52h6.9" stroke-linecap="square"/>
          </g>
        </g>
      </g>
      </svg>` })
  },
  computed: {
    pages () {
      return this.$store.state.document.pages
    },
    document () {
      return this.$store.state.document.pages.length > 0 ? this.$store.state.document.pages[0].data : null
    },
    ...mapGetters('document', [
      'getPoints'
    ])
  },
  data () {
    return {
      documentRect: null,
      points: []
    }
  },
  methods: {
    listPoints () {
      if (!document || !this.$refs.doc) return
      const viewport = this.$refs.doc.getViewport()
      const {left, right, top, bottom} = this.$refs.doc.$el.getBoundingClientRect()
      this.documentRect = {
        left: left + 'px',
        width: (right - left) + 'px',
        top: top + 'px',
        height: (bottom - top) + 'px'
      }
      console.log((left - right), viewport)
      this.points = this.getPoints.map(point => {
        return {
          x: (point.x - viewport.x) / viewport.width,
          y: (point.y - viewport.y) / viewport.height
        }
      })
    }
  },
  components: { PageManager, Document }
}
</script>

<style scoped>
  .workspace {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
  }
  .points {
    position: fixed;
  }
  .point {
    position: absolute;
    width: 10px;
    height: 10px;
    margin-top: -5px;
    margin-left: -5px;
    background-color: #F00;
  }
</style>
