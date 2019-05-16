import Vue from "vue";
import VueI18n from "vue-i18n";
Vue.use(VueI18n);
export default new VueI18n({
    locale: localStorage.getItem("lang") || "zh", // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
        zh: require("./zh"), // 中文语言包
        en: require("./en") // 英文语言包
    }
});
