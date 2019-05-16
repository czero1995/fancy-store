<template>
    <div class="page orderpage container">
        <van-nav-bar :title="$t('m.header.myOrder')" left-arrow @click-left="onBack">
            <van-icon name="edit" slot="right" @click="onEdit" />
        </van-nav-bar>

        <van-tabs v-model="active" animated @click="onBar">
            <van-tab :title="item.name" v-for="(item, index) in orderTab" :key="index">
                <div class="order_item" v-for="(itemPay, itemIndex) in orderData" :key="itemIndex" @click="onOrderDetail(itemPay)">
                    <div>
                        <div class="order-top flex-space">
                            <p class="order_num">{{ $t("m.order.orderNum") }}:{{ itemPay._id }}</p>
                            <van-tag :type="itemPay.color">{{ translateStatus(itemPay.status) }}</van-tag>
                        </div>
                        <div class="order-content flex-space">
                            <div class="flex">
                                <div class="flex" v-for="(itemProduct, indexProduct) in itemPay.products" :key="indexProduct">
                                    <img class="order-img" :src="itemProduct.imgCover" />
                                </div>
                            </div>
                            <van-icon v-show="showEdit" class="remove" name="delete" @click.stop="onRemove(itemPay._id, itemIndex)" />
                        </div>
                    </div>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { apiGetOrder, apiDeleteOrder } from "@/api/order.js";
import { NavBar, Tab, Tabs, Toast, Icon, Tag, Dialog } from "vant";
import { dataMixin } from "@/mixins/dataMixin.js";

export default {
    metaInfo() {
        return {
            title: this.$t("m.meta.order.title"),
            meta: [
                {
                    name: this.$t("m.meta.order.name"),
                    content: this.$t("m.meta.order.content")
                }
            ]
        };
    },
    data() {
        return {
            havePage: false,
            orderData: [],
            type: "paying",
            active: 0,
            orderTab: [{ name: this.$t("m.order.paying") }, { name: this.$t("m.order.waitPack") }, { name: this.$t("m.order.done") }, { name: this.$t("m.order.all") }],
            title: "",
            showEdit: false
        };
    },
    mixins: [dataMixin],
    components: {
        [NavBar.name]: NavBar,
        [Tab.name]: Tab,
        [Tabs.name]: Tabs,
        [Toast.name]: Toast,
        [Icon.name]: Icon,
        [Tag.name]: Tag,
        [Dialog.name]: Dialog
    },
    computed: {
        ...mapGetters(["this.$store.state.orderStatus"])
    },
    created() {
        switch (this.$store.state.orderStatus) {
            case "paying":
                this.active = 0;
                this.type = "paying";
                break;
            case "payed":
                this.active = 1;
                this.type = "payed";
                break;
            case "done":
                this.active = 2;
                this.type = "done";
                break;
            case "":
                this.active = 3;
                this.type = "";
                break;
        }
    },
    mounted() {
        this.getOrder();
    },
    methods: {
        onOrderDetail(item) {
            this.setOrders(item);
            this.$router.push({
                path: "orderwait",
                query: {
                    status: item.status,
                    data: item
                }
            });
        },

        onRemove(id, index) {
            Dialog.confirm({
                message: this.$t("m.message.deleteSure")
            }).then(() => {
                this.sureRemove(id, index);
            });
        },

        async sureRemove(id, index) {
            await apiDeleteOrder(id);
            this.orderData.splice(index, 1);
        },

        async getOrder() {
            let res = await apiGetOrder(this.type);
            this.orderData = res.data.result.map(item => {
                if (item.status == "payed") {
                    item.color = "success";
                } else if (item.status == "paying") {
                    item.color = "danger";
                } else if (item.status == "done") {
                    item.color = "";
                }
                return item;
            });
            this.orderData.length == 0 ? Toast(this.$t("m.order.noOrderState")) : Toast.clear();
        },
        onBar(index, title) {
            console.log("title", title);
            switch (title) {
                case "待付款":
                    this.type = "paying";
                    this.setOrderStatus(this.type);
                    break;
                case "待收货":
                    this.type = "payed";
                    this.setOrderStatus(this.type);
                    break;
                case "已完成":
                    this.type = "done";
                    this.setOrderStatus(this.type);
                    break;
                case "全部":
                    this.type = "";
                    this.setOrderStatus(this.type);
                    break;
            }
            this.getOrder();
        },

        onEdit() {
            this.showEdit = !this.showEdit;
        },

        translateStatus(val) {
            switch (val) {
                case "payed":
                    return this.$t("m.order.payed");
                case "paying":
                    return this.$t("m.order.paying");
                case "done":
                    return this.$t("m.order.done");
                case "waitPack":
                    return this.$t("m.order.waitPack");
            }
        },
        ...mapMutations({
            setOrders: "SET_ORDERS",
            setOrderStatus: "SET_ORDERS_STATUS"
        })
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";

.order_item {
    border-bottom: 1px solid #ccc;
    height: 100px;
    padding-top: 10px;
    background: white;
}

.order-top {
    font-size: 14px;
    line-height: 20px;
    padding: 0 10px;
}
.order-content {
    padding: 0 10px;
}
.order-img {
    width: 60px;
    height: 60px;
    margin-right: 20px;
}
.van-tabs__track {
    text-align: center;
    margin: 0 auto;
}
.van-tabs--line {
    width: 100%;
}
.order_num {
    flex: 1;
}
</style>
