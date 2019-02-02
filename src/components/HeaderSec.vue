<template>
    <header id="headerTab" class="flex flex-align-center">
        <i @click="onBack"></i>
        <p>{{ tabname }}</p>
    </header>
</template>

<script>
export default {
    props: ["tabname"],
    data() {
        return {
            isBack: true
        };
    },
    methods: {
        onBack() {
            if (this.isBack) {
                this.$router.back();
            } else {
                this.$router.push("./member");
            }
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../public/less/base.less";
header {
    height: 80px;
    text-align: center;
    background: @theme_background;
    color: @base_color;
    font-size: 26px;
    line-height: 80px;
    width: 100%;
    z-index: 10;
    position: fixed;
    top: 0;
}

i {
    width: 80px;
    height: 80px;
    margin-left: 20px;
    background: url("../../public/img/icon/common_sprites.png") 0px 197px; /* no */
    background-size: 100%;
}

p {
    text-align: center;
    width: 100%;
    margin-right: 60px;
}
</style>
