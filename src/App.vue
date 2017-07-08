<template>
  <div id="app">
    <menu-main></menu-main>
    <div v-if="menuName" :is="menuName"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MenuMain from '@/components/MenuMain'
import MenuProjects from '@/components/MenuProjects'

export default {
  name: 'app',
  components: {
    MenuMain,
    MenuProjects
  },
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
</style>
