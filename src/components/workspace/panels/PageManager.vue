<template>
  <div class="panel">
    <div class="controls">
      <div class="path">{{selection}}</div>
      <button @click="createPage">+</button>
    </div>
    <div class="pagelist">
      <page-item v-for="page in pages" :page="page" />
    </div>
  </div>
</template>

<script>
import PageItem from './PageItem'

export default {
  name: 'page-manager',
  components: { PageItem },
  props: {
    pages: {
      types: Array,
      default: []
    },
    selection: String
  },
  data () {
    return {
      showDescription: true
    }
  },
  methods: {
    createPage () {
      this.$store.commit('document/CREATE_PAGE', {})
    }
  }
}
</script>

<style scoped>
  .panel {
    max-width: 400px;
    width: 100%;
    height: 100%;
    background-color: #F00;
  }
  .page {
    background-color: #292929;
  }
  .pagehead {
    margin: 0;
    padding: 10px 15px;
  }
  .pagehead-name {
    margin: 0;
    font-size: 14pt;
    color: #BBB;
  }
  .pagehead-layers {
    float: right;
    font-size: 10pt;
    color: #999;
  }
  .pagehead-description {
    margin: 0;
    font-size: 10pt;
    color: #999;
  }

  .controls {
    display: flex;
    background-color: #222;
    color: #999;
  }
  .controls .path {
    padding: 5px 10px;
  }
</style>
