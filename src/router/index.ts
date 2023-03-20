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
            },
            {
                name: '移动的小球',
                path: 'moveball',
                component: () => import('@/pages/moveBall/MoveBall.vue')
            },
            {
                name: '牛了个B',
                path: 'yang',
                component: () => import('@/pages/yang/Yang.vue')
            },
            {
                name: '拼图',
                path: 'pt',
                component: () => import('@/pages/pt/Pt.vue')
            },
            {
                name: '数字滚动',
                path: 'number',
                component: () => import('@/pages/number/Number.vue')
            },
            {
                name: '小汽车',
                path: 'cars',
                component: () => import('@/pages/cars/Cars.vue')
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