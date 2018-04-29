<template>
  <div>
    <input v-if="isEditTitle" class="head" v-model="object.title" @blur="isEditTitle = !true">
    <div v-else class="head" @dblclick="isEditTitle = true">
      <span class="path" :style="{ background: getAttribute(object, 'stroke') }" />
      path - {{object.title}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ShapeMenuItem } from '@/components/workspace/shapes/Shape'

export default {
  name: 'SVGPath',
  mixins: [ ShapeMenuItem ],
  data () {
    return {
      isEditTitle: false
    }
  },
  computed: mapGetters('document', ['getAttribute'])
}
</script>

<style scoped>
  .head {
    width: 100%;
    padding: 2px 15px;
    font-size: 10pt;
    font-weight: 400;
    letter-spacing: .01em;
    line-height: 20px;
    color: #AAA;
    cursor: pointer;
    background: #222222;
    border: none;
  }
  .head:hover {
    background: #333;
  }

  .head,
  .head:hover {
    transition: background .2s ease-out;
  }

  .path {
    display: inline-block;
    width: 10px;
    height: 2px;
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
  }
</style>
