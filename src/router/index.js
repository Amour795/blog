import Vue from 'vue'
import VueRouter from 'vue-router'
import blogRoute from './children/blog'
import adminRoute from './children/admin'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    blogRoute,
    adminRoute
  ]

})

export default router
