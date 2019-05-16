<template>
    <div id="app">
        <router-view></router-view>
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
</style>
