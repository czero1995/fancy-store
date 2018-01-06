<template>
	<header class="flex-between flex-align-center">
		<div class="tab-item" :class="{active:urlRouter == '/order'}">
			<router-link to='./order'>
				<p class="tab-title">全部</p>
			</router-link>
		</div>

		<div class="tab-item" :class="{active:urlRouter == '/waitpay'}">
			<router-link to='./waitpay'>
				<p class="tab-title">待付款</p>
			</router-link>
		</div>
		<div class="tab-item" :class="{active:urlRouter == '/waitdeliver'}">
			<router-link to='./waitdeliver'>
				<p class="tab-title">待发货</p>
			</router-link>
		</div>
		<div class="tab-item" :class="{active:urlRouter == '/waitreceive'}">
			<router-link to='./waitreceive'>
				<p class="tab-title">待收货</p>
			</router-link>
		</div>
		<div class="tab-item" :class="{active:urlRouter == '/orderdown'}">
			<router-link to='./orderdown'>
				<p class="tab-title">已完成</p>
			</router-link>
		</div>
	</header>
</template>

<script>
	export default {
		props: ['urlRouter'],
		data() {
			return {
				showNum: false
			}
		},
	}
</script>
<style lang="less" scoped>
	@import '../../../static/less/variable.less';
	header {
		top: .8rem;
		position: absolute;
		width: 100%;
		padding: 0 .2rem;
		height: .88rem;
		background: @base_color;
		box-sizing: border-box;
		font-size: .24rem;
	}
	
	.tab-item {
		text-align: center;
	}
	
	.tab-title {
		color: @base_textColor;
		padding-bottom: .1rem;
		box-sizing: border-box;
	}
	
	.active .tab-title {
		color: @theme_color;
		border-bottom: 1px solid @theme_color;
	}
</style>