import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
export const routes: RouteRecordRaw[] = [
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
                meta:{
                    icon: 'Aim',
                },
                component: () => import('@/pages/fiveinarow/Fiveinarow.vue')
            },
            {
                name: '颜色追踪',
                path: 'colors',
                meta:{
                    icon: 'Brush',
                },
                component: () => import('@/pages/color/Colors.vue')
            },
            {
                name: '炫酷时钟',
                path: 'clock',
                meta:{
                    icon: 'Clock',
                },
                component: () => import('@/pages/clock/Clock.vue')
            },
            {
                name: '文字游戏',
                path: 'text',
                meta:{
                    icon: 'WindPower',
                },
                component: () => import('@/pages/text/Text.vue')
            },
            {
                name: '按钮',
                path: 'buttons',
                meta:{
                    icon: 'Pointer',
                },
                component: () => import('@/pages/buttons/Buttons.vue')
            },
            {
                name: '移动的小球',
                path: 'moveball',
                meta:{
                    icon: 'Football',
                },
                component: () => import('@/pages/moveBall/MoveBall.vue')
            },
            {
                name: '牛了个B',
                path: 'yang',
                meta:{
                    icon: 'Star',
                },
                component: () => import('@/pages/yang/Yang.vue')
            },
            {
                name: '拼图',
                path: 'pt',
                meta:{
                    icon: 'Grid',
                },
                component: () => import('@/pages/pt/Pt.vue')
            },
            // {
            //     name: '数字滚动',
            //     path: 'number',
            //     meta:{
            //         icon: 'Pointer',
            //     },
            //     component: () => import('@/pages/number/Number.vue')
            // },
            {
                name: '小汽车',
                path: 'cars',
                meta:{
                    icon: 'Odometer',
                },
                component: () => import('@/pages/cars/Cars.vue')
            },
            {
                name: 'nice-page',
                path: 'nicepage',
                meta:{
                    icon: 'Tickets',
                },
                component: () => import('@/pages/nicepage/NicePage.vue')
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