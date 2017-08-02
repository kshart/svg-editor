<template>
  <div>
    <input v-if="isEditTitle" class="head" v-model="object.title" @blur="isEditTitle = !true">
    <div v-else class="head" @dblclick="isEditTitle = true" @click="isOpenTree = !isOpenTree">
      {{object.title || 'Слой'}}
    </div>
    <div v-if="isOpenTree" class="body">
      <component v-for="child in object.childs" :key="child._key" :is="'svg-' + child.name + '-menu-item'" :object="child" :level="level+1"/>
    </div>
  </div>
</template>

<script>
import { ShapeMenuItem } from '@/components/workspace/shapes/Shape'

export default {
  name: 'SVGLayer',
  mixins: [ ShapeMenuItem ],
  data () {
    return {
      isOpenTree: true,
      isEditTitle: false
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
</style>
