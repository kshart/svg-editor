<template>
  <div id="app">
    <menu-main />
    <component v-if="menuName" :is="menuName" />
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MenuMain from '@/components/MenuMain'
import MenuProjects from '@/components/MenuProjects'
import '@/assets/css/font-awesome.css'
// material-design-icons

export default {
  name: 'App',
  components: { MenuMain, MenuProjects },
  computed: mapState({
    menuName: state => state.workspace.menuName
  })
}
</script>

<style>
  :root {
    background: #222;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
  }
  .md-theme-default :not(input):not(textarea)::selection {
    background: #bbb;
  }

  .scrollbar {
    -ms-overflow-style: -ms-autohiding-scrollbar;
  }
  .scrollbar::-webkit-scrollbar {
    background: #292929;
    width: 10px;
  }
  .scrollbar::-webkit-scrollbar-button {
    display: none;
  }
  .scrollbar::-webkit-scrollbar-thumb {
    background: #555;
  }
  .scrollbar::-webkit-scrollbar-thumb:hover {
    background: #5a5a5a;
  }
</style>
