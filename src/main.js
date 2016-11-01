import Vue from 'vue'
import App from './App'
import Mint from 'mint-ui'
import VueRouter from 'vue-router'
import VueHttp from 'vue-resource'
import 'mint-ui/lib/style.css';
import './assets/iconfont/iconfont.css'
Vue.use(Mint);
Vue.use(VueRouter);
Vue.use(VueHttp);
Vue.http.options.xhr = { withCredentials: true }

const routes = [{
    path: '/',
    component: (resolve) => {
        require(['components/home.vue'], resolve)
    }
}, {
    path: '/detail/:id',
    name: 'detail',
    component: (resolve) => {
        require(['components/detail.vue'], resolve)
    }
}, {
    path: '/comments/:id',
    name: 'comments',
    component: (resolve) => {
        require(['components/comments.vue'], resolve)
    }
},{
    path: '/themes/:id',
    name: 'themes',
    component: (resolve) => {
        require(['components/themes.vue'], resolve)
    }
},]

const router = new VueRouter({
    routes: routes // （缩写）相当于 routes: routes
})

Vue.prototype.$replaceSrc = (url) => {
    return String(url).replace(/http\w{0,1}:\/\/p/g, 'https://images.weserv.nl/?url=p');
}

/* eslint-disable no-new */
new Vue({
    router,
    el: '#app',
    template: '<App/>',
    components: { App },
})
