import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import toast from '@components/toast/index.js'
require('@/assets/styles/reset.scss')
Vue.use(toast)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
