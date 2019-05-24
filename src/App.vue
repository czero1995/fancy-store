<template>
    <div id="app">
        <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>
<script>
export default {
    created() {
        // page load and read vuex state grom sessionStorage
        sessionStorage.getItem("vuex") && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(sessionStorage.getItem("vuex"))));
        // page refresh save vuex statw to sessionStorage
        window.addEventListener("beforeunload", () => {
            sessionStorage.setItem("vuex", JSON.stringify(this.$store.state));
        });
    }
};
</script>
<style lang="less">
@import "../public/less/base.less";
#app {
    height: 100%;
}
.router-fade-enter-active,
.router-fade-leave-active {
    transition: opacity 0.1s;
}
.router-fade-enter,
.router-fade-leave-active {
    opacity: 0;
}
</style>
