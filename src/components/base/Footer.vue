<template>
  <footer class="flex flex-align-center">
  	
				<div class="footer-item" :class="{active:urlRouter == '/index'}">
					<router-link to='./index'>
						<i class="icon footerIcon footerHomeIcon"></i>
						<p class="footer-title">首页</p>
						</router-link>
				</div>
		
		
				<div class="footer-item" :class="{active:urlRouter == '/category'}">
					<router-link to='./category'>
							<i class="icon footerIcon footerCategoryIcon"></i>
							<p class="footer-title">分类</p>
						</router-link>
				</div>
		
				<div class="footer-item" :class="{active:urlRouter == '/cart'}">
					<router-link to='./cart'>
						<i class="icon footerIcon footerCartIcon"></i>
						<p class="footer-title">购物车</p>
					</router-link>
				</div>
				<div class="footer-item" :class="{active:urlRouter == '/member'}">
					<router-link to='./member'>
							<i class="icon footerIcon footerMemberIcon"></i>
							<p class="footer-title">我的</p>
					</router-link>
				</div>
  </footer>
</template>

<script>
	
export default {
  props:['urlRouter'],
  data () {
    return {
    }
  },
  mounted(){
  	console.log(111,this.urlRouter);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" rel="stylesheet/less">
@import '../../common/less/base.less';
footer{
	position: fixed;
  bottom: 0;
	width: 100%;
	height: .88rem;
	background: @base_color;
}
.footer-item{
	width: 25%;
	text-align: center;
}
	.icon{
    width: .4rem;
    height: .4rem;
    display: block;
    margin: 0 auto;
    margin-bottom: .1rem;
    text-align: center;
}
.footer-title{
	color:@base_textColor;
}
.footerIcon {
    background-size: 100% 100%!important;
}

.footerHomeIcon {
    background: url('../../common/img/icon/tab_home.png');
}

.footerCategoryIcon {
    background: url('../../common/img/icon/tab_category.png');
}

.footerCartIcon {
    background: url('../../common/img/icon/tab_activity.png');
}

.footerMemberIcon {
    background: url('../../common/img/icon/tab_member.png');
}

.active .footer-title {
    color: @theme_color;
}

.active .footerHomeIcon {
    background: url('../../common/img/icon/tab_home_select.png');
}

.active .footerCategoryIcon {
    background: url('../../common/img/icon/tab_category_select.png');
}

.active .footerCartIcon {
    background: url('../../common/img/icon/tab_activity_select.png');
}

.active .footerMemberIcon {
    background: url('../../common/img/icon/tab_member_select.png');
}

	
</style>
