<template>
	<transition name="slide-back" >
	<div class="page">
		<headersec></headersec>
		<div class="container">
			<img :src="goods.GoodsImage" class="goodsImg" />
			<div class="detail-content">
				<p class="goods-name">{{$store.state.goods.GoodsName}}</p>
				<p class="goods-price">¥{{$store.state.goods.GoodsPrice}}</p>
			</div>
		</div>

		<div class="detail-bottom flex-align-center flex-around">

			<img src="../../common/img/icon/shop_addCart.png" @click="toCart" />
			<div class="addCart" @click="onCartModel()">
				<span class="tabbar-label">加入购物车</span>
			</div>
			<div class="external addPay" @click="onBuyModel()">
				<span class="tabbar-label">立即购买</span>
			</div>
		</div>

		<transition name="slide-up" >
			<div class="model" v-show="addCartModel" v-cloak>
				<div class="model-content addCart-content" @click.stop="addCartModel=true">
					<div class="cartModel-box flex">
						<div class="cartModel-img">
							<img :src="goods.GoodsImage" />
						</div>
						<div class="cartModel-text">
							<div class="flex-between">
								<p class="goods-name">{{$store.state.goods.GoodsName}}</p>
								<img src="../../common/img/icon/close.png" class="cartClose" @click.stop="addCartModel=false" />
							</div>

							<p class="goods-price">¥{{$store.state.goods.GoodsPrice}}</p>
						</div>

					</div>
					<div class="cartModel-bottom flex-between">
						<p>购买数量</p>
						<div class="goodsOp flex">
							<img src="../../common/img/icon/shop_cut.png" @click="onCutCart()" />
							<input type="text" :value="goodsNum" readonly="" />
							<img src="../../common/img/icon/shop_add.png" @click="onAddCart()" />
						</div>
					</div>
					<div class="cartModel-addCart" v-show="!isBuy">
						加入购物车
					</div>
					<div class="cartModel-addCart" v-show="isBuy">
						立即购买
					</div>
				</div>

			</div>
		</transition>

	</div>
</transition>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Headersec from '../base/HeaderSec.vue';
	export default {
		data(){
			return{
				goodsNum:1,
				addCartModel:false,
				isBuy:true,
			}
		},
		computed: {
			...mapGetters([
				'goods'
			])
		},
		created() {
			console.log(1, this.goods)
		},
		components: {
			Headersec
		},
		methods: {
			toCart() {
				this.$router.push('./cart');
			},
			onCartModel(){
				this.addCartModel=true;
				this.isBuy=false;
			},
			onBuyModel(){
				this.addCartModel=true;
				this.isBuy=true;
			},
			onAddCart() {
				this.goodsNum++;
			},
			onCutCart() {
				if(this.goodsNum > 1) {
					this.goodsNum--;
				}

			},
		}
	}
</script>

<style lang="less" scoped>
	@import '../../common/less/variable.less';
	.detial{
		padding-top: .8rem;
		padding-bottom: .88rem;
	}
	.goodsImg {
		width: 100%;
		height: 5rem;
	}
	
	.detail-content {
		padding-left: .2rem;
		margin-top: .4rem;
	}
	
	.detail-bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: .8rem;
		background: @theme_background;
		color: @base_color;
		font-size: .28rem;
		img {
			width: .4rem;
			height: .4rem;
		}
	}
	.addCart-content{
		top: auto;
		height: auto;
		width: 100%;
		box-sizing: border-box;
		padding-top: .2rem;
		background: @base_color;
	}
	.cartModel-text{
		width: 100%;
		padding: .2rem;
	}
	.goodsOp{
		input{
			font-size: .24rem;
			border: none;
			width: .6rem;
			text-align: center;
		}
		img{
			width: .32rem;
			height: .32rem;
		}
	}
	.cartModel-bottom{
		padding: .2rem;
		font-size: .24rem;
		border-top: 1px solid #ccc;
	}
	.cartModel-addCart{
		background: @theme_background;
		height: .8rem;
		color:@base_color;
		line-height: .8rem;
		font-size: .28rem;
	}
</style>