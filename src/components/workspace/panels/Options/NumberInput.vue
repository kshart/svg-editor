<template>
  <div class="main">
    <span class="title">{{title}}</span>
    <input class="input" @change="$emit('change', $event)"/>
  </div>
</template>

<script>
export default {
  name: 'NumberInput',
  props: {
    title: String
  }
}
</script>

<style scoped>
  .main {
    background: #F00;
  }
  .title {
    display: block;
  }
  .input {
    width: 100%;
  }
</style>
