<template>
  <div class="main">
    <span class="title">{{title}}</span>
    <div class="body">
      <align-position />
      <md-input-container class="input">
        <md-input v-model.number="x"></md-input>
      </md-input-container>
      <md-input-container class="input">
        <md-input v-model.number="y"></md-input>
      </md-input-container>
    </div>
  </div>
</template>

<script>
import AlignPosition from './components/AlignPosition'

export default {
  name: 'PositionInput',
  components: { AlignPosition },
  props: {
    object: Object
  },
  data () {
    return {
      title: 'Позиция',
      x: 0,
      y: 0
    }
  },
  watch: {
    x (val) {
      console.log(this.object)
      this.$store.commit('document/UPDATE_ELEMENT', {
        callback: object => {
          object.attributes.x = val
        },
        object: this.object
      })
    }
  }
}
</script>

<style scoped>
  .main {
    background: #222222;
  }
  .body {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    padding-top: 0;
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

  .md-input-container label,
  .md-input-container.md-has-value label,
  .md-input-container.md-input-focused label {
    color: #aaa;
  }
  .md-input-container label {
    padding-left: 5px;
  }
  .md-input-container.md-input-focused:after {
    background: #999;
  }
  .md-input-container input,
  .md-input-container textarea {
    color: #999;
    background: #444;
    border: none;
    width: 100%;
    margin:0;
    padding: 5px;
    box-sizing: border-box;
    transition: background .2s ease-out, color .2s ease-out;
  }
  .md-input-container.md-has-value input,
  .md-input-container.md-has-value textarea {
    color: #aaa;
    background: #444;
    transition: background .2s ease-out, color .2s ease-out;
  }
  .md-input-container.md-input-focused input,
  .md-input-container.md-input-focused textarea {
    color: #aaa;
    text-shadow: 0 0 0 #aaa;
  }
</style>
