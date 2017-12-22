<template>
	<div class="page">
		<headers tabname="零食商店"></headers>
		<tip ref="tip" :goodsname="goodsName"></tip>
		<div class="container">
			<!-- Swiper -->
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="bannerItem in bannerList">
						<img :src="bannerItem.img" />
					</div>
				</div>
				<!-- Add Pagination -->
				<div class="swiper-pagination"></div>
			</div>

			<div class="content" v-cloak>
				<div v-for="(productItem,productIndex) in productList" class="floorItem">

					<div class="productTop flex-between ">
						<p class="productTop-text">{{productItem.Category.TopText}}</p>
						<div class="flex-align-center">
							<p class="productTop-text">{{productIndex+1}}F</p>
							<img src="../common/img/icon/arrowRight.png" class="arrowImg" />
						</div>
					</div>
					<div class="productBox flex flex-wrap" v-cloak>
						<div class="productItem" v-for="goodsItem in productItem.SalesProduct">
							<div class="itemBox">
								<div @click="onGoodsDetail(goodsItem)">
									<img v-lazy="goodsItem.GoodsImage" class="itemImg" />
									<div>
										<p class="goods-name text-ellipsis">{{goodsItem.GoodsName}}</p>
									</div>
								</div>

								<div class="addCartBox flex-between">
									<p><span class="goods-price">¥ {{goodsItem.GoodsPrice}}</span></p>
									<img src="../common/img/icon/shop_addCart.png" @click="onAddCart(goodsItem,goodsItem.GoodsName)" v-show="!goodsItem.shopAddCart" />
									<img src="../common/img/icon/shop_addCart_select.png" @click="onAddCart(goodsItem.GoodsName)" v-show="goodsItem.shopAddCart" />
								</div>

							</div>

						</div>
					</div>
				</div>

			</div>

		</div>

		<footers :urlRouter="$route.path" :cartnum='cartLength' ref="footer"></footers>

	</div>

</template>

<script>
	import Headers from './base/Header.vue';
	import Footers from './base/Footer.vue';
	import Tip from './base/Tip.vue';
	import '../../src/common/css/swiper.min.css';
	import Swiper from '../../src/common/js/swiper.min';
	import { mapGetters } from 'vuex';
	import { mapMutations } from 'vuex';
	
	export default {

		data() {
			return {
				bannerList: [],
				productList: [],
				goodsName: '',
				cartLength:0
			}
		},
		components: {
			Headers,
			Footers,
			Tip
		},
		computed: {
			...mapGetters([
				'this.$store.state.carts'
			])
		},
		mounted() {
			setTimeout(() => {
				var swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					spaceBetween: 30,
				});
			}, 500);
			this.getGoodsList();
			this.getBannerList();
		},
		methods: {
			/*获取商品列表*/
			getGoodsList() {
				const that = this;
				this.$http.get('/api/homedata').then(function(res) {

						that.productList = res.data.data;

					})
					.catch(function(error) {
						console.log(error);
					});
			},
			/*获取轮播列表*/
			getBannerList() {
				const that = this;
				this.$http.get('/api/bannerdata').then(function(res) {
						that.bannerList = res.data.data;
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			onGoodsDetail(item) {
				this.$router.push('/detail');
				this.setGoods(item)
			},
			/*添加到购物车*/
			onAddCart(item, name) {
				this.goodsName = name;
				this.setCarts(item);
				this.cartLength = this.$store.state.carts.length;
				this.$refs.footer.showNum = true;
				setTimeout(()=>{
					this.$refs.footer.showNum = false;
				},2000)
			},
			...mapMutations({
				setGoods: 'SET_GOODS',
				setCarts: 'SET_CARTS',
			})

		}

	}
</script>

<style lang="less" scoped>

	.productTop{
		padding: 0 .2rem;
		height: .6rem;
		line-height: .6rem;
		border-bottom: 1px solid #ccc;
		margin-bottom: .2rem;
	}
	.productTop-text {
		font-size: .28rem;
	}
	
	.arrowImg {
		width: .4rem;
		height: .4rem;
	}
	
	.productItem {
		width: 48%;
		box-sizing: border-box;
		margin-bottom: .4rem;
		&:nth-child(odd) {
			margin-right: 2%;
			border-right: 1px solid #ccc;
		}
	}
	
	.swiper-container {
		height: 2rem;
	}
	
	.swiper-slide img {
		width: 100%;
		height: 100%;
	}
	
	.itemImg {
		width: 100%;
		height: 100%;
	}

	
	.addCartBox {
		img {
			width: .4rem;
			height: .4rem;
			padding-right: .2rem;
		}
	}
</style>