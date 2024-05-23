import { createWebHistory, createRouter} from "vue-router";
import store from "../store/index.js";
import HomeBackground from '../layout/HomeBackground.vue';

const routes = [
    {
        path: '/',
        component: HomeBackground,
        children: [
            {
                path: "/",
                component: () => import('../components/logging/Logging.vue'),
            },
            {
                path: "/register",
                component: () => import('../components/logging/Register.vue'),
            },
        ]
    },

    {
        path: "/mainLayout",
        component: () => import('../layout/MainLayout.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
    linkActiveClass: 'active'
})

router.beforeEach((to,from,next)=>{
    //在每次路由切換之前，檢查Token的有效性
    store.dispatch('auth/checkToken');
    next();
})

export default router;