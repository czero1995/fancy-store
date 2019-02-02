<template>
    <div class="page">
        <headers :tabname="$t('m.HeaderMember')"></headers>
        <transition :name="slidename">
            <div class="container" v-show="mainarea">
                <div class="floor floor_one">
                    <img src="../../../public/img/github.png" alt />
                    <p>Open Free Share</p>
                </div>
                <div class="floor floor_item floor_two flex-align-center flex-between" @click="onInfo">
                    <p>{{ $t("m.member.info") }}</p>
                    <i></i>
                </div>
                <div class="floor floor_item floor_two flex-align-center flex-between" @click="onOrder">
                    <p>{{ $t("m.member.order") }}</p>
                    <i></i>
                </div>
                <div class="floor floor_item floor_two flex-align-center flex-between" @click="onAddress">
                    <p>{{ $t("m.member.address") }}</p>
                    <i></i>
                </div>
            </div>
        </transition>
        <footers :urlRouter="$route.path"></footers>
    </div>
</template>

<script>
export default {
    data() {
        return {};
    },
    components: {
        Headers: () => import("../../components/Header"),
        Footers: () => import("../../components/Footer")
    },
    mounted() {
        /*判断动画是进还是出*/
        const slideArr = ["index", "category", "cart"];
        slideArr.includes(this.$store.state.comname) ? (this.slidename = "slide-go") : (this.slidename = "slide-back");
        this.setComname("member");
    },
    methods: {
        /*个人信息*/
        onInfo() {
            this.$router.push("./info");
        },
        /*我的订单*/
        onOrder() {
            this.$router.push("./order");
        },
        /*我的地址*/
        onAddress() {
            this.$router.push("./address");
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.page {
    background: rgb(245, 245, 245);
}

.floor_one {
    width: 100%;
    height: 400px;
    background: @theme_background;
    position: relative;
    img {
        position: absolute;
        width: 180px;
        height: 180px;
        left: 0;
        right: 0;
        top: 15%;
        margin: auto;
    }
    p {
        position: absolute;
        bottom: 25%;
        left: 0;
        right: 0;
        margin: 0 auto;
        text-align: center;
        color: white;
        font-size: 26px;
    }
}

.floor_item {
    padding: 0 20px;
    height: 80px;
    line-height: 80px;
    font-size: 28px;
    background: @base_color;
    margin-bottom: 40px;
    i {
        width: 40px;
        height: 40px;
        background: url("../../../public/img/icon/common_sprites.png") -10px -710px;
    }
}
</style>
