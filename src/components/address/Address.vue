<template>
	<div class="page">
		<headersec></headersec>
		<div class="container">
				<div class="pageBottom" @click="onAddAddress">	
					<span class="tabbar-label">新增地址</span>
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
				'address'
			])
		},
		created() {
			console.log(1, this.address)
		},
		mounted() {
			const that = this;						
		},
		components: {
			Headersec
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
</style>