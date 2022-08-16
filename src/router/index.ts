import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: RouteRecordRaw[] = [
    { 
        name: '首页',
        path: '/',
        meta: {
            title: '项目集'
        },
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
            },
            {
                name: '按钮',
                path: 'buttons',
                component: () => import('@/pages/buttons/Buttons.vue')
            }
        ]
    }
]
const router = createRouter({
    routes,
    history: createWebHashHistory()
})

router.beforeEach((to, form, next) => {
    const { name, meta } = to
    if(meta && meta.title) {
        window.document.title = meta.title as string
    } else {
        window.document.title = name as string
    }
    next()
})

export default router