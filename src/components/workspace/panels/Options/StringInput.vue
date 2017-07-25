<template>
  <input @change="$emit('change', $event)"/>
</template>

<script>
export default {
  name: 'StringInput'
}
</script>

<style scoped>
</style>
