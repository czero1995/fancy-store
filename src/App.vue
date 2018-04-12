<template>
  <div id="app">

    <router-view/>

  </div>
</template>

<script>
import '../static/js/rem.js';
export default {
  name: 'app',
  created(){
    console.log('页面执行刷新时，保存Vuex的状态到LocalStorage')
    //在页面加载时读取localStorage里的状态信息
    localStorage.getItem("userMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("userMsg"))));
    
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload",()=>{
        localStorage.setItem("userMsg",JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style lang="less">
@import '../static/less/base.less';
	#app{
		height: 100%;
	}
</style>
