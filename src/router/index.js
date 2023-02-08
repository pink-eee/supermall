import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/home/Home.vue'
import category from '../views/category/category.vue'
import cart from '../views/cart/cart.vue'
import profile from '../views/profile/profile.vue'
import Detail from '../views/detail/Detail.vue'


Vue.use(VueRouter)

const routes = [
    {
        path: '',
        redirect: '/home'
      },
      {
          path:'/home',
          component: Home
      },
      {
          path:'/category',
          component:category
      },
      {
          path:'/cart',
          component:cart
      },
      {
          path:'/profile',
          component:profile
      },
      {
          path:'/detail/:iid',
          component:Detail
      }
]

const router = new VueRouter({
    routes,
    mode:'history'
})

export default router