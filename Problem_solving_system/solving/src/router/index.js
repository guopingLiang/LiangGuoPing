import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/categories/:id/question',
    component: () => import('../views/Question.vue')
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/regist',
    component: () => import('../views/Regist.vue')
  },
  {
    path: '/me',
    component: () => import('../views/Me.vue')
  },
  {
    path: '/topn',
    component: () => import('../views/Topn.vue')
  },
  {
    path: '/password',
    component: () => import('../views/Password.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
