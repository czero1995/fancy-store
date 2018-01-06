<template>

	<div class="page orderpage">
		<v-touch @swipeleft="onSwipeLeft()" @swiperight="onSwipeRight()">
			<headersec tabname="我的订单" ref="noback"></headersec>
			<ordertab :urlRouter="$route.path"></ordertab>
			<transition :name="slidename">
				<div class="ordercontainer" v-show="mainarea">
					<img src="../../../build/github.png" alt="" />
					<p>已完成页面</p>
				</div>
			</transition>
		</v-touch>
	</div>

</template>

<script>
	import Headersec from '../base/HeaderSec.vue';
	import Nopage from '../base/NoPage.vue';
	import Ordertab from '../base/OrderTab.vue';
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		data() {
			return {
				mainarea: false,
				slidename: 'slide-go'
			}
		},
		components: {
			Headersec,
			Ordertab
		},
		mounted() {
			this.$refs.noback.isBack = false;
			this.mainarea = true;
			this.setOrdertab(5);
		},
		methods: {
			onSwipeLeft() {
				this.$router.push('./order');
			},
			onSwipeRight() {
				this.$router.push('./waitreceive');
			},
			...mapMutations({
				setOrdertab: 'SET_ORDERTAB'
			})
		}

	}
</script>