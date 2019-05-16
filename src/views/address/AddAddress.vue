<template>
    <div class="page">
        <van-nav-bar :title="title" left-arrow @click-left="onBack">
            <van-icon name="delete" slot="right" v-if="state == 'edit'" @click="onDelete" />
        </van-nav-bar>
        <van-cell-group>
            <van-field v-model="addressInfo.name" required :label="$t('m.address.name')" :placeholder="$t('m.address.nameHolder')" />
            <van-field v-model="addressInfo.tel" required clearable :label="$t('m.address.phone')" :placeholder="$t('m.address.phoneHolder')" />
            <van-field v-model="addressInfo.post" required clearable :label="$t('m.address.port')" :placeholder="$t('m.address.portHolder')" />
            <van-field v-model="addressInfo.address" required clearable :label="$t('m.address.address')" :placeholder="$t('m.address.addressHolder')" @click="onAddress" />
            <van-field v-model="addressInfo.detailAddress" type="textarea" :label="$t('m.address.detailAddress')" :placeholder="$t('m.address.detailAddressHolder')" rows="2" required autosize />
            <van-switch-cell v-model="addressInfo.checked" :title="$t('m.address.isDefault')" />
        </van-cell-group>
        <div class="area" v-show="showArea">
            <van-area :area-list="areaList" value="440305" @cancel="onCancel" @confirm="onComfirm" />
        </div>
        <div class="pageBottom van-button--danger" @click="onSave">
            <span class="tabbar-label">{{ $route.query.state == "edit" ? $t("m.address.edit") : $t("m.address.add") }}</span>
        </div>
    </div>
</template>

<script>
import areaList from "@/assets/js/areaList.js";
import { mapGetters, mapMutations } from "vuex";
import { apiAddAddress, apiDeleteAddress, apiUpdateAddress } from "@/api/address.js";
import { NavBar, Area, Field, Dialog, SwitchCell, Cell, CellGroup, Icon, Toast } from "vant";
import { strategies } from "@/utils/strategies.js";
export default {
    metaInfo() {
        return {
            title: this.$t("m.meta.addaddress.title"),
            meta: [
                {
                    name: this.$t("m.meta.addaddress.name"),
                    content: this.$t("m.meta.addaddress.content")
                }
            ]
        };
    },
    data() {
        return {
            addressInfo: {
                name: "",
                tel: "",
                post: "",
                address: "",
                detailAddress: "",
                checked: false
            },
            areaList: null,
            showArea: false,
            title: this.$t("addAddressTitle"),
            state: "add"
        };
    },
    computed: {
        ...mapGetters(["this.$store.state.addressStatus"])
    },
    components: {
        [NavBar.name]: NavBar,
        [Area.name]: Area,
        [Field.name]: Field,
        [Dialog.name]: Dialog,
        [SwitchCell.name]: SwitchCell,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Icon.name]: Icon,
        [Toast.name]: Toast
    },
    created() {
        this.areaList = areaList;
        if (this.$route.query.state == "edit") {
            let data = this.$route.query.item;
            this.addressInfo = data;
            this.title = this.$t("editAddressTitle");
            this.state = "edit";
        }
    },
    mounted() {},

    methods: {
        onAddress() {
            this.showArea = !this.showArea;
        },
        onComfirm(val) {
            this.addressInfo.address = "";
            val.map(item => {
                this.addressInfo.address = `${this.addressInfo.address} ${item.name}`;
            });
            this.showArea = false;
        },
        onCancel() {
            this.showArea = false;
        },
        onDelete() {
            Dialog.confirm({
                message: this.$t("message.deleteSure")
            }).then(() => {
                this.sureDelete();
            });
        },
        onBackOther() {
            this.$router.go(-1);
        },
        async sureDelete() {
            await apiDeleteAddress(this.$route.query.item.id);
            this.onBack();
        },
        async onSave() {
            const nameEmpty = strategies.isNonEmpty(this.addressInfo.name, this.$t("strategies.name"));
            const telEmpty = strategies.isNonEmpty(this.addressInfo.tel, this.$t("strategies.tel"));
            const addressEmpty = strategies.isNonEmpty(this.addressInfo.address, this.$t("strategies.address"));
            const result = nameEmpty || telEmpty || addressEmpty;

            if (result) {
                Toast({
                    message: result,
                    position: "bottom"
                });
            } else {
                this.state == "add" ? await apiAddAddress(this.addressInfo) : await apiUpdateAddress(this.addressInfo, this.$route.query.id);

                this.$store.state.addressStatus == "orderWait" && this.setAddress(this.addressInfo);

                this.onBack();
            }
        },
        ...mapMutations({
            setAddress: "SET_ADDRESS"
        })
    }
};
</script>

<style lang="less" scoped>
@import "../../../public/less/variable.less";
.area {
    position: absolute;
    bottom: 50px;
    width: 100%;
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
