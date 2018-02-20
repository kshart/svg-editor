<template>
  <div class="main">
    <div class="cell cell-11" :class="{active: mode === 'lt'}" @click="mode = 'lt'"></div>
    <div class="cell cell-12" :class="{active: mode === 'ct'}" @click="mode = 'ct'"></div>
    <div class="cell cell-13" :class="{active: mode === 'rt'}" @click="mode = 'rt'"></div>

    <div class="cell cell-21" :class="{active: mode === 'lc'}" @click="mode = 'lc'"></div>
    <div class="cell cell-22" :class="{active: mode === 'c'}"  @click="mode = 'c'" ></div>
    <div class="cell cell-23" :class="{active: mode === 'rc'}" @click="mode = 'rc'"></div>

    <div class="cell cell-31" :class="{active: mode === 'lb'}" @click="mode = 'lb'"></div>
    <div class="cell cell-32" :class="{active: mode === 'cb'}" @click="mode = 'cb'"></div>
    <div class="cell cell-33" :class="{active: mode === 'rb'}" @click="mode = 'rb'"></div>
  </div>
</template>

<script>
export default {
  name: 'AlignPosition',
  data () {
    return {
      mode: 'c'
    }
  },
  watch: {
    mode (val) {
      this.$emit('change', val)
    }
  }
}
</script>

<style scoped>
  .main {
    position: relative;
    width: 45px;
    height: 45px;
    border-top: 1px solid #333333;
    border-left: 1px solid #333333;
  }

  .cell {
    position: absolute;
    width: 15px;
    height: 15px;
    background: #4d4d4d;
    border-bottom: 1px solid #333333;
    border-right: 1px solid #333333;
    transition: background 0.3s;
  }
  .active {
    background: #787878;
    transition: background 0.3s;
  }

  .cell-12 {
    left: 15px;
  }
  .cell-13 {
    left: 30px;
  }

  .cell-21 {
    top: 15px;
  }
  .cell-22 {
    top: 15px;
    left: 15px;
  }
  .cell-23 {
    top: 15px;
    left: 30px;
  }

  .cell-31 {
    top: 30px;
  }
  .cell-32 {
    top: 30px;
    left: 15px;
  }
  .cell-33 {
    top: 30px;
    left: 30px;
  }
</style>
