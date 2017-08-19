<template>
  <div class="page">
    <context-menu ref="menu">
      <ul>
        <li @click="createLayer">Создать слой</li>
        <li>option 2</li>
        <li>option 3</li>
      </ul>
    </context-menu>
    <div class="head" @click="isOpenTree = !isOpenTree" @contextmenu.prevent="$refs.menu.open">
      <p class="head-name">{{page.name}}</p>
      <p v-if="showDescription" class="head-description">{{page.description}}</p>
    </div>
    <component v-if="page.data && isOpenTree" :is="page.data.name + '-menu-item'" class="body" :object="page.data" :level="0"/>
  </div>
</template>

<script>
import Vue from 'vue'
import ContextMenu from '@/components/tool/ContextMenu'
import SVGMenuItem from '@/components/workspace/shapes/svg/SVGMenuItem'
import '@/assets/css/font-awesome.css'

Vue.component('svg-menu-item', SVGMenuItem)

export default {
  name: 'PageItem',
  components: { ContextMenu },
  props: { page: Object },
  data () {
    return {
      showDescription: true,
      isOpenTree: true
    }
  },
  methods: {
    createLayer () {
      this.$store.commit('document/CREATE_LAYER', { page: this.page })
    }
  }
}
</script>

<style scoped>
.page {
  position: relative;
}

.head {
  margin: 0;
  padding: 5px 15px;
  cursor: pointer;
  background: #333;
}
.head:hover {
  background: #333;
}
.head-name {
  margin: 0;
  font-size: 14pt;
  color: #bbb;
}
.head-layers {
  float: right;
  font-size: 10pt;
  color: #999;
}
.head-description {
  margin: 0;
  font-size: 10pt;
  color: #999;
}

.head,
.head:hover {
  transition: background-color .2s ease-out;
}

.body {
  background: #222222;
}
</style>
