<template>

	<div class="page">
		<message ref="message"></message>
		<headers tabname="零食商店"></headers>
		<transition :name="slidename">
			<div class="container" v-show="mainarea">
				<!-- Swiper -->
				<div class="swiper-container">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="bannerItem in bannerList">
							<img :src="bannerItem.img" />
						</div>
					</div>
					<div class="swiper-pagination"></div>
				</div>

				<div class="content" v-cloak>
					<div v-for="(productItem,productIndex) in productList" class="floorItem">

						<div class="productTop flex-between" @click="onCategory(productIndex)">
							<p class="productTop-text">{{productItem.Category.TopText}}</p>
							<div class="flex-align-center">
								<p class="productTop-text">{{productIndex+1}}F</p>
								<img src="../../static/img/icon/arrowBack.png" class="arrowImg" />

							</div>
						</div>
						<div class="productContent">
							<div class="productBox flex" ref='div'>
								<div class="productItem" v-for="goodsItem in productItem.SalesProduct">
									<div class="itemBox">
										<div @click="onGoodsDetail(goodsItem,goodsItem.CategoryId)">
											<img v-lazy="goodsItem.GoodsImage" class="itemImg" />
											<div>
												<p class="goods-name text-ellipsis">{{goodsItem.GoodsName}}</p>
											</div>
										</div>

										<div class="addCartBox flex-between">
											<p><span class="goods-price">¥ {{goodsItem.GoodsPrice}}</span></p>
											<img src="../../static/img/icon/shop_addCart.png" @click="onAddCart(goodsItem,goodsItem.GoodsName)" v-show="!goodsItem.shopAddCart" />
											<img src="../../static/img/icon/shop_addCart_select.png" @click="onAddCart(goodsItem.GoodsName)" v-show="goodsItem.shopAddCart" />
										</div>

									</div>

								</div>
							</div>
						</div>
					</div>

				</div>

			</div>
		</transition>
		<footers :urlRouter="$route.path" :cartnum='cartLength' ref="footer"></footers>
	</div>

</template>

<script>
	import Headers from './base/Header.vue';
	import Footers from './base/Footer.vue';
	import Message from './base/Message.vue';
	import '../../static/css/swiper.min.css';
	import Swiper from '../../static/js/swiper.min';
	import { mapGetters, mapMutations } from 'vuex';

	export default {

		data() {
			return {
				bannerList: [],
				productList: [],
				cartLength: 0,
				slidename: 'slide-back',
				mainarea: false,
			}
		},
		components: {
			Headers,
			Footers,
			Message
		},
		computed: {
			...mapGetters([
				'this.$store.state.carts',
				'this.$store.state.comname'
			])
		},
		mounted() {
			this.mainarea = true;
			setTimeout(() => {
				const swiper = new Swiper('.swiper-container', {
					pagination: '.swiper-pagination',
					paginationClickable: true,
					spaceBetween: 30,
					autoplay: 1500,
					effect: 'fade',
				});

			}, 200);
			this.getGoodsList();
			this.getBannerList();
			/*判断动画是进还是出*/
			if(this.$store.state.comname == 'category' || 'cart' || 'member') {
				this.slidename = 'slide-back';
			} else {
				this.slidename = 'slide-go'
			}
			this.setComname('index');
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
			/*进入商品详情*/
			onGoodsDetail(item, id) {
				this.$router.push({
					path: '/detail',
					query: {
						id: id
					}
				});
				this.setGoods(item)
			},
			/*添加到购物车*/
			onAddCart(item, name) {
				
				if(!this.$store.state.carts.includes(item)) {
					if(!this.$refs.footer.showNum) {
						this.cartLength = this.$store.state.carts.length + 1;
						this.$refs.footer.showNum = true;
						this.setCarts(item);
					}
				} else {
					this.$refs.message.messageShow = true;
				}

			},
			/*前往分类页面*/
			onCategory(index) {
				this.setTabindex(index);
				this.$router.push('./category');
			},

			...mapMutations({
				setGoods: 'SET_GOODS',
				setCarts: 'SET_CARTS',
				setTabindex: 'SET_TABINDEX',
				setComname: 'SET_COMNAME'
			})

		}

	}
</script>

<style lang="less" scoped>
	@import '../../static/less/variable.less';
	.swiper-slide img {
		width: 100%;
		height: 100%;
	}
	.container{
		padding-bottom: 0;
	}
	.productTop {
		padding: 0 .2rem;
		height: .6rem;
		line-height: .6rem;
		border-bottom: @base_boder;
		border-top: @base_boder;
		margin-bottom: .2rem;
	}

	.productTop-text {
		font-size: .28rem;
	}

	.arrowImg {
		width: .4rem;
		height: .4rem;
	}
	.floorItem:nth-last-child(1){
		margin-bottom: .88rem;
	}
	.productItem {
		width: 3.8rem;
		box-sizing: border-box;
		margin-bottom: .2rem;
		padding: 0 .2rem;
		flex:1;
		&:nth-child(odd) {
			margin-right: 2%;
			border-right: 1px solid #ccc;
		}
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
