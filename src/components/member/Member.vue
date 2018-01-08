<template>

	<div class="page">
		<headers tabname="我的"></headers>
		<transition :name="slidename">
			<div class="container" v-show="mainarea">
				<div class="floor floor_one">
					<img src="../../../build/github.png" alt="" />
					<p>Open Free Share</p>
				</div>
				<div class="floor floor_item floor_two  flex-align-center flex-between" @click="onInfo">
					<p>个人信息</p>
					<img src="../../../static/img/icon/arrowBack.png" alt="" />
				</div>
				<div class="floor floor_item floor_two  flex-align-center flex-between" @click="onOrder">
					<p>我的订单</p>
          <img src="../../../static/img/icon/arrowBack.png" alt="" />
				</div>
				<div class="floor floor_item floor_two  flex-align-center flex-between " @click="onAddress">
					<p>我的地址</p>
          <img src="../../../static/img/icon/arrowBack.png" alt="" />
				</div>
			</div>
		</transition>
		<footers :urlRouter="$route.path"></footers>
	</div>

</template>

<script>
	import Headers from '../base/Header.vue';
	import Footers from '../base/Footer.vue';
	import { mapGetters, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				slidename: 'slide-go',
				mainarea: false
			}
		},
		components: {
			Headers,
			Footers,
		},
		computed: {
			...mapGetters([
				'this.$store.state.comname'
			])
		},
		mounted() {
			this.mainarea = true;
			/*判断动画是进还是出*/
			if(this.$store.state.comname == 'index' || this.$store.state.comname == 'category' || this.$store.state.comname == 'cart') {
				this.slidename = 'slide-go';
			} else {
				this.slidename = 'slide-back'
			}
			this.setComname('member');
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
			},
			...mapMutations({
				setComname: 'SET_COMNAME'
			})
		}
	}
</script>

<style lang="less" scoped>
	@import '../../../static/less/variable.less';
	.page {
		background: rgb(245, 245, 245);
	}

	.floor_one {
		width: 100%;
		height: 4rem;
		background: @theme_background;
		position: relative;
		img {
			position: absolute;
			width: 1.8rem;
			height: 1.8rem;
			left: 0;
			right: 0;
			top: 15%;
			margin: auto;
		}
		p {
			position: absolute;
			bottom: 25%;
			left: 0;
			right: 0;
			margin: 0 auto;
			text-align: center;
			color: white;
			font-size: .26rem;
		}
		;
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
