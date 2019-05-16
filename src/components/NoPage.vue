<template>
    <div class="flex" v-show="havePage">
        <img src="../../public/img/github.png" />
        <p>{{ title }}</p>
        <router-link to="./login" class="to_login" v-if="toLogin">
            <van-button size="small" type="info">去登陆</van-button>
        </router-link>
    </div>
</template>
<script>
import { Button } from "vant";
export default {
    props: { title: String },
    data() {
        return {
            havePage: false,
            toLogin: false
        };
    },
    components: {
        [Button.name]: Button
    },
    methods: {
        onDisplay() {
            this.havePage = true;
        },
        onHide() {
            this.havePage = false;
        },
        onLogin() {
            this.toLogin = true;
        }
    }
};
</script>
<style lang="less" scoped>
div {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    width: 100%;
}

img {
    text-align: center;
    margin: 30px 0;
    width: 100px;
    height: 100px;
}

p {
    text-align: center;
}
.to_login {
    margin-top: 20px;
}
</style>
