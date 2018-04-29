<template>
  <div class="menu show" :style="{width: show ? '230px' : '50px'}">
    <div class="list">
      <div class="head">
        <h1 v-if="show" class="title">
          svg-editor <span class="version">v{{version}}</span>
        </h1>
        <h1 v-else @click="open" class="title litle">S</h1>
      </div>
      <div v-for="(item, key) in items" :key="key" class="item" @click="select(item.name)">
        <transition name="fade">
          <span v-if="show">{{item.title}}</span>
        </transition>
        <md-icon md-iconset="fa fa-lg" class="image" :class="item.icon" />
      </div>
    </div>
    <component v-if="menuName" class="popup-menu" :is="menuName" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { version } from '@/../package.json'
import ExplorerPopupMenu from './popup-menu/ExplorerPopupMenu'

export default {
  name: 'menu-main',
  components: { ExplorerPopupMenu },
  data () {
    return {
      version,
      items: [
        {
          name: 'ExplorerPopupMenu',
          icon: 'fa-book',
          title: 'Проекты'
        }, {
          name: '',
          icon: 'fa-car',
          title: 'Пользователи'
        }, {
          name: '',
          icon: 'fa-cog',
          title: 'Настройки'
        }
      ]
    }
  },
  computed: mapState({
    show: state => state.workspace.menuFull,
    menuName: state => state.workspace.menuName
  }),
  methods: {
    open () {
      this.$store.commit('workspace/CHANGE_FIRST_MENU_STATUS', { status: true })
    },
    select (name) {
      this.$store.commit('workspace/CHANGE_SECOND_MENU', { name })
      this.$store.commit('workspace/CHANGE_FIRST_MENU_STATUS', { status: false })
    }
  }
}
</script>

<style scoped>
  .menu {
    position: relative;
    color: #FFF;
    background: #333;
    transition: width .3s ease-out;
    flex-shrink: 0;
  }

  .title {
    margin: 0;
    padding: 15px;
    font-size: 24pt;
    color: #EEE;
    text-align: center;
    white-space: nowrap;
  }
  .title.litle {
    padding: 15px 5px;
  }
  .version {
    font-size: 10pt;
    color: #AAA;
  }

  .head {
    height: 50px;
  }

  .list {
    width: 100%;
    top: 0;
    bottom: 0;
    position: absolute;
    overflow-y: auto;
    z-index: 1;
  }
  .list::-webkit-scrollbar {
    background: #292929;
    width: 10px;
  }
  .list::-webkit-scrollbar-button {
    display: none;
  }
  .list::-webkit-scrollbar-thumb {
    background: #555;
  }
  .list::-webkit-scrollbar-thumb:hover {
    background: #5A5A5A;
  }

  .item {
    display: block;
    position: relative;
    height: 50px;
    padding: 15px;
    margin: 0;
    margin-bottom: 5px;
    color: #EEE;
    font-size: 14pt;
    cursor: pointer;
    white-space: nowrap;
    transition: background .2s ease-out;
  }
  .item span.fade-enter-active,
  .item span.fade-leave-active {
    transition: opacity .3s
  }
  .item span.fade-enter,
  .item span.fade-leave-to {
    opacity: 0
  }
  .item:hover {
    background: #444;
    transition: background .2s ease-out;
  }
  .item:active {
    background: #555;
    transition: background .1s ease-out;
  }

  .image {
    position: absolute;
    display: block;
    /*height: 40px;
    width: 40px;*/
    top: 15px;
    right: 13px;
  }
  .popup-menu {
    position: absolute;
    left: 100%;
    z-index: 10;
    background: #333;
  }
</style>
