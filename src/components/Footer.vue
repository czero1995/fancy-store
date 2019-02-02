<template>
    <footer class="flex flex-align-center">
        <div class="footer-item" :class="{ active: urlRouter == '/index' || urlRouter == '/' }">
            <router-link to="./index">
                <i class="icon footerIcon footerHomeIcon"></i>
                <!-- <p class="footer-title">{{$t('m.FooterIndex')}}</p> -->
            </router-link>
        </div>

        <div class="footer-item" :class="{ active: urlRouter == '/category' }">
            <router-link to="./category">
                <i class="icon footerIcon footerCategoryIcon"></i>
                <!-- <p class="footer-title">{{$t('m.FooterCategory')}}</p> -->
            </router-link>
        </div>

        <div class="footer-item" :class="{ active: urlRouter == '/cart' }">
            <router-link to="./cart">
                <i class="icon footerIcon footerCartIcon"></i>
                <!-- <p class="footer-title">{{$t('m.FooterCart')}}</p> -->
            </router-link>
            <transition name="bullet">
                <div class="cart-num" v-show="showNum">{{ cartnum }}</div>
            </transition>
        </div>
        <div class="footer-item" :class="{ active: urlRouter == '/member' }">
            <router-link to="./member">
                <i class="icon footerIcon footerMemberIcon"></i>
                <!-- <p class="footer-title">{{$t('m.FooterMember')}}</p> -->
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
@import "../../public/less/variable.less";
footer {
    bottom: 0;
    position: fixed;
    width: 100%;
    height: 88px;
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
    top: 20px;
    right: 30px;
    width: 50px;
    height: 40px;
    line-height: 40px;
    border-radius: 80px;
    margin: auto;
}

.icon {
    width: 40px;
    height: 40px;
    display: block;
    margin: 0 auto;
    margin-bottom: 4px;
    text-align: center;
}

.footer-title {
    color: @base_textColor;
    font-size: 12px; /* no */
}

.footerIcon {
    width: 60px;
    height: 60px;
}

.footerHomeIcon {
    background: url("../../public/img/icon/footer_sprites.png") -10px -218px; /* no */
}

.footerCategoryIcon {
    background: url("../../public/img/icon/footer_sprites.png") -10px -62px; /* no */
}

.footerCartIcon {
    background: url("../../public/img/icon/footer_sprites.png") -10px -270px; /* no */
}

.footerMemberIcon {
    background: url("../../public/img/icon/footer_sprites.png") -10px -374px; /* no */
}

.active .footer-title {
    color: @theme_color;
}

.active .footerHomeIcon {
    background: url("../../public/img/icon/footer_sprites.png") -10px -10px; /* no */
}

.active .footerCategoryIcon {
    background: url("../../public/img/icon/footer_sprites.png") -10px -322px; /* no */
}

.active .footerCartIcon {
    background: url("../../public/img/icon/footer_sprites.png") -10px -166px; /* no */
}

.active .footerMemberIcon {
    background: url("../../public/img/icon/footer_sprites.png") -10px -114px; /* no */
}
</style>
