<template>

	<div class="page">
		<headersec tabname="订单详情"></headersec>
		<transition :name="slidename">
			<div class="container" v-show="mainarea">
				<div v-show="!havePage">
					<nopage></nopage>
				</div>
				<div v-show="havePage">
					<div class="chooseAddress" @click="onAddress()">
						<div class="flex-align-center chooseBox">
							<img src="../../../static/img/icon/item_address.png" />
							<div class="flex-align-center flex-between">
								<p v-show="!this.$store.state.chooseaddress">选择送货地址</p>
								<p v-show="this.$store.state.chooseaddress">{{this.$store.state.chooseaddress}}</p>
								<img src="../../../static/img/icon/arrowRight.png" alt="" />
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
		</transition>
	</div>

</template>

<script>
	import Headersec from '../base/HeaderSec.vue';
	import Nopage from '../base/NoPage.vue';
	import { mapGetters, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				allCoach: 0,
				havePage: false,
				mainarea: false,
				slidename: 'slide-go'
			}
		},
		components: {
			Headersec,
			Nopage
		},
		computed: {
			...mapGetters([
				'this.$store.state.orders',
				'this.$store.state.chooseaddress',
				'this.$store.state.comname'
			])
		},
		mounted() {
			const that = this;
			let sums = [];
			this.mainarea = true;
			if(this.$store.state.orders === undefined) {
				that.havePage = false;

			} else {
				that.havePage = true;
				this.$store.state.orders.forEach(function(item) {
					sums.push(item.GoodsPrice);
				});
				for(var i = 0; i < sums.length; i++) {
					that.allCoach += parseInt(sums[i]);
				}
			}
			/*判断动画是进还是出*/
			if(this.$store.state.comname === 'goodsdetail' || this.$store.state.comname === 'cart') {
				this.slidename = 'slide-go';
			} else {
				this.slidename = 'slide-back'
			}
			this.setComname('orderwait');

		},

		methods: {
			/*我的订单*/
			onOrder() {
				this.$router.push('./order');
				this.setPays(this.$store.state.orders);

			},
			/*选择地址*/
			onAddress() {
				this.setIschoose(1);
				this.$router.push('./address');
			},
			...mapMutations({
				setPays: 'SET_PAYS',
				setIschoose: 'SET_ISCHOOSE',
				setComname: 'SET_COMNAME'
			})
		},
	}
</script>

<style lang="less" scoped>
	@import '../../../static/less/variable.less';
	.chooseBox {
		margin-top: .2rem;
		margin-bottom: .2rem;
		height: 1rem;
		padding: 0 .2rem;
		font-size: .28rem;
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
