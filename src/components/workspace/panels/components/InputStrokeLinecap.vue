<template>
  <div class="input-stroke">
    <div class="button" @click="setMode('butt')">
      <div class="rect"></div>
      <div class="point" style="left:0; top:50%"></div>
      <div class="point" style="right:0; top:50%"></div>
      <div class="line"></div>
    </div>
    <div class="button" @click="setMode('round')">
      <div class="rect"></div>
      <div class="point" style="left:0; top:50%"></div>
      <div class="point" style="right:0; top:50%"></div>
      <div class="line"></div>
    </div>
    <div class="button" @click="setMode('square')">
      <div class="rect"></div>
      <div class="point" style="left:0; top:50%"></div>
      <div class="point" style="right:0; top:50%"></div>
      <div class="line"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputStrokeLinecap',
  model: {
    prop: 'mode',
    event: 'change'
  },
  props: {
    mode: String
  },
  methods: {
    setMode (val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style scoped>
  .input-stroke {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    width: 100%;
    padding: 0;
  }

  .button {
    position: relative;
  }
  .rect {
    height: 14px;
    width: 50px;
    background: #666666;
    border: solid 1px #B3B3B3;
  }
  .point {
    position: absolute;
    height: 7px;
    width: 7px;
    margin: -3px;
    background: #B3B3B3;
    border-radius: 50%;
  }
  .line {
    position: absolute;
    top: 50%;
    height: 1px;
    width: 100%;
    background: #B3B3B3;
  }
</style>
