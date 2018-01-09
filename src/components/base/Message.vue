<template>
	<transition name="bullet">
		<div v-show="messageShow">
			<p>商品已在购物车</p>
		</div>
	</transition>
</template>
<script>
	export default {
		data() {
			return {
				messageShow: false
			}
		},
		watch: {
			messageShow() {
				if(this.messageShow) {
					setTimeout(() => {
						this.messageShow = false;
					}, 800)
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	div {
		font-size: .28rem;
		background: black;
		opacity: 0.5;
		height: .6rem;
		line-height: .6rem;
		width: 2rem;
		margin: 0 auto;
		padding: 0 .2rem;
		border-radius: 0.15rem;
		position: fixed;
		z-index: 999;
		bottom: 1.4rem;
		left: 0;
		right: 0;
		margin: auto;
	}
	
	p {
		text-align: center;
		color: white;
	}
</style>