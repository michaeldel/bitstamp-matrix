import axios from 'axios'
import Pusher from 'pusher-js'
import Vue from 'vue'

import App from './App.vue'


import 'bulma/css/bulma.css'

Vue.prototype.$http = axios
Vue.prototype.$ws = new Pusher('de504dc5763aeef9ff52')


new Vue({
  el: '#app',
  render: h => h(App)
})
