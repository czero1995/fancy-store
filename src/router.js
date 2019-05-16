import Vue from "vue";
import Router from "vue-router";
import store from "./store/index.js";
Vue.use(Router);

const router = new Router({
    mode: "history",
    routes: [
        {
            path: "/",
            component: () => import("./views/Home/index.vue"),
            redirect: "/product",

            children: [
                {
                    path: "/product",
                    component: () => import("./views/product/Product.vue"),
                    meta: {
                        keepAlive: true // 是否缓存组件
                    }
                },
                {
                    path: "/category",
                    component: () => import("./views/category/Category.vue"),
                    meta: {
                        keepAlive: true // 是否缓存组件
                    }
                },
                {
                    path: "/cart",
                    component: () => import("./views/cart/Cart.vue"),
                    meta: {
                        keepAlive: false // 是否缓存组件
                    }
                },
                {
                    path: "/member",
                    component: () => import("./views/member/Member.vue"),
                    meta: {
                        keepAlive: false // 是否缓存组件
                    }
                }
            ]
        },

        {
            path: "/register",
            component: () => import("./views/member/Register.vue")
        },
        {
            path: "/login",
            component: () => import("./views/member/Login.vue")
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
            path: "/set",
            component: () => import("./views/member/Set.vue")
        }
    ]
});
// 全局路由钩子函数 对全局有效
router.beforeEach((to, from, next) => {
    let auth = to.meta.auth;
    let token = store.getters["login/token"];

    if (auth) {
        // 需要登录
        if (token) {
            next();
        } else {
            next({
                path: "/login",
                query: {
                    redirect: to.fullPath
                }
            });
        }
    } else {
        next();
    }
});
export default router;
