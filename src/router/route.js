import { createWebHistory, createRouter} from "vue-router";

const routes = [
    {
      path: "/",
      component: () => import('../components/logging/Logging.vue'),
    },
    {
        path: "/home",
        component: () => import('../views/Welcome.vue'),
    },
    {
        path: "/register",
        component: () => import('../components/logging/Register.vue'),
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
    linkActiveClass: 'active'
})

export default router;