import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {layout: 'main', auth: true},
      component: () => import(`../views/Home.vue`)
    },
    {
      path: '/login',
      name: 'login',
      meta: {layout: 'empty'},
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {layout: 'empty'},
      component: () => import('../views/Register.vue')
    },
    {
      path: '/:name',
      name:'groupelems',
      meta: {layout: 'main', auth: true},
      props: true,
      component: () => import('../views/GroupElems.vue')
    },
    {
      path: '/stories/:report/group=:name',
      name: 'stories',
      meta: {layout: 'main', auth: true},
      props: true,
      component: () => import('../views/Stories.vue')
    }
  ]
})

router.beforeEach((to, from, next)=> { // защита роутов
  const currentUser = firebase.auth().currentUser
  const auth = to.matched.some(record => record.meta.auth)

  if (!currentUser && auth) {
    next('/login?message=login')
  } else {
    next()
  }
})


export default router
