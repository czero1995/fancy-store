<template>
    <div class="page">
        <van-nav-bar :title="$t('m.header.me')" />

        <div class="container">
            <div class="floor floor_one" @click="onInfo">
                <img :src="$store.state.user.avatar" v-if="$store.state.user.avatar" />
                <img src="../../../public/img/github.png" v-else />
                <p v-if="$store.state.user.user">{{ $store.state.user.user }}</p>
                <p v-else>{{ $t("m.login.noLogin") }}</p>
            </div>
            <van-cell class="member_item" :title="$t('m.member.info')" is-link @click="onInfo" />
            <van-cell class="member_item" :title="$t('m.member.order')" is-link @click="toOrder" />
            <van-cell class="member_item" :title="$t('m.member.address')" is-link @click="onAddress" />
            <van-cell class="member_item" :title="$t('m.member.set')" is-link to="set" />
        </div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { NavBar, Cell, CellGroup } from "vant";
export default {
    metaInfo() {
        return {
            title: this.$t("m.meta.member.title"),
            meta: [
                {
                    name: this.$t("m.meta.member.name"),
                    content: this.$t("m.meta.member.content")
                }
            ]
        };
    },
    data() {
        return {};
    },
    computed: {
        ...mapGetters(["user"])
    },
    components: {
        [NavBar.name]: NavBar,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup
    },
    mounted() {
        console.log("金如意");
    },
    methods: {
        onInfo() {
            this.$store.state.user.user ? this.$router.push("./info") : this.toLogin();
        },
        toOrder() {
            if (this.$store.state.user.user) {
                this.setOrderStatus("paying");
                this.$router.push("./order");
            } else {
                this.toLogin();
            }
        },
        onAddress() {
            this.$store.state.user.user ? this.$router.push("./address") : this.toLogin();
        },
        toLogin() {
            this.$router.push("./login");
        },
        ...mapMutations({
            setOrderStatus: "SET_ORDERS_STATUS"
        })
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.page {
    background: rgb(245, 245, 245);
}

.floor_one {
    width: 100%;
    height: 200px;
    background: @theme_background;
    text-align: center;
    img {
        width: 90px;
        height: 90px;
        border-radius: 50%;
        margin-top: 30px;
    }
    p {
        color: white;
        margin-top: 20px;
        font-size: 18px;
    }
}
.member_item {
    margin-bottom: 10px;
}
</style>
