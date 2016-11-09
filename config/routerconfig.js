export default [{
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