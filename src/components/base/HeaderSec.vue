<template>
	<header id="headerTab" class="flex flex-align-center">
		<i  @click="onBack"></i>
		<p>{{tabname}}</p>
	</header>

</template>

<script>
	export default {
		props: ['tabname'],
		data() {
			return {
				isBack: true,
			}
		},
		methods: {
			onBack() {
				if(this.isBack) {
					this.$router.back();
				} else {
					this.$router.push('./member');
				}

			}
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../static/less/base.less';
	header {
		height: .8rem;
		text-align: center;
		background: @theme_background;
		color: @base_color;
		font-size: .26rem;
		line-height: .8rem;
		width: 100%;
		z-index: 10;
		position: fixed;
		top: 0;
	}

	i {
		width: .4rem;
		height: .4rem;
		margin-left: .2rem;
		background: url('../../../static/img/icon/common_sprites.png') -10px -374px;
	}

	p {
		text-align: center;
		width: 100%;
		margin-right: .6rem;
	}
</style>
