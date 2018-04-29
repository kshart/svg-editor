<template>
  <div class="panel">
    <div class="controls">
      <div v-if="selectedItem" class="path">{{selectedItem.name}}</div>
      <button @click="createPage">+</button>
    </div>
    <div class="pagelist">
      <page-item v-for="(page, key) in pages" :key="key" :page="page" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PageItem from './PageItem'

export default {
  name: 'page-manager',
  components: { PageItem },
  data () {
    return {
      showDescription: true
    }
  },
  computed: {
    pages () {
      return this.$store.state.document.pages
    },
    ...mapState('document', ['selectedItem'])
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
    background: #F00;
  }
  .controls {
    display: flex;
    background: #222;
    color: #999;
  }
  .controls .path {
    padding: 5px 10px;
  }
</style>
