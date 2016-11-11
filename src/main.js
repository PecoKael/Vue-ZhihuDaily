import Vue from 'vue'
import App from './App'
import Mint from 'mint-ui'
import VueRouter from 'vue-router'
import VueHttp from 'vue-resource'
import routerconfig from "../config/routerconfig"
import Vuex from 'vuex'
import 'mint-ui/lib/style.css';
import './assets/iconfont/iconfont.css'

Vue.use(Mint);
Vue.use(VueRouter);
Vue.use(VueHttp);
Vue.use(Vuex);

Vue.http.options.xhr = { withCredentials: true }

const store = new Vuex.Store({
    state: {
        count: 0,
        height: 0,
    },
    mutations: {
        increment(state) {
            state.count++
        },
        setHeight(state, n) {
            state.height += n;
        }
    }
})

const router = new VueRouter({
    mode: 'history',
    routes: routerconfig,
})

/* eslint-disable no-new */
new Vue({
    store,
    router,
    el: '#app',
    template: '<App/>',
    components: { App },
})
