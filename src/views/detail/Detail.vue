<template>
    <div class="page">
        <van-nav-bar :title="$t('m.header.detail')" left-arrow @click-left="onBack" />

        <div class="container">
            <div>
                <img :src="detailInfo.imgCover" class="goodsImg" @click="onImgPreview(detailInfo.imgCover)" />
                <div class="detail-content">
                    <div class="flex-space">
                        <p class="product_price price">¥{{ detailInfo.priceNow }}</p>
                    </div>
                    <div v-html="detailInfo.detailInfo.content"></div>
                </div>
            </div>
        </div>

        <van-goods-action>
            <van-goods-action-mini-btn icon="cart-o" text="购物车" @click="toCart" />
            <van-goods-action-big-btn text="加入购物车" @click="onCartModel" />
        </van-goods-action>
        <transition name="slide-up">
            <div class="model" v-show="addCartModel" v-cloak>
                <div class="model-content addCart-content" @click.stop="addCartModel = true">
                    <div class="cartModel-box flex">
                        <div class="cartModel-img">
                            <img :src="detailInfo.imgCover" />
                        </div>
                        <div class="cartModel-text">
                            <div class="flex-space">
                                <p class="product_title">{{ detailInfo.title }}</p>
                                <van-icon name="close" @click.stop="addCartModel = false" />
                            </div>

                            <p class="product_price">¥{{ detailInfo.priceNow }}</p>
                        </div>
                    </div>
                    <div @click.stop="onBuy">
                        <p class="cartModel-addCart" v-show="!isBuy">{{ $t("m.carts.addCarts") }}</p>
                        <p class="cartModel-addCart" v-show="isBuy">{{ $t("m.carts.buyNow") }}</p>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import { NavBar, GoodsAction, GoodsActionBigBtn, GoodsActionMiniBtn, ImagePreview, Icon, Toast } from "vant";
import { apiGetDetail } from "@/api/product.js";
import { apiAddCart } from "@/api/cart.js";
export default {
    metaInfo() {
        return {
            title: this.$t("m.meta.detail.title"),
            meta: [
                {
                    name: this.$t("m.meta.detail.name"),
                    content: this.$t("m.meta.detail.content")
                }
            ]
        };
    },
    data() {
        return {
            goodsNum: 1,
            addCartModel: false,
            isBuy: true,
            cartNum: false,
            detailInfo: {}
        };
    },
    components: {
        [NavBar.name]: NavBar,
        [GoodsAction.name]: GoodsAction,
        [GoodsActionBigBtn.name]: GoodsActionBigBtn,
        [GoodsActionMiniBtn.name]: GoodsActionMiniBtn,
        [ImagePreview.name]: ImagePreview,
        [Icon.name]: Icon,
        [Toast.name]: Toast
    },
    mounted() {
        this.getData();
    },
    methods: {
        toCart() {
            this.$router.push("./cart");
        },
        onCartModel() {
            this.addCartModel = true;
            this.isBuy = false;
        },
        async getData() {
            let res = await apiGetDetail(this.$route.query.id);
            this.detailInfo = res.data.result;
            const regex = new RegExp("<img", "gi");
            this.detailInfo.detailInfo.content = this.detailInfo.detailInfo.content.replace(regex, `<img style="width: 100%;"`);
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
        onImgPreview(img) {
            ImagePreview([img]);
        },
        async onBuy() {
            if (this.isBuy) {
                this.setOrders([this.detailInfo]);
                this.$router.push("./orderwait");
            } else {
                if (!this.cartNum) {
                    await apiAddCart(this.$route.query.id);
                    Toast.success(this.$t("m.message.addSuccess"));
                    this.addCartModel = false;
                }
            }
        },
        ...mapMutations({
            setOrders: "SET_ORDERS"
        })
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.container {
    padding-bottom: 80px;
}
.goodsImg {
    width: 100%;
    height: 200px;
}

.detail-content {
    padding: 0 20px;
    margin-top: 10px;
    background: white;
    img {
        max-width: 100%;
    }
}

.detail-bottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: @theme_background;
    color: @base_color;
    font-size: 14px;
    img {
        width: 20px;
        height: 20px;
    }
}

.cartModel-img {
    img {
        width: 80px;
        height: 80px;
    }
}
.addCart-content {
    position: absolute;
    bottom: 0;
    width: 100%;
    box-sizing: border-box;
    padding-top: 10px;
    background: @base_color;
}
.cartModel-text {
    width: 100%;
    padding: 10px;
}
.cartClose {
    width: 33px;
    height: 28px;
    background-size: 100%;
}
.goodsOp {
    input {
        font-size: 18px;
        border: none;
        width: 30px;
        text-align: center;
    }
}
.cartModel-bottom {
    padding: 10px;
    font-size: 12px;
    border-top: 1px solid #ccc;
    text-align: center;
}
.cartModel-addCart {
    background: @theme_background;
    height: 40px;
    color: @base_color;
    line-height: 40px;
    font-size: 14px;
    text-align: center;
}
.price {
    font-size: 15px;
    margin: 20px 0;
}
.wscnph {
    width: 100%;
}
</style>
