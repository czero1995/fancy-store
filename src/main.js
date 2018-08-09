import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import axios from 'axios'
import VueLazyLoad from 'vue-lazyload'
import fastclick from 'fastclick'
import Vconsole from 'vconsole'
let vConsole = new Vconsole()
export default vConsole
var VueTouch = require('vue-touch')
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
import VueI18n from 'vue-i18n'
Raven
  .config('https://ce431a99e0884612a053541eef0f2810@sentry.io/1245961', {
    release: process.env.RELEASE_VERSION,
    debug: true
  })
  .addPlugin(RavenVue, Vue)
  .install();

require('../mock')
fastclick.attach(document.body) //解决移动端点击事件200ms延迟

Vue.use(Vuex)
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'zh',    // 语言标识
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh': require('./lang/zh'),   // 中文语言包
    'en': require('./lang/en')    // 英文语言包
  }
})
Vue.prototype.$http = axios;
Vue.use(VueTouch, {
  name: 'v-touch'
}) //滑动事件
VueTouch.config.swipe = { //配置滑动区域为左滑动，解决和滚动事件的冲突
  direction: 'horizontal',
  threshold: 200
}
Vue.config.productionTip = false //vuex开启开发环境日志
const isDebug_mode = process.env.NODE_ENV !== 'production'
Vue.config.debug = isDebug_mode
Vue.config.devtools = isDebug_mode
Vue.config.productionTip = isDebug_mode

// or with options
Vue.use(VueLazyLoad, { //懒加载声明错误图和占位图
  preLoad: 1.3,
  error: './static/img/github.png',
  loading: './static/img/github.png',
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: {
    App,
  }
})
