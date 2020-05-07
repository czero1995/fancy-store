<template>
    <div class="page">
        <van-nav-bar :title="$t('m.header.home')" fixed />

        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <div class="container">
                <van-swipe :autoplay="3000" class="swipe">
                    <van-swipe-item v-for="(bannerItem, bannerIndex) in bannerList" :key="bannerIndex">
                        <img class="swipe_img" v-lazy="bannerItem.img" />
                    </van-swipe-item>
                </van-swipe>
                <div class="product_header">{{ $t("m.product.recommentTitle") }}</div>
                <div class="content flex">
                    <div v-for="(productItem, productIndex) in productList" class="product_item" :key="productIndex" @click.stop="onProductDetail(productItem.uid)">
                        <img v-lazy="productItem.imgCover" alt />
                        <div class="flex-space">
                            <div class="product_item_text overflow_hidden">
                                <div class="product_title">{{ productItem.title }}</div>
                                <div class="product_price flex">
                                    <div><span class="price_pre">¥</span>{{ productItem.priceNow }}</div>
                                </div>
                            </div>
                            <div class="goods-cartBox">
                                <van-icon size="20px" name="cart-o" @click.stop="onAddCart(productItem)" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </van-pull-refresh>
    </div>
</template>

<script>
import { NavBar, Swipe, SwipeItem, PullRefresh, Toast, Icon } from "vant";
import { apiGetProduct, apiGetBanner } from "@/api/product.js";
import { apiAddCart } from "@/api/cart.js";
export default {
    metaInfo() {
        return {
            title: this.$t("m.meta.product.title"),
            meta: [
                {
                    name: this.$t("m.meta.product.name"),
                    content: this.$t("m.meta.product.content")
                }
            ]
        };
    },
    data() {
        return {
            pageNum: 0,
            bannerList: [],
            productList: [],
            isLoading: false
        };
    },
    components: {
        [NavBar.name]: NavBar,
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [PullRefresh.name]: PullRefresh,
        [Toast.name]: Toast,
        [Icon.name]: Icon
    },
    mounted() {
        this.getBannerList();
        this.getProductData();
    },

    methods: {
        async getProductData() {
            let res = await apiGetProduct(this.pageNum, 1);
            this.productList = res.data.data;
            this.isLoading = false;
        },
        onRefresh() {
            this.pageNum = 0;
            this.getProductData();
        },
        async getBannerList() {
            let res = await apiGetBanner();
            this.bannerList = res.data.data;
        },
        onProductDetail(uid) {
            this.$router.push({
                path: "/detail",
                query: {
                    uid: uid
                }
            });
        },
        async onAddCart(item) {
            let res = await apiAddCart(item.uid);
            if (res.data.code === 0) {
                Toast.success({
                    message: this.$t("m.message.addSuccess"),
                    duration: 500
                });
            } else {
                Toast.fail({
                    message: res.data.msg,
                    position: "bottom"
                });
            }
        },
        onCategory(index) {
            this.setTabindex(index);
            this.$router.push("./category");
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.van-pull-refresh {
    overflow: auto;
}
.swiper {
    height: 160px;
}
.swipe_img {
    width: 100%;
    height: 160px;
    margin-top: 46px;
}
.container {
    padding-bottom: 0;
    font-size: 16px;
}
.content {
    flex-wrap: wrap;
    padding-bottom: 52px;
}
.product_header {
    font-size: 14px;
    padding: 5px;
    border-bottom: 1px solid #ccc;
}
.product_item {
    width: 50%;
    box-sizing: border-box;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
    padding-bottom: 4px;
    background: white;
    &:nth-of-type(even) {
        border-right: none;
    }
    img {
        width: 100%;
        height: 180px;
    }
}
.product_item_text {
    color: #666;
    padding: 1px 8px;
    font-size: 13px;
}
.van-icon-cart-o {
    margin-right: 10px;
}
</style>
