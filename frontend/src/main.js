import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './sw'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
