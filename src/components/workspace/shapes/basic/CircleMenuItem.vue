<template>
  <div>
    <input v-if="isEditTitle" class="head" v-model="object.title" @blur="isEditTitle = !true">
    <div v-else class="head" @dblclick="isEditTitle = true">
      <span class="circle" :style="{ background: getAttribute(object, 'fill'), border: '1px solid '+getAttribute(object, 'stroke') }" />
      circle - {{object.title}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ShapeMenuItem } from '@/components/workspace/shapes/Shape'

export default {
  name: 'SVGRect',
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

  .circle {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.5);
  }
</style>
