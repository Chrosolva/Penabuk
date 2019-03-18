import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DashBoard from '@/views/DashBoard'
import Login from '@/views/Login'
import Register from '@/views/Register'
import BookDetails from '@/views/BookDetails'
import PaymentDetails from '@/views/PaymentDetails'
import Profile from '@/views/Profile'
import PaymentSuccess from '@/views/PaymentSuccessful'
import ViewAll from '@/views/ViewAll'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'DashBoard',
      component: DashBoard
    },
    {
      path: '/hehe',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/books/:id',
      name: 'BookDetails',
      component: BookDetails
    },
    {
      path: '/payments',
      name: 'PaymentDetails',
      component: PaymentDetails
    },
    {
      path: '/profile/:token',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/payments-success',
      name: 'PaymentSuccess',
      component: PaymentSuccess
    },
    {
      path: '/browse',
      name: 'ViewAll',
      component: ViewAll
    }
  ]
})
