import Vue from 'vue'
import Router from 'vue-router'
import Callback from '@/components/callback/Callback'
const Home = () => import('@/components/landing/Home')
const User = () => import('@/components/user/User')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      component: Home
    },
    {
      path: '/user',
      component: User
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
})
