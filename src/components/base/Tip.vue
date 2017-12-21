<template>
 <div class="tipContent model" v-show="showTip" @click.stop="showTip=false">
 	<div class="model-content" @click.stop="showTip=true">
 		{{goodsname}}添加成功
 	</div>
 	
 </div>
</template>

<script>
	
export default {
  props:['goodsname'],
  data () {
    return {
      showTip:false,
    }
  },
  mounted(){
  	console.log(this.goodsname)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
@import '../../common/less/base.less';
.model{
    position: absolute;
    top: 0%;
    left: 0%;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9999;
}

.model-content {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    border-radius: .15rem;
    margin: auto;
    width: 80%;
    height: 3.3rem;
    background-color: @base_color;
    text-align: center;
}
	
</style>

0 2017/12/20 22:12:45
<tip ref="tip" :goodsname="goodsName"></tip>

0 2017/12/20 22:12:59
/*添加到购物车*/
			onAddCart(item,name) {
				this.goodsName=name;
//				this.setCarts(item);
				this.$refs.tip.showTip=true;
			},
			...mapMutations({
				setGoods: 'SET_GOODS',
				setCarts: 'SET_CARTS',
			})
