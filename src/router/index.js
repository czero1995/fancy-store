import Vue from 'vue'
import Router from 'vue-router'
//import Index from '@/components/Index'
//import Category from '@/components/Category/Category'
//import Cart from '@/components/Cart/Cart'
//import Member from '@/components/Member/Member'
//import Order from '@/components/Order/Order'
//import Address from '@/components/Address/Address'
//import AddAddress from '@/components/Address/AddAddress'
//import Detail from '@/components/Detail/Detail'
//import OrderWait from '@/components/Order/OrderWait'
Vue.use(Router)

const Index = (resolve) => {
  import('@/components/Index').then((module) => {
    resolve(module)
  })
}
const Category = (resolve) => {
  import('@/components/Category/Category').then((module) => {
    resolve(module)
  })
}
const Cart = (resolve) =>{
	import('@/components/Cart/Cart').then((module) =>{
		resolve(module)
	})
}
const Member = (resolve) =>{
	import('@/components/Member/Member').then((module) =>{
		resolve(module)
	})
}
const Info = (resolve) =>{
	import('@/components/Member/Info').then((module) =>{
		resolve(module)
	})
}
const Order = (resolve) =>{
	import('@/components/Order/Order').then((module) =>{
		resolve(module)
	})
}

const Address = (resolve) => {
  import('@/components/Address/Address').then((module) => {
    resolve(module)
  })
}
const AddAddress = (resolve) => {
  import('@/components/Address/AddAddress').then((module) => {
    resolve(module)
  })
}
const Detail = (resolve) =>{
	import('@/components/Detail/Detail').then((module) =>{
		resolve(module)
	})
}
const OrderWait = (resolve) =>{
	import('@/components/Order/OrderWait').then((module) =>{
		resolve(module)
	})
}
const WaitPay = (resolve) =>{
	import('@/components/Order/WaitPay').then((module) =>{
		resolve(module)
	})
}
const WaitDeliver = (resolve) =>{
	import('@/components/Order/WaitDeliver').then((module) =>{
		resolve(module)
	})
}
const WaitReceive = (resolve) =>{
	import('@/components/Order/WaitReceive').then((module) =>{
		resolve(module)
	})
}
const OrderDown = (resolve) =>{
	import('@/components/Order/OrderDown').then((module) =>{
		resolve(module)
	})
}
export default new Router({
//	 mode: 'history',
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
      path: '/info',
      component: Info
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
    {
      path: '/waitpay',
      component: WaitPay
    },
    {
      path: '/waitdeliver',
      component: WaitDeliver
    },
    {
      path: '/waitreceive',
      component: WaitReceive
    },
     {
      path: '/orderdown',
      component: OrderDown
    },
]
})	
