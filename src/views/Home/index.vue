<template>
    <div>
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
        <van-tabbar v-model="active">
            <van-tabbar-item icon="home-o" to="/product">{{ $t("m.footer.product") }}</van-tabbar-item>
            <van-tabbar-item icon="cluster-o" to="/category">{{ $t("m.footer.category") }}</van-tabbar-item>
            <van-tabbar-item icon="shopping-cart-o" to="/cart">{{ $t("m.footer.carts") }}</van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/member">{{ $t("m.footer.me") }}</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
import { Tabbar, TabbarItem } from "vant";
export default {
    data() {
        return {
            active: 0
        };
    },
    components: {
        [Tabbar.name]: Tabbar,
        [TabbarItem.name]: TabbarItem
    },
    created() {
        switch (this.$route.path) {
            case "/product":
                this.active = 0;
                break;
            case "/category":
                this.active = 1;
                break;
            case "/cart":
                this.active = 2;
                break;
            case "/member":
                this.active = 3;
                break;
        }
    }
};
</script>
