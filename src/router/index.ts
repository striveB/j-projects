import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
    { 
        name: '首页',
        path: '/',
        component: () => import('@/pages/Home.vue')
    },
    {
        name: '五子棋',
        path: '/five-chess',
        component: () => import('@/pages/fiveinarow/Fiveinarow.vue')
    },
    {
        name: '颜色追踪',
        path: '/colors',
        component: () => import('@/pages/color/Colors.vue')
    }
]
const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router