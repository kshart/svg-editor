<template>
  <div class="align-center">
    <md-spinner md-indeterminate md-size="100" />
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style scoped>
  .align-center {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
