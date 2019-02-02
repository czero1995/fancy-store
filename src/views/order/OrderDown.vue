<template>
    <div class="page orderpage">
        <v-touch @swipeleft="onSwipeLeft()" @swiperight="onSwipeRight()">
            <headersec tabname="我的订单" ref="noback"></headersec> <ordertab :urlRouter="$route.path"></ordertab>
            <transition :name="slidename">
                <div class="ordercontainer" v-show="mainarea">
                    <img src="../../../public/img/github.png" alt />
                    <p>已完成页面</p>
                </div>
            </transition>
        </v-touch>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    data() {
        return {
            slidename: "slide-go"
        };
    },
    components: {
        Headersec: () => import("../../components/HeaderSec"),
        Ordertab: () => import("../../components/OrderTab")
    },
    mounted() {
        this.$refs.noback.isBack = false;
        this.setOrdertab(5);
    },
    methods: {
        onSwipeLeft() {
            this.$router.push("./order");
        },
        onSwipeRight() {
            this.$router.push("./waitreceive");
        },
        ...mapMutations({
            setOrdertab: "SET_ORDERTAB"
        })
    }
};
</script>
