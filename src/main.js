import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// event Bus 用于无关系组件间的通信。
// Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store:store
}).$mount('#app')
