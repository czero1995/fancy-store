<template>
    <div class="page">
        <van-nav-bar :title="$t('m.header.login')" left-arrow @click-left="onBack" />

        <div class="login">
            <van-cell-group>
                <van-field v-model="userAccount" required clearable left-icon="contact" :label="$t('m.login.name')" :placeholder="$t('m.login.nameHolder')" />

                <van-field v-model="userPasswd" left-icon="closed-eye" type="password" :label="$t('m.login.pwd')" :placeholder="$t('m.login.pwdHolder')" required />
            </van-cell-group>
            <van-button class="login_btn" size="small" round type="info" @click="onLogin">{{ $t("m.login.login") }}</van-button>
        </div>
        <div class="register" @click="toRegister">{{ $t("m.tip.noUserToRegister") }}</div>
    </div>
</template>

<script>
import { Toast, NavBar, Cell, CellGroup, Button, Field } from "vant";
import { mapMutations } from "vuex";
import { apiLogin } from "@/api/user.js";
import { strategies } from "@/utils/strategies.js";
export default {
    metaInfo() {
        return {
            title: this.$t("m.meta.login.title"),
            meta: [
                {
                    name: this.$t("m.meta.login.name"),
                    content: this.$t("m.meta.login.content")
                }
            ]
        };
    },
    data() {
        return {
            userAccount: "guest",
            userPasswd: "guest"
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
    mounted() {},
    methods: {
        async onLogin() {
            const userAccountEmpty = strategies.isNonEmpty(this.userAccount, this.$t("m.strategies.name"));
            const userPasswdLength = strategies.isNonEmpty(this.userPasswd, 4, this.$t("m.strategies.pwdLenth"));
            const result = userAccountEmpty || userPasswdLength;
            if (result) {
                Toast({
                    message: result,
                    position: "bottom"
                });
            } else {
                let res = await apiLogin(this.userAccount, this.userPasswd);
                if (res.data.code == 0) {
                    this.setReset();
                    this.setUser(res.data.data);
                    console.log("res.data.data", res.data.data);
                    localStorage.setItem("userId", res.data.data.uid);
                    this.onBack();
                } else {
                    Toast({
                        message: res.data.msg,
                        position: "bottom"
                    });
                }
                console.log("res", res);
            }
        },
        toRegister() {
            this.$router.push({
                path: "/register"
            });
        },
        ...mapMutations({
            setUser: "SET_USER",
            setAddress: "SET_ADDRESS",
            setReset: "SET_RESET"
        })
    }
};
</script>

<style lang="less" scoped>
.page {
    background: #f2f3f5;
}
.login {
    text-align: center;
    margin-top: 94px;
    margin-left: 10px;
    margin-right: 10px;
}
.login_btn {
    margin: 20px;
    width: 100px;
}
.register {
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    color: #ccc;
    font-size: 12px;
    text-align: center;
}
</style>
