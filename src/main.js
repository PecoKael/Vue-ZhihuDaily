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

const Foo = { template: '<div>foosss</div>' }
const Bar = { template: '<div>bar</div>' }

const routes = [{
        path: '/',
        component: (resolve) => {
            require(['components/home.vue'], resolve)
        }
    }, {
        path: '/detail:id',
        name:'detail',
        component: (resolve) => {
            require(['components/detail.vue'], resolve)
        }
    },
]

const router = new VueRouter({
    routes: routes // （缩写）相当于 routes: routes
})


/* eslint-disable no-new */
new Vue({
    router,
    el: '#app',
    template: '<App/>',
    components: { App }
})
