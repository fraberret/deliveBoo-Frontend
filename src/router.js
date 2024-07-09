import { createWebHistory, createRouter } from 'vue-router'
import NotFound from './views/NotFound.vue';
import HomePage from './views/HomePage.vue';
import ShoppingCart from './views/ShoppingCart.vue';
import RestaurantMenu from './views/RestaurantMenu.vue';
import OrderInfo from './views/OrderInfo.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        name: 'home',
        component: HomePage,
    },
    {
        path: '/restaurant/:slug',
        name: 'RestaurantMenu',
        component: RestaurantMenu
    },
    {
        path: '/cart',
        name: 'cart',
        component: ShoppingCart
    },
    {
        path: '/order',
        name: 'orderInfo',
        component: OrderInfo,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notFound',
        component: NotFound
    }]
})

export default router;