export default [{
    path: '/',
    component: (resolve) => {
        require(['../src/views/home.vue'], resolve)
    }
}, {
    path: '/detail/:id',
    name: 'detail',
    component: (resolve) => {
        require(['../src/views/detail.vue'], resolve)
    }
}, {
    path: '/comments/:id',
    name: 'comments',
    component: (resolve) => {
        require(['../src/views/comments.vue'], resolve)
    }
}, {
    path: '/themes/:id',
    name: 'themes',
    component: (resolve) => {
        require(['../src/views/themes.vue'], resolve)
    }
}, {
    path: '/editor/:id',
    name: 'editor',
    component: (resolve) => {
        require(['../src/views/editor.vue'], resolve)
    }
}, ]