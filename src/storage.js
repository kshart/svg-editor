export default {
  install (Vue, options) {
    Vue.mixin({
      mounted () {
        if (this.$options.storage) {
          if (this.$options.storage.data instanceof Array) {
            this.$options.storage.data.forEach(name => {
              const value = localStorage.getItem(name)
              if (value !== null) {
                this[name] = JSON.parse(options.decompress(value))
              }
            })
          } else if (this.$options.storage.data instanceof Object) {

          }
        }
      },
      beforeDestroy () {
        if (this.$options.storage) {
          if (this.$options.storage.data instanceof Array) {
            this.$options.storage.data.forEach(name => {
              const value = JSON.stringify(this[name])
              localStorage.setItem(name, options.compress(value))
            })
          } else if (this.$options.storage.data instanceof Object) {

          }
        }
      }
    })
  }
}
