<template>
    <div class="page">
        <van-nav-bar :title="$t('m.header.set')" left-arrow @click-left="onBack" />

        <van-cell-group>
            <van-cell :title="$t('m.set.lang')" :value="$t('m.local')" @click="show = true" />
        </van-cell-group>
        <van-actionsheet v-model="show" :actions="actions" @select="onSelect" />
    </div>
</template>

<script>
import { NavBar, Cell, CellGroup, Actionsheet, Toast } from "vant";
import { mapGetters } from "vuex";
export default {
    metaInfo() {
        return {
            title: this.$t("m.meta.set.title"),
            meta: [
                {
                    name: this.$t("m.meta.set.name"),
                    content: this.$t("m.meta.set.content")
                }
            ]
        };
    },
    data() {
        return {
            userData: {},
            show: false,
            actions: [
                {
                    name: "中文"
                },
                {
                    name: "English"
                }
            ]
        };
    },
    components: {
        [NavBar.name]: NavBar,
        [Cell.name]: Cell,
        [CellGroup.name]: CellGroup,
        [Actionsheet.name]: Actionsheet,
        [Toast.name]: Toast
    },
    computed: {
        ...mapGetters(["user"])
    },
    mounted() {},
    methods: {
        onSelect(item) {
            this.show = false;
            this.userData.lang = item.name;
            if (item.name == "English") {
                this.$i18n.locale = "en";
                localStorage.setItem("lang", "en");
            } else {
                this.$i18n.locale = "zh";
                localStorage.setItem("lang", "zh");
            }
        }
    }
};
</script>

<style lang="less" scoped></style>
