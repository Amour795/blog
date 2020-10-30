import toast from './index.vue'
import Vue from 'vue'
const obj = {}
obj.install = ()=>{
  const toastContrustor = Vue.extend(toast); 
  const _toast = new toastContrustor()
  _toast.$mount(document.createElement('div'))
  document.body.appendChild(_toast.$el)
  Vue.prototype.$toast = _toast
}

export default obj