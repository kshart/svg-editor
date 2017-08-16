<template>
  <div class="menu">
    <div class="search" :class="{shadow:!isPositionTop}">
      <md-input-container>
        <label>Поиск</label>
        <md-input v-model.trim="search"></md-input>
      </md-input-container>
    </div>
    <div class="item-list scrollbar" v-scroll="onScroll">
      <router-link tag="div" v-for="project in projects" class="item" :to="'/project/'+project.id">
        <p class="name">{{project.name}}</p>
        <p class="description">{{project.description}}</p>
        <p class="last-chage">Последнее изменение: {{project.lastChage}}</p>
      </router-link>
      <div class="loader">
        <md-spinner v-if="loadProgress >= 0" :md-progress="loadProgress" md-size="50"></md-spinner>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuProject',
  data () {
    return {
      search: null,
      isPositionTop: true,
      selectedProject: null
    }
  },
  computed: {
    projects () {
      return this.$store.getters['workspace/getProjects'](this.search)
    },
    loadProgress () {
      return this.$store.state.workspace.projectsLoadingProgress
    }
  },
  methods: {
    onScroll (e, position) {
      this.isPositionTop = position.scrollTop === 0
    }
  }
}
</script>

<style scoped>
  .menu {
    position: relative;
    width: 400px;
    color: #FFF;
    background-color: #292929;
    flex-shrink: 0;
  }

  .search {
    margin: 0;
    padding: 15px;
    padding-top: 0;
  }
  .search:after {
    content: '';
    display: block;
    visibility: hidden;
    position: absolute;
    top: 70px;
    left: 0;
    right: 10px;
    height: 15px;
    background: linear-gradient(to bottom, rgba(41,41,41,1) 0%,rgba(41,41,41,0) 100%);
    z-index: 2;
  }
  .search.shadow:after {
    visibility: visible;
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
    background-color: #999;
  }
  .md-input-container input,
  .md-input-container textarea {
    color: #999;
    background-color: #444;
    border: none;
    width: 100%;
    margin:0;
    padding: 5px;
    box-sizing: border-box;
    transition: background-color .2s ease-out, color .2s ease-out;
  }
  .md-input-container.md-has-value input,
  .md-input-container.md-has-value textarea {
    color: #aaa;
    background-color: #444;
    transition: background-color .2s ease-out, color .2s ease-out;
  }
  .md-input-container.md-input-focused input,
  .md-input-container.md-input-focused textarea {
    color: #aaa;
    text-shadow: 0 0 0 #aaa;
  }

  .item-list {
    width: 100%;
    top: 70px;
    bottom: 0;
    position: absolute;
    overflow-y: scroll;
    z-index: 1;
  }

  .item {
    padding: 15px;
    cursor: pointer;
    transition: background-color .2s ease-out;
  }
  .item:hover {
    background-color: #444;
    transition: background-color .2s ease-out;
  }
  .item:active {
    background-color: #555;
    transition: background-color .1s ease-out;
  }

  .item .name {
    margin: 0;
    margin-bottom: 5px;
    font-size: 14pt;
    color: #BBB;
  }
  .item .description {
    margin: 0;
    margin-bottom: 2px;
    font-size: 10pt;
    color: #999;
  }
  .item .last-chage {
    margin: 0;
    font-size: 10pt;
    color: #888;
  }

  .loader {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .loader .md-spinner {
    overflow: hidden;
  }
</style>
