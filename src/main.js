import Vue from 'vue'
import App from './App.vue'
import vueEbCalendar from './lib/index.js'

Vue.use(vueEbCalendar)

new Vue({
  el: '#app',
  render: h => h(App)
})
