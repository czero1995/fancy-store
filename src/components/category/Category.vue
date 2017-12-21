<template>
	<div class="category">
		<headers></headers>
		<div class="container flex" id="container" v-cloak>
			<div class="leftbar">
				<div class="barItem" v-for="(menuItem,menuIndex) in menuList">
					<p :class="{active:bar === menuIndex}" class="menu-text" @click="onBar(menuIndex)">
						{{menuItem.cat_name}}
					</p>
				</div>
			</div>
			<div class="rightContent">
				<div class="rightItem" v-for="categoryItem in categoryContent.cart">
					<div class="category-item flex">
						<div class="item flex detail-item">
							<div class="goods-img">
								<img :src="categoryItem.GoodsImage" />
							</div>
							<div class="goods-textBox">
								<p class="goods-name">{{categoryItem.GoodsName}}</p>
								<p class="goods-coach">¥{{categoryItem.GoodsPrice}}</p>
								<div class="goods-cartBox">
									<img src="../../common/img/icon/shop_addCart.png" @click.stop="onAddCart(categoryItem.id,categoryItem.goods_name)" />
								</div>
							</div>
						</div>

					</div>

				</div>
			</div>
		</div>
		<footers :urlRouter="$route.path"></footers>
	</div>

</template>

<script>
	import Headers from '../base/Header.vue';
	import Footers from '../base/Footer.vue';
	import Tip from '../base/Tip.vue';
	import { mapGetters } from 'vuex';
	import { mapMutations } from 'vuex';
	export default {
		data() {
			return {
				bar: 0,
				menuList: [],
				categoryList: [],
				categoryContent:[],
				goodsName: '',
				
			}

		},
		components: {
			Headers,
			Footers,
			Tip
		},
		computed: {
			...mapGetters([
				'carts'
			])
		},
		created() {},
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
						console.log('menuDate', that.menuList);
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
						that.categoryContent = that.categoryList[0]
						
						console.log('content',that.categoryContent)
					})

					.catch(function(error) {
						console.log(error);
					});
			},
			/*切换分类*/
			onBar(index) {
				const that = this;
				that.bar = index;
				console.log(index);
				that.categoryContent=that.categoryList[index];
				console.log(that.categoryList[0])
//					that.categoryContent = that.categoryList[index];							
//				console.log('barcontent',that.categoryContent)
			},
		}

	}
</script>

<style lang="less" rel="stylesheet/less">
	@import '../../common/less/base.less';
	.leftbar {
		width: 1.8rem;
		font-size: .28rem;
		text-align: center;
		border-right: 1px solid #ccc;
	}
	
	.barItem {
		height: .8rem;
		line-height: .8rem;
		/*padding-right: .2rem;*/
		border-bottom: 1px solid #ccc;
	}
	
	.rightContent {
		flex: 1;
		padding-left: .2rem;
	}
	
	.active.menu-text {
		background: @theme_background;
		color: @base_color;
	}
	.category-item{
		padding: .2rem 0;
		border-bottom: 1px solid #ccc;
	}
	.goods-img{
		margin-right: .2rem;
	}
	.goods-name{
		font-size: .28rem;
		
	}
	.goods-coach{
		font-size: .26rem;
		color:red;
		margin: .2rem 0;
	}
	
</style>