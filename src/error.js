import Vue from 'vue'

Vue.config.errorHandler = e => {
  console.log('Error:')
  console.error(e.message)
  Vue.prototype.$toast(e.message)
}
