<template>
  <div id="app">
    
    <router-view/>
    
  </div>
</template>

<script>
		
export default {
  name: 'app',
  
}
</script>

<style lang="less">
@import './common/less/base.less';
	#app{
		/*padding-top: .8rem;
		padding-bottom: .88rem;*/
		height: 100%;
	}
</style>
