/*import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( webpackChunkName: "about"  '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router*/


import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import axios from 'axios'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/',
    name: 'Signup',
    //component: Home
    component: () => import('../components/SignUp.vue')
  },
  {
    path: '/',
    name: 'signup2',
    component: () => import('../components/SignUp2.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/distributor',
    name: 'dist',
    component: () => import('../views/Distributor.vue')
  },
  {
  path: '/RawMaterial',
  name: 'raw',
  component: () => import('../views/RawMaterial.vue')
  },
  {
  path: '/employee',
  name: 'Emp',
  component: () => import('../views/Employee.vue')
  },
  {
    path: '/order',
    name: 'ord',
    component: () => import('../views/Order.vue')
    },
  
  {
    path: '/products',
    name: 'product',
    component: () => import('../views/Product.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

Vue.prototype.$http = axios.create({baseURL:'http://127.0.0.1:5000/'})
export default router

