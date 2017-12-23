<template>
  <div id="app">
    
    <router-view/>
    
  </div>
</template>

<script>
import './common/js/rem.js';
export default {
  name: 'app',
  
}
</script>

<style lang="less">
@import './common/less/base.less';
	#app{
		height: 100%;
	}
</style>
