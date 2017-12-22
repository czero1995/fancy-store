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
require('./mock')
fastclick.attach(document.body)
Vue.use(Vuex)

Vue.use(VueLazyLoad)
Vue.prototype.$http=axios;
Vue.config.productionTip = false
Vue.use(VueLazyLoad,{
//  error:'../img/1.png',
//  loading:'../img/2.png'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
