<template>
    <div class="page orderpage">
        <v-touch @swipeleft="onSwipeLeft()" @swiperight="onSwipeRight()">
            <headersec tabname="我的订单" ref="noback"></headersec> <ordertab :urlRouter="$route.path"></ordertab>
            <transition :name="slidename">
                <div class="container" v-show="mainarea">
                    <div v-show="!havePage"><nopage></nopage></div>
                    <div class="order-item" v-show="havePage" v-cloak>
                        <div v-for="(itemPay, itemIndex) in $store.state.pays" :key="itemIndex">
                            <div class="order-top flex-between">
                                <p>订单号xxxxx</p>
                                <p>已支付</p>
                            </div>
                            <div class="order-content">
                                <div class="flex">
                                    <div class="order-img"><img :src="itemPay.GoodsImage" /></div>
                                    <div class="order-text">
                                        <p class="goods-name text-ellipsis">{{ itemPay.GoodsName }}</p>
                                        <p class="goods-num">x{{ itemPay.GoodsNum }}</p>
                                        <p class="goods-price">¥{{ itemPay.GoodsPrice }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </v-touch>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {
            havePage: false
        };
    },
    components: {
        Headersec: () => import("../../components/HeaderSec"),
        Nopage: () => import("../../components/NoPage"),
        Ordertab: () => import("../../components/OrderTab")
    },
    computed: {
        ...mapGetters(["this.$store.state.pays", "this.$store.state.ordercur", "this.$store.state.ordertab"])
    },
    mounted() {
        this.setOrdercur(1);
        this.$store.state.pays === undefined ? (this.havePage = false) : (this.havePage = true);
        this.$refs.noback.isBack = false;
        /*判断动画是进还是出*/
        this.$store.state.ordercur < this.$store.state.ordertab ? (this.slidename = "slide-back") : (this.slidename = "slide-go");
        this.setOrdertab(1);
    },
    methods: {
        onSwipeLeft() {
            this.$router.push("./waitpay");
        },
        onSwipeRight() {
            this.$router.push("./orderdown");
        },
        ...mapMutations({
            setOrdercur: "SET_ORDERCUR",
            setOrdertab: "SET_ORDERTAB"
        })
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.container {
    padding-top: 160px;
}

.order-item {
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
}

.order-top {
    height: 80px;
    font-size: 28px;
    line-height: 80px;
    padding: 0 20px;
    border-bottom: 1px solid #ccc;
}

.order-content {
    padding-top: 20px;
}
</style>
