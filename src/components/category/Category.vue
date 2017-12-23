<template>
	<div class="page">
		<headers tabname="分类"></headers>
		<div class="container flex" id="container" v-cloak>
			<div class="leftbar">
				<div class="barItem" v-for="(menuItem,menuIndex) in menuList">
					<p :class="{active:menuIndex === $store.state.tabindex}" class="menu-text" @click="onBar(menuIndex)">
						{{menuItem.cat_name}}
					</p>
				</div>
			</div>
			<div class="rightContent">
				<div class="rightItem" v-for="categoryItem in categoryContent.cart" @click="onDetail(categoryItem )">
					<div class="category-item flex">
						<div class="item flex detail-item">
							<div class="goods-img">
								<img v-lazy="categoryItem.GoodsImage" />
							</div>
							<div class="goods-textBox">
								<p class="goods-name">{{categoryItem.GoodsName}}</p>
								<p class="goods-coach">¥{{categoryItem.GoodsPrice}}</p>
								<div class="goods-cartBox">
									<img src="../../common/img/icon/shop_addCart.png" @click.stop="onAddCart(categoryItem)" />
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
	import Headers from '../base/Header.vue';
	import Footers from '../base/Footer.vue';
	import { mapGetters, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				menuList: [],
				categoryList: [],
				categoryContent: [],
				cartLength: 0
			}

		},
		components: {
			Headers,
			Footers,
		},
		computed: {
			...mapGetters([
				'carts',
				'this.$store.state.tabindex'
			])
		},
		mounted() {
			this.getMenuList();
			this.getCategoryList();
		},
		methods: {
			/*获取分类栏目*/
			getMenuList: function() {
				const that = this;
				this.$http.get('/api/menudata', {}).then(function(res) {
						that.menuList = res.data.data;
					})
					.catch(function(error) {
						console.log(error);
					});
			},
			/*获取分类列表*/
			getCategoryList: function() {
				const that = this;
				this.$http.post('/api/categorydata', {}).then(function(res) {
						that.categoryList = res.data.data;
						that.categoryContent = that.categoryList[0];
					})

					.catch(function(error) {
						console.log(error);
					});
			},
			/*切换分类*/
			onBar(index) {
				const that = this;
				this.setTabindex(index);
				that.categoryContent = that.categoryList[this.$store.state.tabindex];
			},
			/*添加购物车*/
			onAddCart(item) {
				if(!this.$refs.footer.showNum) {
					this.setCarts(item);
					this.cartLength = this.$store.state.carts.length;
					this.$refs.footer.showNum = true;
				}

			},
			/*进入商品详情*/
			onDetail(item) {
				this.$router.push('/detail');
				this.setGoods(item)
			},
			...mapMutations({
				setGoods: 'SET_GOODS',
				setCarts: 'SET_CARTS',
				setTabindex: 'SET_TABINDEX'
			})
		}

	}
</script>

<style lang="less" scoped>
	@import '../../common/less/variable.less';
	.category {
		padding-top: .8rem;
		padding-bottom: .88rem;
	}
	
	.leftbar {
		position: fixed;
		left: 0;
		width: 1.8rem;
		font-size: .28rem;
		text-align: center;
		border-right: 1px solid #ccc;
		height: 100%;
	}
	
	.barItem {
		height: .8rem;
		line-height: .8rem;
		border-bottom: 1px solid #ccc;
	}
	
	.rightContent {
		flex: 1;
		margin-left: 1.8rem;
	}
	
	.rightItem:nth-last-child(1) {
		padding-bottom: .9rem;
	}
	
	.active.menu-text {
		background: @theme_background;
		color: @base_color;
	}
	
	.category-item {
		padding: .2rem 0;
		border-bottom: 1px solid #ccc;
	}
	
	.detail-item {
		width: 100%;
	}
	
	.goods-textBox {
		width: 100%;
	}
	
	.goods-img {
		margin-right: .2rem;
		width: 4rem;
		height: 2rem;
		img {
			width: 100%;
			height: 100%;
		}
	}
	
	.goods-name {
		font-size: .28rem;
	}
	
	.goods-coach {
		font-size: .26rem;
		color: red;
		margin: .2rem 0;
	}
	
	.goods-cartBox {
		margin-right: .4rem;
		width: .4rem;
		height: .4rem;
		img{
			width: 100%;
			height: 100%;
		}
	}
</style>