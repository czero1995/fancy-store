<template>
    <div class="page">
        <headersec tabname="个人信息"></headersec>
        <transition name="slide-go">
            <div class="container" v-show="mainarea">
                <img src="../../../public/img/github.png" alt />
                <p>wechat:374139613</p>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    components: {
        Headersec: () => import("../../components/HeaderSec")
    },
    mounted() {}
};
</script>

<style lang="less" scoped>
.container {
    text-align: center;
    img {
        margin-top: 30px;
    }
    p {
        margin-top: 30px;
        font-size: 28px;
    }
}
</style>
