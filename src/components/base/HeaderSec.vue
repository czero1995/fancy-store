<template>
	<header class="flex flex-align-center">
		<img src="../../common/img/icon/arrowRight.png" @click="onBack"/>
		<p>零食商店</p>
	</header>

</template>

<script>
	
export default {

  data () {
    return {
		
    }
  },
  methods:{
  	onBack(){
  		this.$router.back()
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '../../common/less/base.less';
	header{
		height: .8rem;
		text-align: center;
		background: @theme_background;
		color:@base_color;
		font-size: .26rem;
		line-height: .8rem;
		width: 100%;
		z-index: 10;
		position: fixed;
		top: 0;
		
	}
	img{
		width: .4rem;
		height: .4rem;
		margin-left: .2rem;
	}
	p{
		text-align: center;
		width: 100%;
	}
</style>
