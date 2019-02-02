<template>
    <div class="page">
        <message ref="message"></message> <headers :tabname="$t('m.HeaderIndex')"></headers>
        <div class="langBox" @click="changeLang">{{ $t("m.local") }}</div>
        <transition :name="slidename">
            <div class="container" v-show="mainarea">
                <!-- Swiper -->
                <div class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="(bannerItem, bannerIndex) in bannerList" :key="bannerIndex"><img :src="bannerItem.img" /></div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>

                <div class="content" v-cloak>
                    <div v-for="(productItem, productIndex) in productList" class="floorItem" :key="productIndex">
                        <div class="productTop flex-between" @click="onCategory(productIndex)">
                            <p class="productTop-text">{{ productItem.Category.TopText }}</p>
                            <div class="flex-align-center">
                                <p class="productTop-text">{{ productIndex + 1 }}F</p>
                                <i class="arrowImg"></i>
                            </div>
                        </div>
                        <div class="productContent">
                            <div class="productBox flex" ref="div">
                                <div class="productItem" v-for="(goodsItem, goodsIndex) in productItem.SalesProduct" :key="goodsIndex">
                                    <div class="itemBox">
                                        <div @click="onGoodsDetail(goodsItem, goodsItem.CategoryId)">
                                            <img v-lazy="goodsItem.GoodsImage" class="itemImg" />
                                            <div>
                                                <p class="goods-name text-ellipsis">{{ goodsItem.GoodsName }}</p>
                                            </div>
                                        </div>

                                        <div class="addCartBox flex-between">
                                            <p>
                                                <span class="goods-price">¥ {{ goodsItem.GoodsPrice }}</span>
                                            </p>
                                            <i class="goods_cart" @click="onAddCart(goodsItem, goodsItem.GoodsName)" v-show="!goodsItem.shopAddCart"></i>
                                            <i class="goods_cart_select" @click="onAddCart(goodsItem.GoodsName)" v-show="goodsItem.shopAddCart"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <footers :urlRouter="$route.path" :cartnum="cartLength" ref="footer"></footers>
    </div>
</template>

<script>
import Swiper from "swiper";

export default {
    data() {
        return {
            bannerList: [],
            productList: [],
            slidename: "slide-back"
        };
    },
    components: {
        Headers: () => import("../components/Header"),
        Footers: () => import("../components/Footer"),
        Message: () => import("../components/Message")
    },
    mounted() {
        new Swiper(".swiper-container", {
            pagination: ".swiper-pagination",
            paginationClickable: true,
            spaceBetween: 30,
            autoplay: 1500,
            effect: "fade",
            observer: true, //修改swiper自己或子元素时，自动初始化swiper
            observeParents: true //修改swiper的父元素时，自动初始化swiper
        });
        this.getGoodsList();
        this.getBannerList();
        /*判断动画是进还是出*/
        const slideArr = ["category", "cart", "member"];
        slideArr.includes(this.$store.state.comname) ? (this.slidename = "slide-back") : (this.slidename = "slide-go");
        this.setComname("index");
    },

    methods: {
        /*切换语言包 */
        changeLang() {
            this.$i18n.locale == "zh" ? (this.$i18n.locale = "en") : (this.$i18n.locale = "zh");
        },
        /*获取商品列表*/
        async getGoodsList() {
            let res = await this.$http.get("/api/homedata");
            this.productList = res.data.data;
        },
        /*获取轮播列表*/
        async getBannerList() {
            let res = await this.$http.get("/api/bannerdata");
            this.bannerList = res.data.data;
        },
        /*进入商品详情*/
        onGoodsDetail(item, id) {
            this.$router.push({
                path: "/detail",
                query: {
                    id: id
                }
            });
            this.setGoods(item);
        },
        /*添加到购物车*/
        onAddCart(item) {
            if (!this.$store.state.carts.includes(item)) {
                if (!this.$refs.footer.showNum) {
                    this.cartLength = this.$store.state.carts.length + 1;
                    this.$refs.footer.showNum = true;
                    this.setCarts(item);
                }
            } else {
                this.$refs.message.messageShow = true;
            }
        },
        /*前往分类页面*/
        onCategory(index) {
            this.setTabindex(index);
            this.$router.push("./category");
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../public/less/variable.less";
@import "../../public/css/swiper.min.css";
.swiper-slide img {
    width: 100%;
    height: 100%;
}
.container {
    padding-bottom: 0;
}
.productTop {
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
    border-bottom: @base_boder;
    border-top: @base_boder;
    margin-bottom: 20px;
}

.productTop-text {
    font-size: 28px;
}

.arrowImg {
    width: 32px;
    height: 32px;
    background: url("../../public/img/icon/common_sprites.png") -10px -394px;
}
.floorItem:nth-last-child(1) {
    margin-bottom: 88px;
}
.productItem {
    width: 380px;
    box-sizing: border-box;
    margin-bottom: 20px;
    padding: 0 20px;
    flex: 1;
    &:nth-child(odd) {
        margin-right: 2%;
        border-right: 1px solid #ccc;
    }
}

.itemImg {
    width: 100%;
    height: 100%;
}

.addCartBox {
    i {
        width: 40px;
        height: 40px;
        padding-right: 20px;
    }
}

.langBox {
    position: fixed;
    right: 20px;
    top: 20px;
    font-size: 26px;
    z-index: 10;
    color: white;
}
</style>
