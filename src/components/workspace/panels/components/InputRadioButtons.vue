<template>
  <div>
    <button
      v-for="(btn, key) in buttons"
      class="button"
      :key="key"
      :class="{ active: btn.value === value }"
      @click="$emit('change', btn.value)"
    >
      {{ btn.title }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'InputRadioButtons',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: String,
    buttons: Array
  }
}
</script>

<style scoped>
  .button {
    margin: 0;
    padding: 5px 12px;
    background: #666666;
    border: none;
    font-size: 11pt;
    text-align: center;
    outline: none;
    color: #cccccc;
    cursor: pointer;
  }
  .button:hover {
    background: #606060;
  }
  .button:active {
    background: #555555;
  }
  .button.active {
    background: #777777;
  }
</style>
