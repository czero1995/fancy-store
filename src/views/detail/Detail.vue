<template>
    <div class="page">
        <headersec :tabname="$t('m.HeaderDetail')"></headersec>
        <transition :name="slidename">
            <div class="container" v-show="mainarea">
                <div v-show="!havePage"><nopage></nopage></div>
                <div v-show="havePage">
                    <img :src="$store.state.goods.GoodsImage" class="goodsImg" />
                    <div class="detail-content">
                        <p class="goods-name">{{ $store.state.goods.GoodsName }}</p>
                        <p class="goods-price">¥{{ $store.state.goods.GoodsPrice }}</p>
                    </div>
                </div>
            </div>
        </transition>
        <div class="detail-bottom flex-align-center flex-around">
            <div class="toCart">
                <i @click="toCart"></i>
                <transition name="bullet">
                    <p v-show="cartNum">{{ cartLength }}</p>
                </transition>
            </div>

            <div class="addCart" @click="onCartModel()"><span class="tabbar-label">加入购物车</span></div>
            <div class="external addPay" @click="onBuyModel()"><span class="tabbar-label">立即购买</span></div>
        </div>

        <transition name="slide-up">
            <div class="model" v-show="addCartModel" v-cloak>
                <div class="model-content addCart-content" @click.stop="addCartModel = true">
                    <div class="cartModel-box flex">
                        <div class="cartModel-img"><img :src="$store.state.goods.GoodsImage" /></div>
                        <div class="cartModel-text">
                            <div class="flex-between">
                                <p class="goods-name">{{ $store.state.goods.GoodsName }}</p>
                                <i class="cartClose" @click.stop="addCartModel = false"></i>
                            </div>

                            <p class="goods-price">¥{{ $store.state.goods.GoodsPrice }}</p>
                        </div>
                    </div>
                    <div class="cartModel-bottom flex-between">
                        <p>购买数量</p>
                        <div class="goodsOp flex"><i class="shop_cut" @click="onCutCart()"></i> <input type="text" :value="goodsNum" readonly /> <i class="shop_add" @click="onAddCart()"></i></div>
                    </div>
                    <div @click.stop="onBuy">
                        <p class="cartModel-addCart" v-show="!isBuy">加入购物车</p>
                        <p class="cartModel-addCart" v-show="isBuy">立即购买</p>
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
            goodsNum: 1,
            addCartModel: false,
            isBuy: true,
            havePage: false,
            cartNum: false
        };
    },
    computed: {
        ...mapGetters(["this.$store.state.goods", "this.$store.state.carts"])
    },
    mounted() {
        this.$store.state.goods === undefined ? (this.havePage = false) : (this.havePage = true);

        this.$store.state.carts != undefined && (this.cartLength = this.$store.state.carts.length);

        /*判断动画是进还是出*/
        const slideArr = ["orderwait", "cart"];
        slideArr.includes(this.$store.state.comname) ? (this.slidename = "slide-back") : (this.slidename = "slide-go");

        this.setComname("goodsdetail");
    },
    components: {
        Headersec: () => import("../../components/HeaderSec"),
        Nopage: () => import("../../components/NoPage")
    },
    methods: {
        toCart() {
            this.$router.push("./cart");
        },
        onCartModel() {
            this.addCartModel = true;
            this.isBuy = false;
        },
        onBuyModel() {
            this.addCartModel = true;
            this.isBuy = true;
        },
        onAddCart() {
            this.goodsNum++;
        },
        onCutCart() {
            this.goodsNum > 1 && this.goodsNum--;
        },
        onBuy() {
            if (this.isBuy) {
                let orderArr = [];
                orderArr.push(this.$store.state.goods);
                this.setOrders(orderArr);
                this.$router.push("./orderwait");
            } else {
                if (!this.cartNum) {
                    this.setCarts(this.$store.state.goods);
                    this.addCartModel = false;
                    this.cartNum = true;
                    this.cartLength = this.cartLength + 1;
                    setTimeout(() => {
                        this.cartNum = false;
                    }, 2000);
                }
            }
        },
        ...mapMutations({
            setOrders: "SET_ORDERS",
            setCarts: "SET_CARTS"
        })
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.detial {
    padding-top: 80px;
    padding-bottom: 88px;
}
.goodsImg {
    width: 100%;
    height: 500px;
}

.detail-content {
    padding-left: 20px;
    margin-top: 40px;
}

.detail-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 80px;
    background: @theme_background;
    color: @base_color;
    font-size: 28px;
    img {
        width: 40px;
        height: 40px;
    }
}
.toCart {
    position: relative;
    i {
        width: 66px;
        height: 55px;
        display: inline-block;
        background: url("../../../public/img/icon/common_sprites.png") 0px -515px; /* no */
        background-size: 100%;
    }
    p {
        position: absolute;
        text-align: center;
        top: -20px;
        right: -20px;
        background: @base_color;
        color: @theme_background;
        width: 40px;
        height: 40px;
        line-height: 40px;
        border-radius: 80px;
    }
}
.addCart-content {
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding-top: 20px;
    background: @base_color;
}
.cartModel-text {
    width: 100%;
    padding: 20px;
}
.cartClose {
    width: 66px;
    height: 55px;
    background: url("../../../public/img/icon/common_sprites.png") 0px -50px;
    background-size: 100%;
}
.goodsOp {
    input {
        font-size: 36px;
        border: none;
        width: 60px;
        text-align: center;
    }
    i {
        width: 66px;
        height: 55px;
    }
    .shop_cut {
        background: url("../../../public/img/icon/common_sprites.png") 0px -554px;
        background-size: 100%;
    }
    .shop_add {
        background: url("../../../public/img/icon/common_sprites.png") 0px -620px;
        background-size: 100%;
    }
}
.cartModel-bottom {
    padding: 20px;
    font-size: 24px;
    border-top: 1px solid #ccc;
    text-align: center;
}
.cartModel-addCart {
    background: @theme_background;
    height: 80px;
    color: @base_color;
    line-height: 80px;
    font-size: 28px;
    text-align: center;
}
</style>
