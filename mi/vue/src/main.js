import Vue from 'vue'
import App from './layouts/App.vue'

Vue.config.productionTip = false

import  './assets/css/base.css'
import './assets/js/font.js'
import 'animate.css'

import router from './plugins/router.js'
import server from './config/server'
Vue.prototype.$baseUrl = server.baseUrl;
import './plugins/axios'

import store from './plugins/vuex.js'
import * as types from './store/types.js'
Vue.prototype.$types=types

let vm = new Vue({
  data:{
    bNav:false,
    bFoot:false,
    bLoading:false,
    bNews:false
  },
  render: h => h(App),
  router,store
}).$mount('#app')

export default vm