<template>
  <div class="main">
    <span class="title">{{title}}</span>
    <div class="body">
      <input :value="fill"/>
      <input :value="fillRule"/>
      <input :value="fillOpacity"/>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'FillManager',
  data () {
    return {
      title: 'Позиция'
    }
  },
  computed: {
    ...mapState('document', {
      object: state => state.selectedItem,
      fill: state => state.selectedItem ? state.selectedItem.attributes.fill : null,
      fillRule: state => state.selectedItem ? state.selectedItem.attributes['fill-rule'] : null, // nonzero | evenodd | inherit
      fillOpacity: state => state.selectedItem ? state.selectedItem.attributes['fill-opacity'] : null
    })
  },
  methods: {
    onFill (val) {
      console.log('fill')
      this.$store.commit('document/UPDATE_ELEMENT', {
        callback: object => {
          object.attributes.fill = val
        },
        object: this.object
      })
    },
    onFillRule (val) {
      this.$store.commit('document/UPDATE_ELEMENT', {
        callback: object => {
          object.attributes['fill-rule'] = val
        },
        object: this.object
      })
    },
    onFillOpacity (val) {
      this.$store.commit('document/UPDATE_ELEMENT', {
        callback: object => {
          object.attributes['fill-opacity'] = val
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
    // display: flex;
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
</style>
