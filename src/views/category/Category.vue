<template>
    <div class="page">
        <van-nav-bar :title="$t('m.header.category')" fixed />
        <div class="container flex" id="container">
            <van-tabs @click="onBar" animated sticky>
                <van-tab :title="menuItem.title" v-for="(menuItem, menuIndex) in menuList" :key="menuIndex">
                    <div class="rightItem" v-for="(categoryItem, categoryIndex) in categoryList" @click="onDetail(categoryItem._id)" :key="categoryIndex">
                        <div class="category-item flex">
                            <div class="item flex detail-item">
                                <img class="goods-img" v-lazy="categoryItem.imgCover" />
                                <div>
                                    <p class="product_title">{{ categoryItem.title }}</p>
                                    <p class="product_price">¥{{ categoryItem.priceNow }}</p>
                                    <van-icon name="cart-o" @click.stop="onAddCart(categoryItem)" />
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
            type: "热门"
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
        this.getCategoryList();
    },
    methods: {
        async getMenuList() {
            let res = await apiGetCategoryMenu();
            this.menuList = res.data.result;
        },
        async getCategoryList() {
            let res = await apiGetProduct(this.pageNum, this.type);
            this.categoryList = res.data.result;
        },
        onBar(index, title) {
            this.type = title;
            this.getCategoryList();
        },
        async onAddCart(item) {
            let res = await apiAddCart(item._id);
            if (res.data.code == 1) {
                Toast.success(this.$t("m.message.addSuccess"));
            }
        },
        onDetail(id) {
            this.$router.push({
                path: "/detail",
                query: {
                    id: id
                }
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
