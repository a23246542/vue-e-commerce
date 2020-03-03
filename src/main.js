
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
// import $ from 'jquery'; //!!
// ----第三方npm套件內容放上方 下面是要自己撰寫的------
import App from './App';
import router from './router';
import store from './store';
import './bus';



Vue.config.productionTip = false
// Vue.use(axios,VueAxios);
// Vue.prototype.$http = axios;
Vue.use(VueAxios,axios);//pulgin
Vue.component('Loading',Loading);//組件方式

axios.defaults.withCredentials = true;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to,from,next)=>{
  console.log("to",to,'from',from,'next',next);
  // next(); //不加換頁會被擋下來
  // ----------------
  if(to.meta.requiresAuth){
    console.log('這裡需要驗證');
    // -------
    const api =`${process.env.VUE_APP_API}api/user/check`;
    // this.$http.post(api).then((Response)=>{
    axios.post(api).then((response)=>{
    //   console.log(response.data);
      
      if(response.data.success){
        next()
        console.log("已登入");
          
      }else{
        // router.
        console.log("未登入");
        next({
          path:'/login'
        })
      }
    })
  }else{
    next()
  }
  
})
