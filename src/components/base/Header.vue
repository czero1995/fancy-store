<template>
		<header>
			<p>零食商店</p>
		</header>
</template>

<script>
export default {

  data () {
    return {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
@import '../../common/less/variable.less';
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
</style>
