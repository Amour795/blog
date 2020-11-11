import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
require('@/assets/styles/reset.scss')
import 'view-design/dist/styles/iview.css';
import '@/plugins/iview/index.js';

import * as filters from '@/filters/index'
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
