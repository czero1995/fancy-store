<template>
    <div class="page">
        <van-nav-bar :title="$t('m.header.category')" fixed />
        <div class="container flex" id="container">
            <van-tabs @click="onBar" animated sticky>
                <van-tab :title="menuItem.title" v-for="(menuItem, menuIndex) in menuList" :key="menuIndex">
                    <div class="rightItem" v-for="(categoryItem, categoryIndex) in categoryList" @click="onDetail(categoryItem.uid)" :key="categoryIndex">
                        <div class="category-item flex">
                            <div class="item flex overflow_hidden">
                                <img class="goods-img" v-lazy="categoryItem.imgCover" />
                                <div>
                                    <p class="product_title">{{ categoryItem.title }}</p>
                                    <p class="product_price"><span class="price_pre">¥</span> {{ categoryItem.priceNow }}</p>
                                    <van-icon size="20px" name="cart-o" @click.stop="onAddCart(categoryItem)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </van-tab>
            </van-tabs>
        </div>
    </div>
</template>

<script>
import { apiGetProduct } from "@/api/product.js";
import { apiGetCategoryMenu } from "@/api/category.js";
import { apiAddCart } from "@/api/cart.js";
import { dataMixin } from "@/mixins/dataMixin.js";
import { NavBar, Tab, Tabs, Toast, Icon } from "vant";
export default {
    metaInfo() {
        return {
            title: this.$t("m.meta.category.title"),
            meta: [
                {
                    name: this.$t("m.meta.category.name"),
                    content: this.$t("m.meta.category.content")
                }
            ]
        };
    },
    data() {
        return {
            menuList: [],
            categoryList: [],
            categoryContent: [],
            pageNum: 0,
            type: ""
        };
    },
    mixins: [dataMixin],
    components: {
        [NavBar.name]: NavBar,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Toast.name]: Toast,
        [Icon.name]: Icon
    },
    computed: {},

    mounted() {
        this.getMenuList();
        // this.getCategoryList();
    },
    methods: {
        async getMenuList() {
            let res = await apiGetCategoryMenu();
            this.menuList = res.data.data.slice(1);
            console.log("menuList: ", this.menuList);
            this.type = this.menuList[0].title;
            this.getCategoryList();
        },
        async getCategoryList() {
            let res = await apiGetProduct(this.pageNum, this.type);
            this.categoryList = res.data.data;
        },
        onBar(index, title) {
            this.type = title;
            this.getCategoryList();
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
        onDetail(uid) {
            this.$router.push({
                path: "/detail",
                query: { uid }
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.container {
    display: flex;
    align-items: flex-start;
    padding-top: 40px;
    // padding-bottom: 52px;
}
.van-tab__pane {
    padding-bottom: 52px;
}
.van-nav-bar {
    z-index: 1000 !important;
}
.category-item {
    border-bottom: 1px solid #ccc;
    height: 110px;
    width: 100%;
    background: white;
}

.goods-img {
    margin-right: 10px;
    width: 120px;
    height: 100px;
}
.product_price {
    margin: 10px 0;
}

.van-tabs--line {
    width: 100%;
}
</style>
