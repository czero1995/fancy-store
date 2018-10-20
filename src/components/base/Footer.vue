<template>
	<footer class="flex flex-align-center">

		<div class="footer-item" :class="{active:urlRouter == '/index' || urlRouter == '/'}">
			<router-link to='./index'>
				<i class="icon footerIcon footerHomeIcon"></i>
				<p class="footer-title">{{$t('m.FooterIndex')}}</p>
			</router-link>
		</div>

		<div class="footer-item" :class="{active:urlRouter == '/category'}">
			<router-link to='./category'>
				<i class="icon footerIcon footerCategoryIcon"></i>
				<p class="footer-title">{{$t('m.FooterCategory')}}</p>
			</router-link>
		</div>

		<div class="footer-item" :class="{active:urlRouter == '/cart'}">
			<router-link to='./cart'>
				<i class="icon footerIcon footerCartIcon"></i>
				<p class="footer-title">{{$t('m.FooterCart')}}</p>
			</router-link>
			<transition name="bullet">
				<div class="cart-num" v-show="showNum">{{cartnum}}</div>
			</transition>
		</div>
		<div class="footer-item" :class="{active:urlRouter == '/member'}">
			<router-link to='./member'>
				<i class="icon footerIcon footerMemberIcon"></i>
				<p class="footer-title">{{$t('m.FooterMember')}}</p>
			</router-link>
		</div>
	</footer>
</template>

<script>
export default {
  props: ["urlRouter", "cartnum"],
  data() {
    return {
      showNum: false
    };
  },
  watch: {
    showNum() {
      if (this.showNum) {
        setTimeout(() => {
          this.showNum = false;
        }, 800);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../static/less/variable.less";
footer {
  bottom: 0;
  position: fixed;
  width: 100%;
  height: 0.88rem;
  background: @base_color;
  box-shadow: 0 -2px 9px rgba(0, 0, 0, 0.1);
}
.footer-item {
  width: 25%;
  text-align: center;
  position: relative;
}

.cart-num {
  position: absolute;
  background: @theme_background;
  color: @base_color;
  text-align: center;
  top: -0.2rem;
  right: 0.3rem;
  width: 0.5rem;
  height: 0.4rem;
  line-height: 0.4rem;
  border-radius: 0.8rem;
  margin: auto;
}

.icon {
  width: 0.4rem;
  height: 0.4rem;
  display: block;
  margin: 0 auto;
  margin-bottom: 4px;
  text-align: center;
}

.footer-title {
  color: @base_textColor;
}

.footerIcon {
  width: 0.48rem;
  height: .48rem;
}

.footerHomeIcon {
   background: url('../../../static/img/icon/footer_sprites.png') -10px -10px;
}

.footerCategoryIcon {
  background: url('../../../static/img/icon/footer_sprites.png') -10px -146px;
}

.footerCartIcon {
  background: url('../../../static/img/icon/footer_sprites.png') -10px -282px;
}

.footerMemberIcon {
  background: url('../../../static/img/icon/footer_sprites.png') -10px -418px;
}

.active .footer-title {
  color: @theme_color;
}

.active .footerHomeIcon {
  background: url('../../../static/img/icon/footer_sprites.png') -10px -78px;
}

.active .footerCategoryIcon {
  background: url('../../../static/img/icon/footer_sprites.png') -10px -214px;
}

.active .footerCartIcon {
  background: url('../../../static/img/icon/footer_sprites.png') -10px -350px;
}

.active .footerMemberIcon {
  background: url('../../../static/img/icon/footer_sprites.png') -10px -486px;
}
</style>
