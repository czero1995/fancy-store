<template>
    <div class="page">
        <van-nav-bar :title="$t('m.header.carts')" fixed>
            <van-icon v-if="!showEdit" size="20px" name="edit" slot="right" @click="onEdit" />
            <van-icon v-else size="20px" name="cross" slot="right" @click="showEdit = !showEdit" />
        </van-nav-bar>
        <div class="container">
            <nopage ref="nopage" :title="title"></nopage>
            <div v-if="cartsData.length > 0">
                <div class="cart-item flex-space" :class="{ selected: itemIndex === cartIndex }" v-for="(cartItem, cartIndex) in cartsData" :key="cartIndex">
                    <div class=" flex overflow_hidden">
                        <van-checkbox size="20px" v-model="cartItem.goodsRadio" @change="onGoodsRadio(cartItem)"></van-checkbox>
                        <img class="goods-img" v-lazy="cartItem.productItems.imgCover" @click.stop="onDetail(cartItem.uid)" />
                        <div class="goods-textBox" @click.stop="onDetail(cartItem.uid)">
                            <p class="product_title">{{ cartItem.productItems.title }}</p>
                            <div class="goodsOp flex">
                                <van-icon size="20px" name="delete" @click.stop="onCutCart(cartItem)" />
                                <input type="number" :value="cartItem.num" />
                                <van-icon size="20px" name="add-o" @click.stop="onAddCart(cartItem)" />
                            </div>
                            <p class="product_price"><span class="price_pre">¥</span> {{ cartItem.productItems.priceNow }}</p>
                        </div>
                    </div>
                    <van-icon color="#f44" size="30px" v-show="showEdit" class="remove" name="delete" @click.stop="onRemove(cartItem, cartIndex)" />
                </div>
            </div>
        </div>
        <van-submit-bar :price="allCoach" :button-text="$t('m.carts.submitOrder')" @submit="onOrder">
            <van-checkbox v-model="goodsRadioAll" @click="onSelectAll">全选</van-checkbox>
        </van-submit-bar>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
import { apiGetCart, apiAddCart, apiCutCart, apiDeleteCart } from "@/api/cart.js";
import { dataMixin } from "@/mixins/dataMixin.js";
import { NavBar, Checkbox, CheckboxGroup, SubmitBar, Icon, Dialog, Toast } from "vant";
export default {
    metaInfo() {
        return {
            title: this.$t("m.meta.cart.title"),
            meta: [
                {
                    name: this.$t("m.meta.cart.name"),
                    content: this.$t("m.meta.cart.content")
                }
            ]
        };
    },
    data() {
        return {
            goodsRadioAll: false,
            allCoach: 0,
            radioArr: [],
            itemIndex: "",
            cartsData: [],
            checked: true,
            showEdit: false
        };
    },
    mixins: [dataMixin],
    components: {
        [NavBar.name]: NavBar,
        [Checkbox.name]: Checkbox,
        [CheckboxGroup.name]: CheckboxGroup,
        [SubmitBar.name]: SubmitBar,
        [Icon.name]: Icon,
        [Dialog.name]: Dialog,
        [Toast.name]: Toast
    },

    created() {
        this.getCart();
    },
    mounted() {},
    methods: {
        async getCart() {
            let res = await apiGetCart();
            if (res.data.code == -1) {
                this.title = this.$t("m.login.noLogin");
                setTimeout(() => {
                    this.$refs.nopage.onDisplay();
                    this.$refs.nopage.onLogin();
                }, 300);
                return;
            }

            this.cartsData = res.data.data;

            if (this.cartsData.length == 0) {
                this.title = this.$t("m.carts.noCarts");
                this.$refs.nopage.onDisplay();
            } else {
                this.cartsData.map(item => {
                    typeof item.goodsRadio == "undefined" && this.$set(item, "goodsRadio", false);
                });
            }
        },
        onGoodsRadio() {
            this.radioArr = [];
            this.cartsData.forEach(itemGoods => {
                this.radioArr.push(itemGoods.goodsRadio);
            });
            this.radioArr.indexOf(false) == -1 ? (this.goodsRadioAll = true) : (this.goodsRadioAll = false);
            this.onCalAllCoach();
        },
        onSelectAll() {
            !this.goodsRadioAll
                ? this.cartsData.forEach(item => {
                      item.goodsRadio = true;
                  })
                : this.cartsData.forEach(item => {
                      item.goodsRadio = false;
                  });
            this.onCalAllCoach();
        },
        async onAddCart(item) {
            let res = await apiAddCart(item.productId);
            if (res.data.code === 0) {
                Toast.success({
                    message: this.$t("m.message.addSuccess"),
                    duration: 500
                });
                item.num++;
            } else {
                Toast.fail({
                    message: res.data.msg,
                    position: "bottom"
                });
            }

            this.onCalAllCoach();
        },
        async onCutCart(item) {
            if (item.num > 1) {
                let res = await apiCutCart(item.productId, "cut");
                if (res.data.code === 0) {
                    Toast.success(this.$t("m.carts.cutSuccess"));
                    item.num--;
                } else {
                    Toast.fail(res.data.msg);
                }
                this.onCalAllCoach();
            }
        },
        onCalAllCoach() {
            this.allCoach = 0;
            this.cartsData.forEach(item => {
                item.goodsRadio && (this.allCoach += item.num * item.productItems.priceNow);
            });
            this.allCoach = this.allCoach * 100;
        },
        onRemove(item, index) {
            Dialog.confirm({
                message: this.$t("m.message.deleteSure")
            }).then(() => {
                this.sureRemove(item, index);
            });
        },
        async sureRemove(item, index) {
            const res = await apiDeleteCart(item.productId);
            res.data.code === 0 && this.cartsData.splice(index, 1);
        },
        /*提交订单*/
        onOrder() {
            let orderArr = [];
            this.cartsData.forEach(item => {
                item.goodsRadio && orderArr.push(item);
            });

            if (!orderArr.length) {
                return Toast.fail(this.$t("m.order.choiceConfirm"));
            }
            this.$router.push({
                path: "orderwait",
                query: {
                    status: "todo"
                }
            });
            this.setOrders(orderArr);
        },
        onEdit() {
            this.showEdit = !this.showEdit;
        },
        /*进入商品详情*/
        onDetail(uid) {
            this.$router.push({
                path: "/detail",
                query: {
                    uid
                }
            });
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
    padding-top: 40px;
    padding-bottom: 90px;
}
.cart-item {
    border-bottom: 1px solid #cccccc;
    height: 120px;
    padding: 0 10px;
    background: white;
}

.goods-img {
    margin-right: 10px;
    width: 100px;
    height: 100px;
    margin-left: 10px;
}

.goods-coach {
    color: red;
    align-self: flex-end;
}

.goodsOp {
    margin: 20px 0;
    input {
        border: none;
        font-size: 14px;
        text-align: center;
        width: 30px;
    }
}

.cartBottom-detail {
    line-height: 60px;
    font-size: 14px;
    width: 100%;
    position: absolute;
    bottom: 40px;
    padding-left: 10px;
    box-sizing: border-box;
    color: @theme_color;
    background: white;
    border-top: 1px solid #ccc;
}

.subminCart {
    padding-right: 20px;
}
.van-submit-bar {
    bottom: 50px;
}
.van-submit-bar__bar {
    padding-left: 10px;
}
</style>
