
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// ----第三方套件放上方 下面是要自己撰寫的------
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(axios,VueAxios);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
