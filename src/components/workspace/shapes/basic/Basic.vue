<template>
  <component :is="object.name" v-attr="object.attributes"/>
</template>

<script>
import { Shape } from '@/components/workspace/shapes/Shape'

export default {
  name: 'SVG-Basic',
  extends: Shape
}

/* export class RectObject extends ShapeObject {
  name = 'SVG-Rect'
  x = 0
  y = 0
  width = 0
  height = 0
} */
</script>
