<template>
	<transition name="slide-back" >
	<div class="page">
		<headersec tabname="订单详情"></headersec>
		<div class="container">
			<div v-show="!havePage">
				<nopage></nopage>
			</div>
			<div v-show="havePage">
				<div class="chooseAddress">
					<div class="flex-align-center chooseBox">
						<img src="../../common/img/icon/item_address.png" />
						<div class="flex-align-center flex-between">
							<p>选择送货地址</p>
							<img src="../../common/img/icon/arrowRight.png" alt="" />
						</div>

					</div>

				</div>
				<div class="orderItem flex" v-for="orderItem in $store.state.orders">
					<img :src="orderItem.GoodsImage" class="goodsImg" />
					<div>
						<p class="goods-name">{{orderItem.GoodsName}}</p>
						<p class="goods-num">x{{orderItem.GoodsNum}}</p>
						<p class="goods-price">¥{{orderItem.GoodsPrice}}</p>
					</div>

				</div>
				<div class="orderBottom flex-between">
					<span>总金额:{{allCoach}}</span>
					<span @click="onOrder">结算</span>
				</div>
			</div>

		</div>
	</div>
	</transition>
</template>

<script>
	import Headersec from '../base/HeaderSec.vue';
	import Nopage from '../base/NoPage.vue';
	import { mapMutations } from 'vuex';
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				allCoach: 0,
				havePage: false
			}
		},
		computed: {
			...mapGetters([
				'orders'
			])
		},
		created() {
			console.log(1, this.orders)
		},
		mounted() {
			const that = this;
			let sums = [];
			if(that.orders === undefined) {
				that.havePage = false;

			} else {
				that.havePage = true;
				that.orders.forEach(function(item) {
					sums.push(item.GoodsPrice);
				});
				for(var i = 0; i < sums.length; i++) {
					that.allCoach += parseInt(sums[i]);
				}
			}

		},
		components: {
			Headersec,
			Nopage
		},
		methods: {
			onOrder() {
				this.$router.push('./order');
				this.setPays(this.orders);
				
			},
			...mapMutations({
				setPays: 'SET_PAYS',
			})
		},
	}
</script>

<style lang="less" scoped>
	@import '../../common/less/base.less';
	.chooseBox {
		margin-top: .2rem;
		margin-bottom: .2rem;
		height: 1.6rem;
		padding: 0 .2rem;
		font-size:.28rem;
		border: 1px dashed @theme_background;
		img {
			width: .4rem;
			height: .4rem;
			margin-right: .2rem;
		}
		div {
			width: 100%;
		}
		p {
			text-align: center;
		}
	}
	
	.orderItem {
		padding: .2rem;
		border-bottom: 1px solid #ccc;
	}
	
	.goodsImg {
		width: 2rem;
		height: 2rem;
	}
	
	.orderBottom {
		position: fixed;
		bottom: 0;
		height: .8rem;
		background: @theme_background;
		width: 100%;
		color: @base_color;
		font-size: .28rem;
		line-height: .8rem;
		padding: 0 .2rem;
		box-sizing: border-box;
	}
</style>