<template>
	<div class="page">
		<headersec></headersec>
		<div>
			<div class="order-item" v-cloak>
					<div v-for="itemPay in $store.state.pays">
						<div class="order-top inlinkFlex-spacebetween">
							<p class="order-state">
								<span>已支付</span>
							</p>
						</div>
						<div class="order-content">
							<div  class="inlinkFlex">
								<div class="order-img">
									<img :src="itemPay.GoodsImage" />
								</div>
								<div class="order-text ">
									<p class="goods-name text-ellipsis">{{itemPay.GoodsName}}</p>
									<p class="order-num">x{{itemPay.GoodsNum}}</p>
									<p class="goods-price">¥{{itemPay.GoodsPrice}}</p>
								</div>

							</div>

						</div>
					</div>
					
					<div class="order-op inlinkFlex" >
						<p class="order-coach">确认收货</p>
					</div>

				</div>
		</div>		
	</div>

</template>

<script>
	import Headersec from '../base/HeaderSec.vue';	
	import { mapGetters } from 'vuex'
	export default {
		data() {
			return {
				
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
			const that = this;						
		},
		components: {
			Headersec
		},
		methods: {
			
		},
	}
</script>

<style lang="less" scoped>
	@import '../../common/less/variable.less';
	
</style>