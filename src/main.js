import axios from 'axios'
import Vue from 'vue'

import App from './App.vue'


import 'bulma/css/bulma.css'

Vue.prototype.$http = axios

new Vue({
  el: '#app',
  render: h => h(App)
})
