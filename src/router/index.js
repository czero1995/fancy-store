import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Index = (resolve) => {
  import('../components/Index').then((module) => {
    resolve(module)
  })
}
const Category = (resolve) => {
  import('../components/category/Category.vue').then((module) => {
    resolve(module)
  })
}
const Cart = (resolve) => {
  import('../components/cart/Cart.vue').then((module) => {
    resolve(module)
  })
}
const Member = (resolve) => {
  import('../components/member/Member.vue').then((module) => {
    resolve(module)
  })
}
const Info = (resolve) => {
  import('../components/member/Info.vue').then((module) => {
    resolve(module)
  })
}
const Order = (resolve) => {
  import('../components/order/Order.vue').then((module) => {
    resolve(module)
  })
}

const Address = (resolve) => {
  import('../components/address/Address.vue').then((module) => {
    resolve(module)
  })
}
const AddAddress = (resolve) => {
  import('../components/address/AddAddress').then((module) => {
    resolve(module)
  })
}
const Detail = (resolve) => {
  import('../components/detail/Detail.vue').then((module) => {
    resolve(module)
  })
}
const OrderWait = (resolve) => {
  import('../components/order/OrderWait.vue').then((module) => {
    resolve(module)
  })
}
const WaitPay = (resolve) => {
  import('../components/order/WaitPay.vue').then((module) => {
    resolve(module)
  })
}
const WaitDeliver = (resolve) => {
  import('../components/order/WaitDeliver.vue').then((module) => {
    resolve(module)
  })
}
const WaitReceive = (resolve) => {
  import('../components/order/WaitReceive.vue').then((module) => {
    resolve(module)
  })
}
const OrderDown = (resolve) => {
  import('../components/order/OrderDown.vue').then((module) => {
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
