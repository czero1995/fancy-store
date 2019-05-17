<template>
    <div class="page">
        <van-nav-bar :title="$t('m.header.carts')" fixed>
            <van-icon name="edit" slot="right" @click="onEdit" />
        </van-nav-bar>
        <div class="container">
            <nopage ref="nopage" :title="title"></nopage>
            <div>
                <div class="cart-item flex-space" :class="{ selected: itemIndex === cartIndex }" v-for="(cartItem, cartIndex) in cartsData" :key="cartIndex">
                    <div class="flex">
                        <van-checkbox v-model="cartItem.goodsRadio" @change="onGoodsRadio(cartItem)"></van-checkbox>
                        <img class="goods-img" v-lazy="cartItem.imgCover" @click.stop="onDetail(cartItem._id)" />
                        <div class="goods-textBox" @click.stop="onDetail(cartItem._id)">
                            <p class="product_title">{{ cartItem.title }}</p>
                            <div class="goodsOp flex">
                                <van-icon name="diamond-o" @click.stop="onCutCart(cartItem)" />
                                <input type="text" :value="cartItem.num" />
                                <van-icon name="add-o" @click.stop="onAddCart(cartItem)" />
                            </div>
                            <p class="product_price">¥{{ cartItem.priceNow }}</p>
                        </div>
                    </div>
                    <van-icon v-show="showEdit" class="remove" name="delete" @click.stop="onRemove(cartItem, cartIndex)" />
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
import { apiGetCart, apiDeleteCart, apiUpdateCart } from "@/api/cart.js";
import { dataMixin } from "@/mixins/dataMixin.js";
import { NavBar, Checkbox, CheckboxGroup, SubmitBar, Icon, Dialog } from "vant";
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
        [Dialog.name]: Dialog
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

            this.cartsData = res.data.result;

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
            await apiUpdateCart(item._id, "add");
            item.num++;
            this.onCalAllCoach();
        },
        async onCutCart(item) {
            if (item.num > 1) {
                await apiUpdateCart(item._id, "cut");
                item.num--;
                this.onCalAllCoach();
            }
        },
        onCalAllCoach() {
            this.allCoach = 0;
            this.cartsData.forEach(item => {
                item.goodsRadio && (this.allCoach += item.num * item.priceNow);
            });
            this.allCoach = this.allCoach * 100;
        },
        onRemove(item, index) {
            Dialog.confirm({
                message: "确定删除"
            }).then(() => {
                this.sureRemove(item, index);
            });
        },
        async sureRemove(item, index) {
            await apiDeleteCart(item._id);
            this.cartsData.splice(index, 1);
        },
        /*提交订单*/
        onOrder() {
            let orderArr = [];
            this.cartsData.forEach(item => {
                item.goodsRadio && orderArr.push(item);
            });

            if (orderArr.length) {
                this.$router.push({
                    path: "orderwait",
                    query: {
                        status: "todo"
                    }
                });
                this.setOrders(orderArr);
            }
        },
        onEdit() {
            this.showEdit = !this.showEdit;
        },
        /*进入商品详情*/
        onDetail(id) {
            this.$router.push({
                path: "/detail",
                query: {
                    id: id
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
        font-size: 12px;
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
