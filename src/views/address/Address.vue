<template>
    <div class="page">
        <van-nav-bar :title="$t('m.address.myAddress')" left-arrow @click-left="onBack" />
        <nopage ref="nopage" :title="title"></nopage>
        <van-address-list v-model="chosenAddressId" :list="addressData" @edit="onEditAddress" @add="onAddAddress" />
    </div>
</template>

<script>
import { apiGetAddress } from "@/api/address.js";
import { dataMixin } from "@/mixins/dataMixin.js";
import { NavBar, AddressList } from "vant";
export default {
    metaInfo() {
        return {
            title: this.$t("m.meta.address.title"),
            meta: [
                {
                    name: this.$t("m.meta.address.name"),
                    content: this.$t("m.meta.address.content")
                }
            ]
        };
    },
    data() {
        return {
            addressData: [],
            chosenAddressId: ""
        };
    },
    mixins: [dataMixin],
    components: {
        [NavBar.name]: NavBar,
        [AddressList.name]: AddressList
    },
    created() {
        this.getAddress();
    },
    mounted() {},

    methods: {
        onAddAddress() {
            this.$router.push({
                path: "./addaddress",
                query: {
                    state: "add"
                }
            });
        },
        onEditAddress(item) {
            this.$router.push({
                path: "./addaddress",
                query: {
                    state: "edit",
                    item: item,
                    id: item.id
                }
            });
        },
        async getAddress() {
            let res = await apiGetAddress();
            if (res.data.code == -1) {
                this.title = this.$t("m.login.noLogin");
                setTimeout(() => {
                    this.$refs.nopage.onDisplay();
                    this.$refs.nopage.onLogin();
                }, 300);
                return;
            }
            this.addressData = res.data.result;
            if (this.addressData.length == 0) {
                this.title = this.$t("m.address.noAddressTip");
                this.$refs.nopage.onDisplay();
            }
            this.addressData.map(item => {
                item.checked && (this.chosenAddressId = item.id);
            });
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.pageBottom {
    position: fixed;
    bottom: 0;
    background: @theme_background;
    width: 100%;
    line-height: 40px;
    color: @base_color;
    font-size: 14px;
    text-align: center;
}

.address-item {
    line-height: 60px;
    font-size: 14px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    justify-content: space-around;
}
</style>
