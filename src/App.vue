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
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #222;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: stretch;
  }
  .md-theme-default :not(input):not(textarea)::selection {
    background-color: #BBB;
  }
  
  .scrollbar::-webkit-scrollbar {
    background-color: #292929;
    width: 10px;
  }
  .scrollbar::-webkit-scrollbar-button {
    display: none;
  }
  .scrollbar::-webkit-scrollbar-thumb {
    background-color: #555;
  }
  .scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: #5A5A5A;
  }
</style>
