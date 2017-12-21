import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Category from '@/components/Category/Category'
import Cart from '@/components/Cart/Cart'
import Member from '@/components/Member/Member'
import Detail from '@/components/Detail/Detail'
import OrderWait from '@/components/Order/OrderWait'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/index',
      component: Index
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/member',
      component: Member
    },
    {
      path: '/detail',
      component: Detail
    },
    {
      path: '/orderwait',
      component: OrderWait
    },
  ]
})
