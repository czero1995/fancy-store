import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Category from '@/components/Category/Category'
import Cart from '@/components/Cart/Cart'
import Member from '@/components/Member/Member'
import Order from '@/components/Order/Order'
import Address from '@/components/Address/Address'
import AddAddress from '@/components/Address/AddAddress'
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
      path: '/order',
      component: Order
    },
    {
      path: '/address',
      component: Address
    },
    {
      path: '/addaddress',
      component: AddAddress
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
