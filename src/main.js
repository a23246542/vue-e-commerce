
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
// import 'bootstrap'
// ----第三方npm套件內容放上方 下面是要自己撰寫的------
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(axios,VueAxios);
Vue.prototype.$http = axios;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
