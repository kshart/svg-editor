<template>
  <div class="main">
    <span class="title">{{title}}</span>
    <div class="body">
      <input-number style="width:200px" :value="123"/>
    </div>
  </div>
</template>

<script>
import InputNumber from './components/InputNumber'

export default {
  name: 'ColorPicker',
  components: { InputNumber },
  data () {
    return {
      title: 'Позиция'
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
