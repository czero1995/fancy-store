<template>
 <div class="tipContent model" v-show="showTip">
 	<div class="model-content">
 		添加成功
 	</div>
 	
 </div>
</template>

<script>
	
export default {
  
  data () {
    return {
      showTip:false
    }
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
