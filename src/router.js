import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
    // mode: 'history',
    routes: [
        {
            path: "/",
            component: () => import("./views/Home.vue")
        },
        {
            path: "/index",
            component: () => import("./views/Home.vue")
        },
        {
            path: "/category",
            component: () => import("./views/category/Category.vue")
        },
        {
            path: "/cart",
            component: () => import("./views/cart/Cart.vue")
        },
        {
            path: "/member",
            component: () => import("./views/member/Member.vue")
        },
        {
            path: "/info",
            component: () => import("./views/member/Info.vue")
        },
        {
            path: "/order",
            component: () => import("./views/order/Order.vue")
        },
        {
            path: "/address",
            component: () => import("./views/address/Address.vue")
        },
        {
            path: "/addaddress",
            component: () => import("./views/address/AddAddress.vue")
        },
        {
            path: "/detail",
            component: () => import("./views/detail/Detail.vue")
        },
        {
            path: "/orderwait",
            component: () => import("./views/order/OrderWait.vue")
        },
        {
            path: "/waitpay",
            component: () => import("./views/order/WaitPay.vue")
        },
        {
            path: "/waitdeliver",
            component: () => import("./views/order/WaitDeliver.vue")
        },
        {
            path: "/waitreceive",
            component: () => import("./views/order/WaitReceive.vue")
        },
        {
            path: "/orderdown",
            ccomponent: () => import("./views/order/OrderDown.vue")
        }
    ]
});
