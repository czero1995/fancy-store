<template>
    <div class="page orderpage">
        <v-touch @swipeleft="onSwipeLeft()" @swiperight="onSwipeRight()">
            <headersec tabname="我的订单" ref="noback"></headersec> <ordertab :urlRouter="$route.path"></ordertab>
            <transition :name="slidename">
                <div class="ordercontainer" v-show="mainarea">
                    <img src="../../../public/img/github.png" alt />
                    <p>待付款页面</p>
                </div>
            </transition>
        </v-touch>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {};
    },
    components: {
        Headersec: () => import("../../components/HeaderSec"),
        Ordertab: () => import("../../components/OrderTab")
    },
    computed: {
        ...mapGetters(["this.$store.state.ordercur", "this.$store.state.ordertab"])
    },
    mounted() {
        this.setOrdercur(2);
        this.$refs.noback.isBack = false;
        this.$store.state.ordercur < this.$store.state.ordertab ? (this.slidename = "slide-back") : (this.slidename = "slide-go");
        this.setOrdertab(2);
    },
    methods: {
        onSwipeLeft() {
            this.$router.push("./waitdeliver");
        },
        onSwipeRight() {
            this.$router.push("./order");
        },
        ...mapMutations({
            setOrdercur: "SET_ORDERCUR",
            setOrdertab: "SET_ORDERTAB"
        })
    }
};
</script>
