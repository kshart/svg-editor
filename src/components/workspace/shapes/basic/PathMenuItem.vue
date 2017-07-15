<template>
  <div>
    <input v-if="isEditTitle" class="head" v-model="object.title" @blur="isEditTitle = !true">
    <div v-else class="head" @dblclick="isEditTitle = true">
      {{object.title || 'path'}}
    </div>
  </div>
</template>

<script>
import { ShapeMenuItem } from '@/components/workspace/shapes/Shape'

export default {
  name: 'SVG-Path',
  data () {
    return {
      isEditTitle: false
    }
  },
  extends: ShapeMenuItem
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
