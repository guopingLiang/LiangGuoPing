import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入mock
// import './mock'

// 引入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:9999/api/v1'
Vue.prototype.$http = axios

// 使用vant
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
