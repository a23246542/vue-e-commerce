<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <button type="button" class="btn btn-primary">Primary</button>
    <button type="button" class="btn btn-secondary">Secondary</button>
    <button type="button" class="btn btn-success">Success</button>
    <button type="button" class="btn btn-danger">Danger</button>
    <button type="button" class="btn btn-warning">Warning</button>
    <button type="button" class="btn btn-info">Info</button>
    <button type="button" class="btn btn-light">Light</button>
    <button type="button" class="btn btn-dark">Dark</button>
  </div>
</template>

<script>
// import home from '@/views/Home.vue' //這邊沒用到沒加入好像也沒怎樣
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(axios,VueAxios);
Vue.prototype.$http = axios;

// import 'bootstrap' 不是寫在這

export default {
    name:'App',
    // component:home,
    created(){
        console.log(process.env.VUE_APP_API,process.env.VUE_APP_CUSTOMAPI);
        // console.log(process.env.VUE_APP_CUSTOMAPI);

        const api =`${process.env.VUE_APP_API}api/${process.env.VUE_APP_CUSTOMAPI}/products`;
        //API 伺服器路徑
        // 所申請的APIPath
        this.$http.get(api).then((response)=>{
            console.log(response.data);
            
        })
    }
}
</script>


<style lang="scss">
// @import "~bootstrap/scss/bootstrap.scss";
@import "./assets/all";


// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }

// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
