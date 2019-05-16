import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./lang";
import axios from "./utils/axios";
import Vconsole from "vconsole";
import fastclick from "fastclick";
import MetaInfo from "vue-meta-info";
import { Lazyload } from "vant";
import Raven from "raven-js";
import RavenVue from "raven-js/plugins/vue";
import "amfe-flexible";
// 控制台插件
let vConsole = null;
process.env.NODE_ENV == "development" && (vConsole = new Vconsole());
export default vConsole;
// axios全局拦截
Vue.prototype.$http = axios;
Vue.use(Lazyload);
Vue.use(MetaInfo);
// mock模拟数据

// 去除移动端点击200ms延迟
fastclick.attach(document.body);

// Sentry错误日志监控
Raven.config("https://ce431a99e0884612a053541eef0f2810@sentry.io/1245961", {
    release: process.env.RELEASE_VERSION,
    debug: true
})
    .addPlugin(RavenVue, Vue)
    .install();

Vue.config.productionTip = false;

Vue.mixin({
    methods: {
        onBack() {
            this.$router.back();
        }
    }
});
new Vue({
    router,
    store,
    i18n,
    render: h => h(App),
    mounted() {
        document.dispatchEvent(new Event("render-event"));
    }
}).$mount("#app");
