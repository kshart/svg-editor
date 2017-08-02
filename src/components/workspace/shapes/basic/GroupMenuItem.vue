<template>
  <div>
    <input v-if="isEditTitle" class="head" v-model="object.title" @blur="isEditTitle = !true">
    <div v-else class="head" @click="isOpenTree = !isOpenTree">
      <md-icon @click.native.stop="changeVisible()" md-iconset="fa fa-eye"></md-icon>
      Группа - {{object.title}}
    </div>
    <div v-if="isOpenTree" class="body">
      <component v-for="child in object.childs" :key="child._key" :is="'svg-' + child.name + '-menu-item'" :object="child" />
    </div>
  </div>
</template>

<script>
import { ShapeMenuItem } from '@/components/workspace/shapes/Shape'

export default {
  name: 'SVGGroup',
  mixins: [ ShapeMenuItem ],
  data () {
    return {
      isOpenTree: true,
      isEditTitle: false
    }
  },
  methods: {
    changeVisible (mode) {
      this.object.visible = !this.object.visible
    }
  }
}
</script>

<style scoped>
  .head {
    width: 100%;
    padding: 5px 15px;
    font-size: 10pt;
    font-weight: 400;
    letter-spacing: .01em;
    line-height: 20px;
    color: #AAA;
    cursor: pointer;
    background-color: #222222;
    border: none;
  }
  .head:hover {
    background-color: #333;
  }

  .head,
  .head:hover {
    transition: background-color .2s ease-out;
  }

  .body {
    position: relative;
    margin-left: 8px;
  }
  .body:before {
    content: '';
    display: block;
    height: 100%;
    width: 2px;
    position: absolute;
    background-color: #AAA;
  }
</style>
