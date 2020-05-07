import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


export default new Router({
    mode: 'history',
    routes: [
        {
            path: '*',
            name: '404',
            redirect: {name: 'Browse'}
        },
        {
            path: '',
            name: 'Browse',
            component: () => import('./pages/Browse.vue'),
        },
        {
            path: '/create',
            name: 'Create',
            component: () => import('./pages/Create.vue'),
        },
        {
            path: '/test',
            name: 'Test',
            component: () => import('./pages/Test.vue'),
        }
    ],
})