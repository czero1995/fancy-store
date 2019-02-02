import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./lang";
import axios from "../public/js/axios";
import VueTouch from "vue-touch";
import VueLazyLoad from "vue-lazyload";
import Vconsole from "vconsole";
import fastclick from "fastclick";
import Raven from "raven-js";
import RavenVue from "raven-js/plugins/vue";
import { mapGetters, mapMutations } from "vuex";
// import "../public/js/rem.js";
// 控制台插件
let vConsole = null;
process.env.NODE_ENV == "development" && (vConsole = new Vconsole());
export default vConsole;

// axios全局拦截
Vue.prototype.$http = axios;

// mock模拟数据
require("../mock");

// 去除移动端点击200ms延迟
fastclick.attach(document.body);

// Sentry错误日志监控
Raven.config("https://ce431a99e0884612a053541eef0f2810@sentry.io/1245961", {
    release: process.env.RELEASE_VERSION,
    debug: true
})
    .addPlugin(RavenVue, Vue)
    .install();

// 图片懒加载
Vue.use(VueLazyLoad, {
    //懒加载声明错误图和占位图
    preLoad: 1.3,
    error: "./img/github.png",
    loading: "./img/github.png"
});

// 手势滑动事件
Vue.use(VueTouch, {
    name: "v-touch"
});
VueTouch.config.swipe = {
    direction: "horizontal",
    threshold: 200
};

Vue.config.productionTip = false;

Vue.mixin({
    data() {
        return {
            cartLength: 0,
            slidename: "slide-go",
            mainarea: false
        };
    },
    mounted() {
        this.mainarea = true;
    },
    computed: {
        ...mapGetters(["this.$store.state.comname"])
    },
    methods: {
        ...mapMutations({
            setGoods: "SET_GOODS",
            setCarts: "SET_CARTS",
            setTabindex: "SET_TABINDEX",
            setComname: "SET_COMNAME"
        })
    }
});
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount("#app");
