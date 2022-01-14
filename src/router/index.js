import Vue from 'vue'
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
    component: () => import('../views/About.vue')
  },
  {
    path: '/xxx',
    name: 'xxx',
    component: () => import('../views/xxx.vue')
  },
  {
    path: '/board',
    name: 'board',
    component: () => import('../views/board/')
  },
  {
    path: '/storage',
    name: 'storage',
    component: () => import('../views/storage')
  },
  {
    path: '/:collection/:document',
    name: 'collection-document',
    component: () => import('../views/renderer')
  },
  {
    path: '/:collection/:document/:action',
    name: 'collection-document-action',
    component: () => import('../views/renderer')
  },

  {
    path: '*',
    name: 'error',
    component: () => import('../views/error')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
