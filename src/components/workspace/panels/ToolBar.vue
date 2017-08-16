<template>
  <div class="component">
    <div v-for="btn in buttons" class="button">
      <md-icon md-iconset="fa fa-lg" :class="btn.icon" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolBar',
  data () {
    return {
      buttons: [
        {
          name: '',
          icon: 'fa-hand-pointer-o'
        }, {
          name: '',
          icon: 'fa-font'
        }, {
          name: '',
          icon: 'fa-book'
        }, {
          name: '',
          icon: 'fa-book'
        }, {
          name: '',
          icon: 'fa-book'
        }, {
          name: '',
          icon: 'fa-book'
        }, {
          name: '',
          icon: 'fa-book'
        }, {
          name: '',
          icon: 'fa-book'
        }
      ]
    }
  }
}
</script>

<style scoped>
  .component {
    background: #555;
  }
  .button {
    display: block;
    padding: 10px;
    width: 100%;
    color: #fff;
    text-align: center;
    user-select: none;
  }
  .button:hover {
    background: #4f4f4f;
  }
  .button:active {
    background: #444;
  }
  .button,
  .button:hover,
  .button:active {
    transition: background .1s ease-out;
  }
</style>
