import Vue from 'vue';

Vue.prototype.$bus = new Vue();

// Vue.$bus.$emit('message:push','訊息內容','樣式');

// Message
// vm.$bus.$emit('messsage:push', message, status);
// message(String): 訊息內容
// status(String): Alert 的樣式