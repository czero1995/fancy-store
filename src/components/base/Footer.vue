<template>
	<footer class="flex flex-align-center">

		<div class="footer-item" :class="{active:urlRouter == '/index' || urlRouter == '/'}">
			<router-link to='./index'>
				<i class="icon footerIcon footerHomeIcon"></i>
				<p class="footer-title">首页</p>
			</router-link>
		</div>

		<div class="footer-item" :class="{active:urlRouter == '/category'}">
			<router-link to='./category'>
				<i class="icon footerIcon footerCategoryIcon"></i>
				<p class="footer-title">分类</p>
			</router-link>
		</div>

		<div class="footer-item" :class="{active:urlRouter == '/cart'}">
			<router-link to='./cart'>
				<i class="icon footerIcon footerCartIcon"></i>
				<p class="footer-title">购物车</p>
			</router-link>
			<transition name="bullet">
				<div class="cart-num" v-show="showNum">{{cartnum}}</div>
			</transition>
		</div>
		<div class="footer-item" :class="{active:urlRouter == '/member'}">
			<router-link to='./member'>
				<i class="icon footerIcon footerMemberIcon"></i>
				<p class="footer-title">我的</p>
			</router-link>
		</div>
	</footer>
</template>

<script>
	export default {
		props: ['urlRouter', 'cartnum'],
		data() {
			return {
				showNum: false
			}
		},
		watch: {
			showNum() {
				if(this.showNum) {
					setTimeout(() => {
						this.showNum = false;
					}, 800)
				}
			}
		}
	}
</script>
<style lang="less" scoped>
	@import '../../../static/less/variable.less';
	footer {
		bottom: 0;
		position:fixed;
		width: 100%;
		height: .88rem;
		background: @base_color;
		box-shadow: 0 -2px 9px rgba(0, 0, 0, .1);
	}	
	.footer-item {
		width: 25%;
		text-align: center;
		position: relative;
	}

	.cart-num {
		position: absolute;
		background: @theme_background;
		color: @base_color;
		text-align: center;
		top: -.2rem;
		right: .3rem;
		width: .5rem;
		height: .4rem;
		line-height: .4rem;
		border-radius: 0.8rem;
		margin: auto;
	}

	.icon {
		width: .4rem;
		height: .4rem;
		display: block;
		margin: 0 auto;
		margin-bottom: .1rem;
		text-align: center;
	}

	.footer-title {
		color: @base_textColor;
	}

	.footerIcon {
		background-size: 100% 100%!important;
	}

	.footerHomeIcon {
		background: url('../../../static/img/icon/tab_home.png');
	}

	.footerCategoryIcon {
		background: url('../../../static/img/icon/tab_category.png');
	}

	.footerCartIcon {
		background: url('../../../static/img/icon/tab_activity.png');
	}

	.footerMemberIcon {
		background: url('../../../static/img/icon/tab_member.png');
	}

	.active .footer-title {
		color: @theme_color;
	}

	.active .footerHomeIcon {
		background: url('../../../static/img/icon/tab_home_select.png');
	}

	.active .footerCategoryIcon {
		background: url('../../../static/img/icon/tab_category_select.png');
	}

	.active .footerCartIcon {
		background: url('../../../static/img/icon/tab_activity_select.png');
	}

	.active .footerMemberIcon {
		background: url('../../../static/img/icon/tab_member_select.png');
	}
</style>
