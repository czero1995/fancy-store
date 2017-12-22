<template>
	<div class="page">
		<headers tabname="购物车"></headers>
		
		<div class="container">
		<div v-show="!havePage">
			<nopage></nopage>
		</div>
		<div v-show="havePage">
			<div class="cart-item flex-align-center" v-for="cartItem in $store.state.carts" v-cloak>
				<div class="goods-radio" @click="onGoodsRadio(cartItem)">
					<img src="../../common/img/icon/radio.png" v-show="!cartItem.goodsRadio" />
					<img src="../../common/img/icon/radio_select.png" v-show="cartItem.goodsRadio" />
				</div>
				<div class="flex">
					<div class="goods-img">
						<img :src="cartItem.GoodsImage" />
					</div>
					<div class="goods-textBox">
						<p class="goods-name">{{cartItem.GoodsName}}</p>
						<div class="goodsOp flex">
							<img src="../../common/img/icon/shop_cut.png" @click.stop="onCutCart(cartItem)" />
							<input type="text" :value="cartItem.GoodsNum" />
							<img src="../../common/img/icon/shop_add.png" @click.stop="onAddCart(cartItem)" />
						</div>
						<p class="goods-coach">¥{{cartItem.GoodsPrice}}</p>
					</div>
				</div>
			</div>
			
		</div>
		</div>
		<div class="cartBottom-detail flex-between" v-show="carts" v-cloak >
				<div class="flex">
					<div class="shopRadio" @click="onSelectAll()">
						<img src="../../common/img/icon/radio.png" v-show="!goodsRadioAll" />
						<img src="../../common/img/icon/radio_select.png" v-show="goodsRadioAll" />
					</div>
					<div class="bottom-left">
						<p>合计: <span class="shopCoach">¥{{allCoach}}</span> </p>
					</div>
				</div>

				<div class="subminCart" @click="onOrder">
					<p>提交订单</p>
				</div>
			</div>
		<footers :urlRouter="$route.path"></footers>
	</div>

</template>

<script>
	import Headers from '../base/Header.vue';
	import Footers from '../base/Footer.vue';
	import Tip from '../base/Tip.vue';
	import Nopage from '../base/NoPage.vue';
	import { mapGetters } from 'vuex';
	import { mapMutations } from 'vuex';
	export default {
		data() {
			return {
				goodsRadioAll: false,
				allCoach: 0,
				radioArr: [],
				havePage:false
			}

		},
		components: {
			Headers,
			Footers,
			Tip,
			Nopage
		},
		computed: {
			...mapGetters([
				'carts'
			])
		},
		created() {
			console.log(1, this.carts)
		},
		mounted() {
			const that = this;
			if(that.carts === undefined){
				that.havePage = false;
				
			}else{
				that.havePage = true;
				that.carts.forEach(function(item) {
					
					if(typeof item.goodsRadio == 'undefined') {
						that.$set(item, "goodsRadio", false);
					}
				})
			}
			
		},
		methods: {
			onGoodsRadio(item) {
				const that = this;
				that.radioArr = [];
				item.goodsRadio = !item.goodsRadio;
				that.carts.forEach(function(itemGoods) {
					that.radioArr.push(itemGoods.goodsRadio);
				});
				if(that.radioArr.indexOf(false) == -1) {
					that.goodsRadioAll = true;
				} else {
					that.goodsRadioAll = false;
				}
				that.onCalAllCoach();

			},
			onSelectAll() {
				this.goodsRadioAll = !this.goodsRadioAll;
				if(this.goodsRadioAll) {
					this.carts.forEach(function(item) {
						item.goodsRadio = true;

					})
				} else {
					this.carts.forEach(function(item) {
						item.goodsRadio = false;
					})
				}
				this.onCalAllCoach();
			},
			onAddCart(item) {
				item.GoodsNum++;
				this.onCalAllCoach();
			},
			onCutCart(item) {
				if(item.GoodsNum > 1) {
					item.GoodsNum--;
					this.onCalAllCoach();
				}

			},
			onCalAllCoach() {
				const that = this;
				that.allCoach = 0;
				that.carts.forEach(function(item) {
					if(item.goodsRadio) {
						that.allCoach += item.GoodsNum * item.GoodsPrice;
					}
				})
			},
			onOrder(){
				let orderArr=[];
				this.carts.forEach(function(item) {
					if(item.goodsRadio) {
						orderArr.push(item);
					}
				});
				this.$router.push('orderwait')
				this.setOrders(orderArr);
			},
			...mapMutations({
				setOrders: 'SET_ORDERS',
			})
		}

	}
</script>

<style lang="less" scoped>
	@import '../../common/less/variable.less';
	.container{
		padding-bottom: 1.6rem;
	}
	.cart-item {
		border-bottom: 1px solid #CCCCCC;
		margin-bottom: .2rem;
		padding-top: .2rem;
		padding-bottom: .2rem;
	}
	
	.goods-radio {
		margin: 0 .2rem;
	}
	
	.goods-img {
		margin-right: .2rem;
	}
	
	.goods-name {
		font-size: .28rem;
	}
	
	.goods-coach {
		font-size: .24rem;
		color: red;
		align-self: flex-end;
	}
	
	.goodsOp {
		margin: .4rem 0;
		img {
			width: .34rem;
			height: .34rem;
		}
		input {
			border: none;
			font-size: .28rem;
			text-align: center;
			width: .6rem;
		}
	}
	
	.cartBottom-detail {
		height: .8rem;
		line-height: .8rem;
		font-size: .28rem;
		width: 100%;
		position: fixed;
		bottom: .8rem;
		color: @base_color;
		background: @theme_background;
		img {
			vertical-align: middle;
			margin: 0 .2rem;
			width: .3rem;
			height: .3rem;
		}
	}
	
	.subminCart {
		padding-right: .2rem;
	}
</style>