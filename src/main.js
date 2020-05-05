import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
// import VeeValidate from 'vee-validate';
// import { VeeValidate } from 'vee-validate';
// import { required } from 'vee-validate/dist/rules';//可解構只需要的部分
// import $ from 'jquery'; //!!

import {
    ValidationObserver,//vue元件
    ValidationProvider,//vue元件
    extend,//因為默認不帶任何驗證規則 導入定義規則所需的 extend 函式
    localize,//function
    configure
} from 'vee-validate';
  // 將驗證條件導入
  import * as rules from 'vee-validate/dist/rules';//倒出所有並指定模塊名
  // 導入中文化的文件
  import tw from 'vee-validate/dist/locale/zh_TW.json';
// ----第三方npm套件內容放上方 下面是要自己撰寫的------
import App from './App';
import router from './router';
import store from './store';
import './bus';

// vue.extend('vee-validate',{
//     ...
// })

Vue.config.productionTip = false
// Vue.use(axios,VueAxios);
// Vue.prototype.$http = axios;
Vue.use(VueAxios, axios); //pulgin
// Vue.use(VeeValidate);
Vue.component('Loading', Loading); //全域載入組件方式 就不用個別載入
// 註冊 vee-validate 全域元件
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
localize('zh_TW', tw);//註冊繁體中文

Object.keys(rules).forEach((rule) => { //把rules.js的鍵值組成陣列 用來遍歷取出所有驗證規則
    // extend('myrule', {// 原本以為是定義自己的名稱 結果不是 報錯找不到required規則
    extend(rule, {//這邊添入的是是參數的rule變數 實際填入的是'required'...等等
      ...rules[rule], // copies rule configuration ...把每個rule物件裡面的東西展開
      message: tw[rule], // assign message
    });
  });
  //單純繼承引入min的驗證規則 並自行彈性規定了長度要3以上
  extend('min', {
    validate (value, args) {
      return value.length >= args.length
    },
    params: ['length'],
    message: '長度不夠'
  })

  configure({
    classes: {
      valid: 'is-valid',
      invalid: 'is-inv'//沒反應
    }
  })

axios.defaults.withCredentials = true;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
    console.log("to", to, 'from', from, 'next', next);
    // next(); //不加換頁會被擋下來
    // ----------------
    if (to.meta.requiresAuth) {
        console.log('這裡需要驗證');
        // -------
        const api = `${process.env.VUE_APP_API}api/user/check`;
        // this.$http.post(api).then((Response)=>{
        axios.post(api).then((response) => {
            //   console.log(response.data);

            if (response.data.success) {
                console.log("登入过了",response.data);
                next()
                // next({
                //     path:'admin/product'
                // })
                // console.log("已登入");
            } else {
                // router.
                console.log("还未登入",response.data);
                // console.log("未登入");
                next({
                    path: '/login'
                })
            }
        })
    } else {
        next()
    }

})