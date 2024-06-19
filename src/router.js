import { createWebHistory, createRouter } from 'vue-router'
import SingleRestaurant from './views/SingleRestaurant.vue';
// import NotFound from './views/NotFound.vue';
import HomePage from './views/HomePage.vue';




const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/restaurant/:slug',
        name: 'singleRestaurant',
        component: SingleRestaurant
    },
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'notFound',
    //     component: NotFound
    // }
    ]
})

export default router;