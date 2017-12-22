<template>
	<transition name="slide-back" >
	<div class="page">
		<headers></headers>
		<div class="container">
			<div class="floor floor_one"></div>
			<div class="floor floor_item floor_two  flex-align-center flex-between ">
				<p>个人信息</p>
				<img src="../../common/img/icon/arrowRight.png" alt="" />
			</div>
			<div class="floor floor_item floor_two  flex-align-center flex-between" @click="onOrder">
				<p>我的订单</p>
				<img src="../../common/img/icon/arrowRight.png" alt="" />
			</div>
			<div class="floor floor_item floor_two  flex-align-center flex-between " @click="onAddress">
				<p>地址选择</p>
				<img src="../../common/img/icon/arrowRight.png" alt="" />
			</div>
		</div>
		<footers :urlRouter="$route.path"></footers>
	</div>
	</transition>
</template>

<script>
	import Headers from '../base/Header.vue';
	import Footers from '../base/Footer.vue';
	export default{		
		components: {
			Headers,
			Footers,
		},
		methods:{
			onOrder(){
				this.$router.push('./order')
			},
			onAddress(){
				this.$router.push('./address')
			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../common/less/variable.less';
	.page{
		background: #66666608;
	}
	.floor_one{
		width: 100%;
		height: 4rem;
		background: @theme_background;
	}
	.floor_item{
		padding: 0 .2rem;
		height: .8rem;
		line-height: .8rem;
		font-size: .28rem;
		background: @base_color;
		margin-bottom: .4rem;
		img{
			width: .4rem;
			height: .4rem;
		}
	}
</style>