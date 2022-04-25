import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue') // set home as path '/'
  },
  {
    path: '/Login',
    name: 'Login',
    meta: { guess: true },
    component: () => import('../views/Login.vue') // set home as path '/'
  },
  {
    path: '/regis',
    name: 'register',
    meta: { guess: true },
    component: () => import('../views/register.vue') // set home as path '/'
  },
  {
    path: '/store',
    name: 'store',
    meta: { login: true },
    component: () => import('../views/store.vue') // set home as path '/'
  },
  {
    path: '/userprofile',
    name: 'userprofile',
    meta: { login: true },
    component: () => import('../views/userprofile.vue') // set home as path '/'
  },
  {
    path: '/booking',
    name: 'booking',
    meta: { login: true },
    component: () => import('../views/booking.vue') // set home as path '/'
  },
  {
    path: '/AdminHome',
    name: 'AdminHome',
    meta: { login: true },
    meta: { login: true },
    component: () => import('../views/admin/AdminHome.vue') // set home as path '/'
  },
  {
    path: '/Adminstore',
    name: 'Adminstore',
    meta: { login: true },
    component: () => import('../views/admin/Adminstore.vue') // set home as path '/'
  },
  {
    path: '/Adminprofile',
    name: 'Adminprofile',
    meta: { login: true },
    component: () => import('../views/admin/Adminprofile.vue') // set home as path '/'
  },
  {
    path: '/stadium',
    name: 'stadium',
    meta: { login: true },
    component: () => import('../views/stadium.vue') // set home as path '/'
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('token')

  // const [users] = await conn.query(
  //   'SELECT * FROM tokens WHERE token=?',
  //   [isLoggedIn]
  // )

  // console.log({ alluse: users })
  if (to.meta.login && !isLoggedIn) {
    alert('Please login first!')
    next({ path: '/Login' })
  }

  if (to.meta.guess && isLoggedIn) {
    alert("You've already logged in")
    next({ path: '/' })
  }

  next()
})

export default router