import Vue from 'vue';
import Router from 'vue-router';
import Callback from '@/components/callback/Callback';
const Home = () => import('@/components/landing/Home');
const User = () => import('@/components/user/User');
const TradeRequests = () => import('@/components/user/TradeRequests');
const BooksLibrary = () => import('@/components/library/BooksLibrary');
const BookDetail = () => import('@/components/library/BookDetail');

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/user',
      component: User
    },
    {
      path: '/user/requests',
      component: TradeRequests
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback
    },
    {
      path: '/library',
      component: BooksLibrary
    },
    {
      path: '/books/:id',
      component: BookDetail,
      props: true
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
});
