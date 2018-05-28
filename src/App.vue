<template>
    <div id="app">

        <router-view/>

    </div>
</template>

<script>
import '../static/js/rem.js';
export default {
    name: 'app',
    created() {
        // page load and read vuex state grom localStorage
        localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(localStorage.getItem("userMsg"))));

        //page refresh save vuex statw to localStorage
        window.addEventListener("beforeunload", () => {
            localStorage.setItem("userMsg", JSON.stringify(this.$store.state))
        })
    }
}
</script>

<style lang="less">
@import '../static/less/base.less';
#app {
  height: 100%;
}
</style>
