<template>
    <div class="page">
        <headersec tabname="我的地址"></headersec>
        <transition :name="slidename">
            <div class="container" v-show="mainarea">
                <div v-show="!havePage"><nopage></nopage></div>
                <div v-show="havePage">
                    <div class="address-item" v-for="(addressItem, addressIndex) in this.$store.state.address" @click="onChooseAddress(addressItem)" :key="addressIndex">
                        <p>{{ addressItem }}</p>
                    </div>
                </div>
            </div>
        </transition>
        <div class="pageBottom" @click="onAddAddress"><span class="tabbar-label">新增地址</span></div>
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
        Nopage: () => import("../../components/NoPage")
    },
    computed: {
        ...mapGetters(["this.$store.state.address", "this.$store.state.chooseaddress", "this.$store.state.ischoose"])
    },

    mounted() {
        this.$store.state.address.length === 0 ? (this.havePage = false) : (this.havePage = true);

        /*判断动画是进还是出*/
        this.$store.state.comname === "addressadd" ? (this.slidename = "slide-back") : (this.slidename = "slide-go");
        this.setComname("address");
    },

    methods: {
        /*添加地址*/
        onAddAddress() {
            this.$router.push("./addaddress");
        },
        /*选择地址*/
        onChooseAddress(item) {
            if (this.$store.state.ischoose == 1) {
                this.setChooseaddress(item);
                this.$router.push("./orderwait");
                this.setIschoose(2);
            }
        },
        ...mapMutations({
            setChooseaddress: "SET_CHOOSEADDRESS",
            setIschoose: "SET_ISCHOOSE"
        })
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.pageBottom {
    position: fixed;
    bottom: 0;
    background: @theme_background;
    width: 100%;
    height: 80px;
    line-height: 80px;
    color: @base_color;
    font-size: 28px;
    text-align: center;
}

.address-item {
    height: 120px;
    line-height: 120px;
    font-size: 28px;
    text-align: center;
    border-bottom: 1px solid #ccc;
}
</style>
