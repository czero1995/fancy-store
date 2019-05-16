<template>
    <div class="page">
        <van-nav-bar :title="$t('m.register.register')" :left-text="$t('m.header.back')" left-arrow @click-left="onBack" />
        <div class="register">
            <van-cell-group>
                <van-field v-model="userAccount" required clearable left-icon="contact" :label="$t('m.register.name')" :placeholder="$t('m.register.nameHolder')" />

                <van-field v-model="userPasswd" left-icon="closed-eye" type="password" :label="$t('m.register.pwd')" :placeholder="$t('m.register.pwdHolder')" required />
                <van-field v-model="userPasswdConfim" left-icon="closed-eye" type="password" :label="$t('m.register.pwdConfirm')" :placeholder="$t('m.register.pwdConfirmHolder')" required />
            </van-cell-group>
            <van-button class="login_btn" size="small" round type="info" @click="onRegister">{{ $t("m.register.register") }}</van-button>
        </div>
        <div class="login" @click="toLogin">{{ $t("m.tip.haveUserToLogin") }}</div>
    </div>
</template>

<script>
import { apiRegister } from "@/api/user.js";
import { Toast, NavBar, Cell, CellGroup, Button, Field } from "vant";
import { strategies } from "@/utils/strategies.js";
export default {
    metaInfo() {
        return {
            title: this.$t("m.meta.register.title"),
            meta: [
                {
                    name: this.$t("m.meta.register.name"),
                    content: this.$t("m.meta.register.content")
                }
            ]
        };
    },
    data() {
        return {
            userAccount: "",
            userPasswd: "",
            userPasswdConfim: ""
        };
    },
    components: {
        [NavBar.name]: NavBar,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Toast.name]: Toast,
        [Button.name]: Button,
        [Field.name]: Field
    },
    mounted() {
        console.log(`1`);
    },
    methods: {
        async onRegister() {
            const userAccountEmpty = strategies.isNonEmpty(this.userAccount, this.$t("m.strategies.account"));
            const userPasswdLength = strategies.minLength(this.userPasswd, 4, this.$t("m.strategies.pwdLenth"));
            const userPasswdEqual = strategies.isEqual(this.userPasswd, this.userPasswdConfim, this.$t("m.strategies.pwdNotConfirm"));
            const result = userAccountEmpty || userPasswdLength || userPasswdEqual;
            if (result) {
                Toast({
                    message: result,
                    position: "bottom"
                });
            } else {
                let res = await apiRegister(this.userAccount, this.userPasswd);
                if (res.data.code == 0) {
                    this.$router.go(-1);
                } else {
                    Toast(res.data.msg);
                }
                console.log("res", res);
            }
        },
        toLogin() {
            this.$router.push({
                path: "/login"
            });
        }
    }
};
</script>

<style lang="less" scoped>
.register {
    text-align: center;
    margin-top: 94px;
}
.login_btn {
    margin: 20px;
    width: 100px;
}
.login {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    color: #ccc;
    font-size: 12px;
    text-align: center;
}
</style>
