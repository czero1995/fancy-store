<template>
	<div class="page">
		<headers tabname="我的"></headers>
		<div class="container">
			<div class="floor floor_one">
				<img src="../../../build/logo.png" alt="" />
			</div>
			<div class="floor floor_item floor_two  flex-align-center flex-between" @click="onInfo">
				<p>个人信息</p>
				<img src="../../common/img/icon/arrowRight.png" alt="" />
			</div>
			<div class="floor floor_item floor_two  flex-align-center flex-between" @click="onOrder">
				<p>我的订单</p>
				<img src="../../common/img/icon/arrowRight.png" alt="" />
			</div>
			<div class="floor floor_item floor_two  flex-align-center flex-between " @click="onAddress">
				<p>我的地址</p>
				<img src="../../common/img/icon/arrowRight.png" alt="" />
			</div>
		</div>
		<footers :urlRouter="$route.path"></footers>
	</div>
</template>

<script>
	import Headers from '../base/Header.vue';
	import Footers from '../base/Footer.vue';
	export default {
		components: {
			Headers,
			Footers,
		},
		methods: {
			/*个人信息*/
			onInfo() {
				this.$router.push('./info')
			},
			/*我的订单*/
			onOrder() {
				this.$router.push('./order')
			},
			/*我的地址*/
			onAddress() {
				this.$router.push('./address')
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../common/less/variable.less';
	.page {
		background: rgb(245, 245, 245);
	}
	
	.floor_one {
		width: 100%;
		height: 4rem;
		background: @theme_background;
		position: relative;
		img{
			position: absolute;
			width: 1.2rem;
			height: 1.2rem;
			left: 0;
			right: 0;
			top: 20%;
			margin: auto;
		}
	}
	
	.floor_item {
		padding: 0 .2rem;
		height: .8rem;
		line-height: .8rem;
		font-size: .28rem;
		background: @base_color;
		margin-bottom: .4rem;
		img {
			width: .4rem;
			height: .4rem;
		}
	}
</style>