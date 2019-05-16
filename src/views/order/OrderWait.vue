<template>
    <div class="page">
        <van-nav-bar :title="$t('m.header.orderDetail')" left-arrow @click-left="onBack" />

        <div class="container">
            <div>
                <div class="address_show" @click="onAddressChoose">
                    <div v-if="addressInfo == undefined">
                        <van-cell :title="$t('m.order.chooseAddress')" is-link />
                    </div>
                    <div v-else>
                        <div class="flex-space">
                            <div>{{ addressInfo.name }}</div>
                            <div>{{ addressInfo.tel }}</div>
                        </div>
                        <div>{{ addressInfo.address }}</div>
                    </div>
                </div>
                <van-popup v-model="showList" position="bottom">
                    <van-contact-list v-model="chosenContactId" :list="addressData" @add="onAdd" @edit="onEdit" @select="onSelect" />
                </van-popup>
                <van-card v-for="(orderItem, orderIndex) in orderData" :key="orderIndex" :num="orderItem.num" :price="orderItem.priceNow" :title="orderItem.title" :thumb="orderItem.imgCover" />
                <van-submit-bar v-if="$route.query.status == 'todo'" :price="allCoach" :button-text="$t('m.order.submitOrder')" @submit="onOrder" />
                <van-submit-bar v-if="$route.query.status == 'paying'" :price="allCoach" :button-text="$t('m.order.pay')" @submit="onPay" />
                <van-submit-bar v-if="$route.query.status == 'payed'" :price="allCoach" :button-text="$t('m.order.confirmPack')" @submit="onDone" />
                <van-submit-bar v-if="$route.query.status == 'done'" :price="allCoach" :button-text="$t('m.order.done')" disabled />
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { apiAddOrder, apiUpdateOrder } from "@/api/order.js";
import { apiDeleteCart } from "@/api/cart.js";

import { apiGetAddress } from "@/api/address.js";
import { NavBar, Dialog, Popup, Card, SubmitBar, Cell, CellGroup, ContactList, Toast } from "vant";
export default {
    metaInfo() {
        return {
            title: this.$t("m.meta.orderwait.title"),
            meta: [
                {
                    name: this.$t("m.meta.orderwait.name"),
                    content: this.$t("m.meta.orderwait.content")
                }
            ]
        };
    },
    data() {
        return {
            chosenContactId: null,
            editingContact: {},
            showList: false,
            showEdit: false,
            isEdit: false,
            list: [
                {
                    name: "张三",
                    tel: "13000000000",
                    id: 0
                }
            ],
            allCoach: 0,
            havePage: false,
            productId: [],
            addressData: [],
            orderData: [],
            addressInfo: {}
        };
    },
    components: {
        [NavBar.name]: NavBar,
        [Dialog.name]: Dialog,
        [Popup.name]: Popup,
        [Card.name]: Card,
        [SubmitBar.name]: SubmitBar,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [ContactList.name]: ContactList,
        [Toast.name]: Toast
    },
    computed: {
        cardType() {
            return this.chosenContactId !== null ? "edit" : "add";
        },

        currentContact() {
            const id = this.chosenContactId;
            return id !== null ? this.list.filter(item => item.id === id)[0] : {};
        },
        ...mapGetters(["this.$store.state.orders", "this.$store.state.address", "this.$store.state.addressStatus"])
    },
    created() {},
    mounted() {
        this.getAddress();
        if (this.$route.query.status == "todo") {
            this.$store.state.orders.forEach(item => {
                this.allCoach += item.priceNow * item.num;
                this.allCoach = this.allCoach * 100;
                this.productId.push({ id: item._id, num: item.num });
            });
            this.addressInfo = this.$store.state.address;
            this.orderData = this.$store.state.orders;
        } else {
            this.addressInfo = this.$store.state.orders.address;
            this.$store.state.orders.products.forEach(item => {
                this.allCoach += item.priceNow * item.num;
                this.allCoach = this.allCoach * 100;
                this.productId.push({ id: item._id, num: item.num });
            });
            this.orderData = this.$store.state.orders.products;
        }
    },

    methods: {
        onAddressChoose() {
            this.showList = true;
        },
        onAdd() {
            this.setAddressStatus("orderWait");
            this.$router.push("./addaddress");
        },

        onEdit(item) {
            this.$router.push({
                path: "./addaddress",
                query: {
                    state: "edit",
                    item: item
                }
            });
        },
        onSelect(item) {
            this.showList = false;
            this.addressInfo = item;
        },
        onSave(info) {
            this.showEdit = false;

            if (this.isEdit) {
                this.list = this.list.map(item => (item.id === info.id ? info : item));
            } else {
                this.list.push(info);
            }
            this.chosenContactId = info.id;
        },
        async getAddress() {
            let res = await apiGetAddress();
            this.addressData = res.data.result;
        },
        onOrder() {
            Dialog.confirm({
                message: this.$t("m.order.orderConfirm")
            })
                .then(() => {
                    this.addOrder("payed");
                    // on confirm
                })
                .catch(() => {
                    // on cancel
                    this.addOrder("paying");
                });
        },
        async onDone() {
            await apiUpdateOrder(this.$store.state.orders._id, "done");
            Toast(this.$t("m.order.orderDone"));
            this.setOrderStatus("done");
            this.onBack();
        },
        async onPay() {
            console.log("this.$store.state.orders._id", this.$store.state.orders._id);
            await apiUpdateOrder(this.$store.state.orders._id, "payed");
            Toast(this.$t("m.order.orderPayed"));
            this.onBack();
        },
        async addOrder(status) {
            await apiAddOrder(this.productId, this.addressInfo, this.allCoach, status);
            await apiDeleteCart(this.productId);
            this.setOrderStatus(status);
            if (status == "payed") {
                setTimeout(() => {
                    this.$router.replace({
                        path: "/order"
                    });
                }, 1000);
            } else {
                this.$router.push({
                    path: "/order"
                });
            }
        },
        ...mapMutations({
            setOrderStatus: "SET_ORDERS_STATUS",
            setAddressStatus: "SET_ADDRESS_STATUS"
        })
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.address_show {
    background: white;
    padding: 10px;
}
.van-card__title {
    margin-bottom: 20px;
    font-size: 15px;
    margin-top: 10px;
}
.van-card__price {
    font-size: 13px;
}
.orderItem {
    padding: 10px;
    border-bottom: 1px solid #ccc;
}

.goodsImg {
    width: 100px;
    height: 100px;
}

.orderBottom {
    position: fixed;
    bottom: 0;
    background: @theme_background;
    width: 100%;
    color: @base_color;
    font-size: 14px;
    line-height: 40px;
    padding: 0 10px;
    box-sizing: border-box;
}
</style>
