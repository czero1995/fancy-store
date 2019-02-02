<template>
    <div class="page">
        <message ref="message"></message> <headers :tabname="$t('m.HeaderCategoty')"></headers>
        <transition :name="slidename">
            <div class="container flex" id="container" v-show="mainarea" v-cloak>
                <div class="leftbar">
                    <div class="barItem" v-for="(menuItem, menuIndex) in menuList" :key="menuIndex">
                        <p :class="{ active: menuIndex === $store.state.tabindex }" class="menu-text" @click="onBar(menuIndex)">{{ menuItem.cat_name }}</p>
                    </div>
                </div>
                <div class="rightContent">
                    <div class="rightItem" v-for="(categoryItem, categoryIndex) in categoryContent.cart" @click="onDetail(categoryItem)" :key="categoryIndex">
                        <div class="category-item flex">
                            <div class="item flex detail-item">
                                <div class="goods-img"><img v-lazy="categoryItem.GoodsImage" /></div>
                                <div class="goods-textBox">
                                    <p class="goods-name">{{ categoryItem.GoodsName }}</p>
                                    <p class="goods-coach">¥{{ categoryItem.GoodsPrice }}</p>
                                    <div class="goods-cartBox"><i class="goods_cart" @click.stop="onAddCart(categoryItem)"></i></div>
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
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            menuList: [],
            categoryList: [],
            categoryContent: [],
            slidename: "slide-back"
        };
    },
    components: {
        Headers: () => import("../../components/Header"),
        Footers: () => import("../../components/Footer"),
        Message: () => import("../../components/Message")
    },
    computed: {
        ...mapGetters(["carts", "this.$store.state.tabindex"])
    },
    mounted() {
        /*判断动画是进还是出*/
        this.$store.state.comname == "index" ? (this.slidename = "slide-go") : (this.slidename = "slide-back");
        this.setComname("category");
        this.$store.state.tabindex == undefined && this.setTabindex(0);
        this.getMenuList();
        this.getCategoryList();
    },
    methods: {
        /*获取分类栏目*/
        async getMenuList() {
            let res = await this.$http.get("/api/menudata");
            this.menuList = res.data.data;
        },
        /*获取分类列表*/
        async getCategoryList() {
            let res = await this.$http.post("/api/categorydata");
            this.categoryList = res.data.data;
            this.categoryContent = this.categoryList[0];
        },
        /*切换分类*/
        onBar(index) {
            this.setTabindex(index);
            this.categoryContent = this.categoryList[this.$store.state.tabindex];
        },
        /*添加购物车*/
        onAddCart(item) {
            if (!this.$store.state.carts.includes(item)) {
                if (!this.$refs.footer.showNum) {
                    this.setCarts(item);
                    this.cartLength = this.$store.state.carts.length;
                    this.$refs.footer.showNum = true;
                }
            } else {
                this.$refs.message.messageShow = true;
            }
        },
        /*进入商品详情*/
        onDetail(item) {
            this.$router.push("/detail");
            this.setGoods(item);
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.category {
    padding-top: 80px;
    padding-bottom: 88px;
}

.leftbar {
    position: fixed;
    left: 0;
    width: 180px;
    font-size: 28px;
    text-align: center;
    height: 88%;
    border-right: 1px solid #ccc;
}

.barItem {
    height: 80px;
    line-height: 80px;
    border-bottom: 1px solid #ccc;
}

.rightContent {
    flex: 1;
    margin-left: 180px;
}

.rightItem:nth-last-child(1) {
    padding-bottom: 90px;
}

.active.menu-text {
    background: @theme_background;
    color: @base_color;
}

.category-item {
    padding: 20px 0;
    border-bottom: 1px solid #ccc;
}

.detail-item {
    width: 100%;
}

.goods-textBox {
    width: 100%;
}

.goods-img {
    margin-right: 20px;
    width: 400px;
    height: 200px;
    img {
        width: 100%;
        height: 100%;
    }
}

.goods-name {
    font-size: 28px;
}

.goods-coach {
    font-size: 26px;
    color: red;
    margin: 20px 0;
}

.goods-cartBox {
    margin-right: 40px;

    i {
        display: inline-block;
        width: 60px;
        height: 40px;
        background: url("../../../public/img/icon/common_sprites.png") -3px -73px; /* no */
        background-size: 100%;
    }
}
</style>
