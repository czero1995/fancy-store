// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import fastclick from 'fastclick'
var VueTouch = require('vue-touch')
require('../mock')
fastclick.attach(document.body)

Vue.use(Vuex)
Vue.prototype.$http=axios;
Vue.use(VueTouch, {name: 'v-touch'})
Vue.config.productionTip = false
// or with options
Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: './static/img/github.png',
  loading: './static/img/github.png',
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
