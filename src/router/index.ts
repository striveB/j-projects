import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
    { 
        name: '首页',
        path: '/',
        component: () => import('@/pages/Home.vue')
    },
    {
        name: '项目集',
        path: '/projects',
        component: () => import('@/pages/Projects.vue'),
        children: [
            {
                name: '五子棋',
                path: 'five-chess',
                component: () => import('@/pages/fiveinarow/Fiveinarow.vue')
            },
            {
                name: '颜色追踪',
                path: 'colors',
                component: () => import('@/pages/color/Colors.vue')
            },
            {
                name: '炫酷时钟',
                path: 'clock',
                component: () => import('@/pages/clock/Clock.vue')
            },
            {
                name: '文字游戏',
                path: 'text',
                component: () => import('@/pages/text/Text.vue')
            }
        ]
    }
]
const router = createRouter({
    routes,
    history: createWebHashHistory()
})

export default router