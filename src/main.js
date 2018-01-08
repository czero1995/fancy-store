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
fastclick.attach(document.body) //解决移动端点击事件200ms延迟

Vue.use(Vuex)
Vue.prototype.$http=axios;
Vue.use(VueTouch, {name: 'v-touch'}) //滑动事件
VueTouch.config.swipe = {            //配置滑动区域为左滑动，解决和滚动事件的冲突
	direction: 'horizontal',
  	threshold: 200
}
Vue.config.productionTip = false      //vuex开启开发环境日志
// or with options
Vue.use(VueLazyLoad, {                //懒加载声明错误图和占位图
  preLoad: 1.3,
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
