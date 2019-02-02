<template>
    <transition name="bullet">
        <div v-show="messageShow"><p>商品已在购物车</p></div>
    </transition>
</template>
<script>
export default {
    data() {
        return {
            messageShow: false
        };
    },
    watch: {
        messageShow() {
            if (this.messageShow) {
                setTimeout(() => {
                    this.messageShow = false;
                }, 800);
            }
        }
    }
};
</script>
<style lang="less" scoped>
div {
    font-size: 28px;
    background: black;
    opacity: 0.5;
    height: 60px;
    line-height: 60px;
    width: 200px;
    margin: 0 auto;
    padding: 0 20px;
    border-radius: 15px;
    position: fixed;
    z-index: 999;
    bottom: 140px;
    left: 0;
    right: 0;
    margin: auto;
}

p {
    text-align: center;
    color: white;
}
</style>
