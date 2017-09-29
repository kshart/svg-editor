export default {
  install (Vue, options) {
    Vue.mixin({
      mounted () {
        if (!this.$options.storage) {
          return
        }
        const {key, props} = this.$options.storage
        let calculatedKey
        if (key instanceof String) {
          calculatedKey = key
        } else if (key instanceof Function) {
          calculatedKey = key.apply(this, [this])
        } else {
          return
        }

        const value = localStorage.getItem(calculatedKey)
        if (value === null) {
          return
        }
        const data = JSON.parse(options.decompress(value))
        if (props instanceof Array) {
          props.forEach(name => {
            if (data[name]) {
              this[name] = data[name]
            }
          })
        } else {
          console.error('storage.props must be an array')
          return
        }
      },
      beforeDestroy () {
        if (!this.$options.storage) {
          return
        }
        const {key, props} = this.$options.storage
        let calculatedKey
        if (key instanceof String) {
          calculatedKey = key
        } else if (key instanceof Function) {
          calculatedKey = key.apply(this, [this])
        } else {
          return
        }

        const data = {}
        if (props instanceof Array) {
          props.forEach(name => {
            data[name] = this[name]
          })
        } else {
          console.error('storage.props must be an array')
          return
        }
        const value = JSON.stringify(data)
        localStorage.setItem(calculatedKey, options.compress(value))
      }
    })
  }
}
