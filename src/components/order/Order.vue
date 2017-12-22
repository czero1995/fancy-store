<template>
	<transition name="slide-back" >
	<div class="page">
		<headersec tabname="我的订单"></headersec>
		<div class="container">
			<div v-show="!havePage">
				<nopage></nopage>
			</div>
			<div class="order-item" v-show="havePage" v-cloak>
					<div v-for="itemPay in $store.state.pays">
						<div class="order-top flex-between">
							<p>订单号xxxxx</p>
							<p>已支付</p>
						</div>
						<div class="order-content">
							<div  class="flex">
								<div class="order-img">
									<img :src="itemPay.GoodsImage" />
								</div>
								<div class="order-text ">
									<p class="goods-name text-ellipsis">{{itemPay.GoodsName}}</p>
									<p class="goods-num">x{{itemPay.GoodsNum}}</p>
									<p class="goods-price">¥{{itemPay.GoodsPrice}}</p>
								</div>

							</div>

						</div>
					</div>					

				</div>
		</div>		
	</div>
</transition>
</template>

<script>
	import Headersec from '../base/HeaderSec.vue';
	import Nopage from '../base/NoPage.vue';
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				havePage:false,
			}
		},
		computed: {
			...mapGetters([
				'pays'
			])
		},
		created() {
			console.log(1, this.pays)
		},
		mounted() {
			if(this.pays === undefined){
				this.havePage = false;
				
			}else{	
				this.havePage = true;
			}
		},
		components: {
			Headersec,
			Nopage
		},
		methods: {
			
		},
	}
</script>

<style lang="less" scoped>
	@import '../../common/less/variable.less';
	.order-item{
		padding-bottom: .2rem;
		border-bottom: 1px solid #ccc;
		margin-bottom: .2rem;
	}
	.order-top{
		height: .8rem;
		font-size: .28rem;
		line-height: .8rem;
		padding: 0 .2rem;
		border-bottom: 1px solid #ccc;
	}
	.order-content{
		padding-top: .2rem;
	}
</style>