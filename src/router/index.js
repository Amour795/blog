import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home/index.vue'
import blog from '../views/blog/index.vue'
import about from '../views/about/index.vue'
import demo from '../views/demo/index.vue'
import login from '../views/login.vue'
import calendar from '../views/calendar.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: home
  }, 
  {
    path: '/blog',
    name: 'blog',
    component: blog
  },   
  {
    path: '/about',
    name: 'about',
    component: about
  },     
  {
    path: '/demo',
    name: 'demo',
    component: demo
  },    
  {
    path: '/login',
    name: 'login',
    component: login
  }, 
  {
    path: '/calendar',
    name: 'calendar',
    component: calendar
  },
  
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
