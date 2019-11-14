import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Home
},
{
  path: '/shop',
  component: () => import('../views/Shop.vue')
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
  component: () => import('../views/Me.vue'),
  meta: {
    login: true
  }
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由导航守卫
router.beforeEach((to, from, next) => {
  // 如果路由上有 meta 就是说明必须要登录才能访问
  if (to.meta !== undefined && to.meta.login !== undefined && to.meta.login) {
    let token = localStorage.getItem('token')
    if (token === null) {
      next('/login')
    } else {
      next() // 放行
    }
  } else {
    next() // 放行
  }
})

export default router
