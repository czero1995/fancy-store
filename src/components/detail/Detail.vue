<template>

	<div class="page">
		<headersec tabname="商品详情"></headersec>
		<transition :name="slidename" >
		<div class="container" v-show="mainarea">
			<div v-show="!havePage">
				<nopage></nopage>
			</div>
			<div v-show="havePage">
				<img :src="$store.state.goods.GoodsImage" class="goodsImg" />
			<div class="detail-content">
				<p class="goods-name">{{$store.state.goods.GoodsName}}</p>
				<p class="goods-price">¥{{$store.state.goods.GoodsPrice}}</p>
			</div>
		</div>

	</div>
		</transition>
	<div class="detail-bottom flex-align-center flex-around">
			<div class="toCart">
				<img src="../../../static/img/icon/cart_white.png" @click="toCart" />
				<transition name="bullet" >
					<p v-show="cartNum">{{cartLength}}</p>
				</transition>
			</div>

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
							<img :src="$store.state.goods.GoodsImage" />
						</div>
						<div class="cartModel-text">
							<div class="flex-between">
								<p class="goods-name">{{$store.state.goods.GoodsName}}</p>
								<img src="../../../static/img/icon/close.png" class="cartClose" @click.stop="addCartModel=false" />
							</div>

							<p class="goods-price">¥{{$store.state.goods.GoodsPrice}}</p>
						</div>

					</div>
					<div class="cartModel-bottom flex-between">
						<p>购买数量</p>
						<div class="goodsOp flex">
							<img src="../../../static/img/icon/shop_cut.png" @click="onCutCart()" />
							<input type="text" :value="goodsNum" readonly="" />
							<img src="../../../static/img/icon/shop_add.png" @click="onAddCart()" />
						</div>
					</div>
					<div @click.stop="onBuy">
					<p class="cartModel-addCart"  v-show="!isBuy">
						加入购物车
					</p>
					<p class="cartModel-addCart" v-show="isBuy">
						立即购买
					</p>
					</div>
				</div>

			</div>
		</transition>

	</div>

</template>

<script>
	import Headersec from '../base/HeaderSec.vue';
	import Nopage from '../base/NoPage.vue';
	import { mapGetters,mapMutations } from 'vuex';
	export default {
		data(){
			return{
				goodsNum:1,
				addCartModel:false,
				isBuy:true,
				havePage:false,
				cartLength:'',
				cartNum:false,
				mainarea:false,
				slidename:'slide-go'
			}
		},
		computed: {
			...mapGetters([
				'this.$store.state.goods',
				'this.$store.state.carts',
				'this.$store.state.comname'
			])
		},
		mounted(){
			this.mainarea=true;
			if(this.$store.state.goods === undefined){
				this.havePage = false;

			}else{
				this.havePage = true;
			}
			if(this.$store.state.carts != undefined ){
				this.cartLength = this.$store.state.carts.length;
			}
			/*拿到路由跳转的id*/
			 const id = this.$route.query.id;
			 /*判断动画是进还是出*/
			if(this.$store.state.comname === 'orderwait' || this.$store.state.comname === 'cart'){
				this.slidename='slide-back';
			}else{
				this.slidename='slide-go'
			}
			this.setComname('goodsdetail');

		},
		components: {
			Headersec,
			Nopage
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
			onBuy(){
				const that = this;
				if(this.isBuy){
					let orderArr = [];
					orderArr.push(this.$store.state.goods)
					this.setOrders(orderArr);
					this.$router.push('./orderwait')
				}else{
					if(!this.cartNum){
						this.setCarts(this.$store.state.goods);
						this.addCartModel=false;
						this.cartNum=true;
						this.cartLength = this.cartLength+1;
						setTimeout(()=>{
							this.cartNum=false;
						},2000)
					}


				}

			},
			...mapMutations({
				setOrders: 'SET_ORDERS',
				setCarts: 'SET_CARTS',
				setComname: 'SET_COMNAME'
			})
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../static/less/variable.less';
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
	.toCart{
		position: relative;
		p{
			position: absolute;
			text-align: center;
			top: -.2rem;
			right: -.2rem;
			background: @base_color;
			color:@theme_background;
			width: .4rem;
			height: .4rem;
			line-height: .4rem;
			border-radius: .8rem;
		}
	}
	.addCart-content{
		position: absolute;
		bottom: 0;
		width: 100%;
		box-sizing: border-box;
		padding-top: .2rem;
		background: @base_color;
	}
	.cartModel-text{
		width: 100%;
		padding: .2rem;
	}
	.cartClose{
		width: .4rem;
		height: .4rem;
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
		text-align: center;
	}
	.cartModel-addCart{
		background: @theme_background;
		height: .8rem;
		color:@base_color;
		line-height: .8rem;
		font-size: .28rem;
		text-align: center;
	}
</style>
