<template>
	<transition name="slide-back" >
	<div class="page">
		<headersec tabname="我的地址"></headersec>
		<div class="container">
			<div v-show="!havePage">
				<nopage></nopage>
			</div>
			<div v-show="havePage">
				<div class="address-item" v-for="addressItem in this.$store.state.address">
					<p>{{addressItem}}</p>
				</div>
			</div>
					<div class="pageBottom" @click="onAddAddress">	
						<span class="tabbar-label">新增地址</span>
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
				havePage:false
			}
		},
		computed: {
			...mapGetters([
				'this.$store.state.address'
			])
		},

		mounted() {
			const that = this;
			console.log('address', this.$store.state.address)
			if(this.$store.state.address === undefined){
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
			onAddAddress(){
				this.$router.push('./addaddress')
			}
		},
	}
</script>

<style lang="less" scoped>
	@import '../../common/less/variable.less';
	.pageBottom{
		position: fixed;
		bottom: 0;
		background: @theme_background;
		width: 100%;
		height: .8rem;
		line-height:.8rem;
		color:@base_color;
		font-size: .28rem;
		text-align: center;
	}
	.address-item{
		height: 1.2rem;
		line-height: 1.2rem;
		font-size: .28rem;
		text-align: center;
		border-bottom: 1px solid #ccc;
	}
</style>