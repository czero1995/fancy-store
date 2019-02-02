<template>
    <div class="page">
        <headersec tabname="订单详情"></headersec>
        <transition :name="slidename">
            <div class="container" v-show="mainarea">
                <div v-show="!havePage"><nopage></nopage></div>
                <div v-show="havePage">
                    <div class="chooseAddress" @click="onAddress()">
                        <div class="flex-align-center chooseBox">
                            <i class="address_img"></i>
                            <div class="flex-align-center flex-between">
                                <p v-show="!this.$store.state.chooseaddress">选择送货地址</p>
                                <p v-show="this.$store.state.chooseaddress">{{ this.$store.state.chooseaddress }}</p>
                                <i class="arrow_next"></i>
                            </div>
                        </div>
                    </div>
                    <div class="orderItem flex" v-for="(orderItem, orderIndex) in $store.state.orders" :key="orderIndex">
                        <img :src="orderItem.GoodsImage" class="goodsImg" />
                        <div>
                            <p class="goods-name">{{ orderItem.GoodsName }}</p>
                            <p class="goods-num">x{{ orderItem.GoodsNum }}</p>
                            <p class="goods-price">¥{{ orderItem.GoodsPrice }}</p>
                        </div>
                    </div>
                    <div class="orderBottom flex-between">
                        <span>总金额:{{ allCoach }}</span> <span @click="onOrder">结算</span>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {
            allCoach: 0,
            havePage: false,
            slidename: "slide-go"
        };
    },
    components: {
        Headersec: () => import("../../components/HeaderSec"),
        Nopage: () => import("../../components/NoPage")
    },
    computed: {
        ...mapGetters(["this.$store.state.orders", "this.$store.state.chooseaddress"])
    },
    mounted() {
        let sums = [];
        this.$store.state.orders === undefined ? (this.havePage = false) : (this.havePage = true);

        this.$store.state.orders.forEach(item => {
            sums.push(item.GoodsPrice);
        });
        for (let i = 0; i < sums.length; i++) {
            this.allCoach += parseInt(sums[i]);
        }

        /*判断动画是进还是出*/
        const slideArr = ["goodsdetail", "cart"];
        slideArr.includes(this.$store.state.comname) ? (this.slidename = "slide-go") : (this.slidename = "slide-back");
        this.setComname("orderwait");
    },

    methods: {
        /*我的订单*/
        onOrder() {
            this.$router.push("./order");
            this.setPays(this.$store.state.orders);
        },
        /*选择地址*/
        onAddress() {
            this.setIschoose(1);
            this.$router.push("./address");
        },
        ...mapMutations({
            setPays: "SET_PAYS",
            setIschoose: "SET_ISCHOOSE"
        })
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.chooseBox {
    margin-top: 20px;
    margin-bottom: 20px;
    height: 100px;
    padding: 0 20px;
    font-size: 28px;
    border: 1px dashed @theme_background;
    img {
        width: 40px;
        height: 40px;
        margin-right: 20px;
    }
    div {
        width: 100%;
    }
    p {
        text-align: center;
    }
}

.orderItem {
    padding: 20px;
    border-bottom: 1px solid #ccc;
}

.goodsImg {
    width: 200px;
    height: 200px;
}

.orderBottom {
    position: fixed;
    bottom: 0;
    height: 80px;
    background: @theme_background;
    width: 100%;
    color: @base_color;
    font-size: 28px;
    line-height: 80px;
    padding: 0 20px;
    box-sizing: border-box;
}

.arrow_next {
    width: 60px;
    height: 40px;
    background: url("../../../public/img/icon/common_sprites.png") 0px -313px; /* no */
    background-size: 100%;
}
.address_img {
    width: 60px;
    height: 48px;
    background: url("../../../public/img/icon/common_sprites.png") 0px -203px; /* no */
    background-size: 100%;
}
</style>
