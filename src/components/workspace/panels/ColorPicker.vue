<template>
  <div class="main">
    <span class="title">{{title}}</span>
    <div class="body">
      <input-number style="width:100px" v-model="x" />
      <input-percent style="width:100px" v-model="x" />
    </div>
  </div>
</template>

<script>
import InputNumber from './components/InputNumber'
import InputPercent from './components/InputPercent'

export default {
  name: 'ColorPicker',
  components: { InputNumber, InputPercent },
  data () {
    return {
      title: 'Позиция',
      x: 111
    }
  }
}
</script>

<style scoped>
  .main {
    background: #222222;
  }
  .title {
    display: block;
    padding: 10px;
    padding-bottom: 0;
    color: #aaa;
    font-size: 12pt;
  }
  .input {
    margin: 0;
    margin-bottom: 16px;
    width: 40%;
  }
</style>
