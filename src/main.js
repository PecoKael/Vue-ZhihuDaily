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
}, {
    path: '/themes/:id',
    name: 'themes',
    component: (resolve) => {
        require(['components/themes.vue'], resolve)
    }
}, {
    path: '/editor/:id',
    name: 'editor',
    component: (resolve) => {
        require(['components/editor.vue'], resolve)
    }
}, ]

const router = new VueRouter({
    routes: routes 
})

Vue.prototype.$getDateStr = (day) => {
    var dd = new Date();
    dd.setDate(dd.getDate() + day);
    var y = dd.getFullYear();
    var m = dd.getMonth() + 1;
    if (m < 10) {
        m = '0' + m;
    }
    var d = dd.getDate();
    if (d < 10) {
        d = '0' + d;
    }
    return y + '' + m + '' + d;
}

Vue.filter("getDays", function(value) {
    var week = new Date(value.slice(0, 4) + '/' + value.slice(4, 6) + '/' + value.slice(6, 8)).getDay();
    var dayMap = {
        '0': '星期日',
        '1': '星期一',
        '2': '星期二',
        '3': '星期三',
        '4': '星期四',
        '5': '星期五',
        '6': '星期六',
    }
    return value.slice(4, 6) + '月' + value.slice(6, 8) + '日 ' + dayMap[week];
});

/* eslint-disable no-new */
new Vue({
    router,
    el: '#app',
    template: '<App/>',
    components: { App },
})
