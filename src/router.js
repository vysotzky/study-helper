import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '',
            name: 'Browse',
            component: () => import('./pages/Browse.vue'),
        },
        {
            path: '/create',
            name: 'Create',
            component: () => import('./pages/Create.vue'),
        }
    ],
})