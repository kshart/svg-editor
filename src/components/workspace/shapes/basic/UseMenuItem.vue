<template>
  <div>
    <input v-if="isEditTitle" class="head" v-model="object.title" @blur="isEditTitle = !true">
    <div v-else class="head" @dblclick="isEditTitle = true">
      use - {{object.title}}
    </div>
  </div>
</template>

<script>
import { ShapeMenuItem } from '@/components/workspace/shapes/Shape'

export default {
  name: 'SVGUse',
  mixins: [ ShapeMenuItem ],
  data () {
    return {
      isEditTitle: false
    }
  }
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
</style>
