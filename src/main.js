import Vue from 'vue'
import App from './App'
import Mint from 'mint-ui'
import VueRouter from 'vue-router'
import VueHttp from 'vue-resource'
import 'mint-ui/lib/style.css';
Vue.use(Mint);
Vue.use(VueRouter);
Vue.use(VueHttp);
Vue.http.options.xhr = { withCredentials: true }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
