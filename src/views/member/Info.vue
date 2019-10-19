<template>
    <div class="page">
        <van-nav-bar :title="$t('m.header.memberInfo')" left-arrow @click-left="onBack" />
        <input ref="inputUpload" @change="uploadInputchange" id="uploadFileInput" type="file" accept="image/*" />
        <div class="avatar_box" @click="onAvatar()">
            <img :src="userData.avatar" v-if="userData.avatar" />
            <img src="../../../public/img/github.png" v-else />
        </div>
        <van-cell-group>
            <van-cell :title="$t('m.info.name')" :value="userData.user" />
            <van-cell :title="$t('m.info.sex')" :value="userData.sex" @click="show = true" />
        </van-cell-group>
        <div class="pageBottom van-button--danger" @click="onLogOut" v-if="$store.state.user.user">
            <span class="tabbar-label">{{ $t("m.set.logout") }}</span>
        </div>
        <van-actionsheet v-model="show" :actions="actions" @select="onSelect" />
    </div>
</template>

<script>
import { apiGetUser, apiEditUser } from "@/api/user.js";
import { apiGetQiNiuToken } from "@/api/upload.js";
import axios from "axios";
import { mapMutations } from "vuex";
import { apiLogOut } from "@/api/user.js";
import { NavBar, Cell, CellGroup, Actionsheet, Toast } from "vant";
export default {
    metaInfo() {
        return {
            title: this.$t("m.meta.ininfogo.title"),
            meta: [
                {
                    name: this.$t("m.meta.info.name"),
                    content: this.$t("m.meta.info.content")
                }
            ]
        };
    },
    data() {
        return {
            userData: {
                sex: ""
            },
            show: false,
            actions: [
                {
                    name: "男"
                },
                {
                    name: "女"
                }
            ],
            uploadToken: {
                token: ""
            },
            coverJoinUrl: "",
            apiParams: {},
            sex: "",
            domain: ""
        };
    },
    components: {
        [NavBar.name]: NavBar,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Actionsheet.name]: Actionsheet,
        [Toast.name]: Toast
    },
    mounted() {
        this.getUser();
    },
    methods: {
        onRead(file) {
            console.log(file);
            this.$refs.avatar.src = file.content;
            let data = new FormData();
            data.append("token", this.uploadToken.token);
            data.append("file", file.content);
            const axiosInstance = axios.create({ withCredentials: false });
            console.log("data: ", data);
            axiosInstance({
                method: "POST",
                url: "http://upload.qiniu.com/", //上传地址
                data: data,
                timeout: 30000 //超时时间，因为图片上传有可能需要很久
            })
                .then(data => {
                    console.log(data);
                })
                .catch(function(err) {
                    console.log("err", err);
                });
        },
        async getUser() {
            let res = await apiGetUser();
            this.userData = res.data.data;
            this.userData.sex == "women" && (this.userData.sex = "女");
            this.userData.sex == "man" && (this.userData.sex = "男");
            this.sex = this.userData.sex;
        },
        async onSelect(item) {
            let params = {};
            this.show = false;
            this.userData.sex = item.name;
            item.name == "男" ? (params.sex = "man") : (params.sex = "women");
            await apiEditUser(params);
        },
        async onUpload() {
            const res = await apiGetQiNiuToken();
            this.uploadToken.token = res.data.token;
            this.domain = res.data.domain;
        },
        async onLogOut() {
            await apiLogOut();
            Toast(this.$t("m.message.userLogOut"));
            this.$router.go(-1);
            this.setReset();
        },
        onAvatar() {
            this.onUpload();
            this.$refs.inputUpload.dispatchEvent(new MouseEvent("click"));
        },
        //触发input change事件
        uploadInputchange() {
            let file = document.getElementById("uploadFileInput").files[0]; //选择的图片文件
            this.uploadImgToQiniu(file);
        },
        //上传图片到七牛
        uploadImgToQiniu(file) {
            this.apiParams = {};
            console.log("1");
            const axiosInstance = axios.create({ withCredentials: false }); //withCredentials 禁止携带cookie，带cookie在七牛上有可能出现跨域问题
            let data = new FormData();
            data.append("token", this.uploadToken.token); //七牛需要的token，叫后台给，是七牛账号密码等组成的hash
            data.append("file", file);
            axiosInstance({
                method: "POST",
                url: "http://upload.qiniup.com/", //上传地址
                data: data,
                timeout: 30000 //超时时间，因为图片上传有可能需要很久
            })
                .then(data => {
                    console.log("data", data);
                    this.userData.avatar = `${this.domain}${data.data.key}`;
                    this.setUser({
                        user: this.userData.user,
                        avatar: this.userData.avatar
                    });
                    this.editUser();
                    document.getElementById("uploadFileInput").value = ""; //上传成功，把input的value设置为空，不然 无法两次选择同一张图片
                })
                .catch(function(err) {
                    console.log("errs", err);
                });
        },
        async editUser() {
            let params = { avatar: this.userData.avatar };
            await apiEditUser(params);
        },
        ...mapMutations({
            setUser: "SET_USER",
            setReset: "SET_RESET"
        })
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";

.container {
    text-align: center;
    img {
        margin-top: 30px;
    }
    p {
        margin-top: 30px;
        font-size: 28px;
    }
}
.avatar_box {
    text-align: center;
    img {
        width: 100px;
        height: 100px;
    }
}
#uploadFileInput {
    display: none;
}
.pageBottom {
    position: fixed;
    bottom: 0;
    width: 100%;
    line-height: 40px;
    color: @base_color;
    font-size: 14px;
    text-align: center;
}
</style>
