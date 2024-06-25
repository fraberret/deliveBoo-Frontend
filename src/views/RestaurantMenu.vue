<script>
import axios from 'axios';
import AppBanner from '../components/AppBanner.vue';
import { store } from '../store.js'

export default {
    name: 'RestaurantMenu',
    data() {
        return {
            store,
            base_api: 'http://127.0.0.1:8000/api/restaurant/',
            base_restaurant_api: 'http://127.0.0.1:8000',
            success: '',
            message: '',
            restaurant: {},
            loading: true,
            currentQuantity: 0,
        }
    },
    components: {
        AppBanner
    },
    methods: {
        callRestaurant() {
            const url = this.base_api + this.$route.params.slug
            axios
                .get(url)
                .then(resp => {
                    this.restaurant = resp.data.response
                    this.success = resp.data.success
                    this.message = resp.data.message
                    this.loading = false
                })
                .catch(err => console.error(err))

        },
        addToCart(dish, currentRestaurantId) {
            if (store.cartQuantity >= 5) {
                alert('You cannot add more than 5 items to the cart.');
                return;
            }

            if (store.localCart.length > 0 && store.localCart[0].restaurantId !== currentRestaurantId) {
                alert('You can only buy from one restaurant at a time.');
                return;
            }

            let found = store.localCart.find(item => item.dishID === dish.id);

            if (found) {
                found.quantity++
                store.cartQuantity++
            } else {
                store.cartQuantity++
                store.localCart.push({ restaurantId: currentRestaurantId, dishID: dish.id, nameRestaurant: this.restaurant.name, name: dish.name, price: dish.price, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(store.localCart));
            // this.$forceUpdate();
        },
        removeFromCart(dishId, currentRestaurantId) {
            if (store.localCart.length > 0 && store.localCart[0].restaurantId !== currentRestaurantId) {
                alert('You can only buy from one restaurant at a time.');
                return;
            }
            let found = store.localCart.find(item => item.dishID === dishId);

            if (found && store.cartQuantity > 0) {
                store.cartQuantity--
            }

            let index = store.localCart.findIndex(item => item.dishID === dishId);

            if (index !== -1) {
                store.localCart[index].quantity--;

                if (store.localCart[index].quantity <= 0) {
                    store.localCart.splice(index, 1);
                }
            }

            localStorage.setItem('cart', JSON.stringify(store.localCart));
            // this.$forceUpdate();
        },
        getCurrentQuantity(id) {
            let found = store.localCart.find(item => item.dishID === id);
            return found ? found.quantity : 0;
        }
    },
    mounted() {
        this.callRestaurant()
    }
}
</script>


<template>
    <template v-if="loading">
        <div class="gif">
            <img width="200" src="/img/logo-gif.gif" alt="">
            <h6 class="text-secondary">Loading..</h6>
        </div>
    </template>

    <template v-if="success">
        <div id="menu" class="container">

            <!-- <AppBanner :title="restaurant.name" subTitle="Our Menu" routeName="home" /> -->
            <!-- RESTAURANT INFO -->
            <div class="left">
                <div class="vertical_banner">
                    <router-link class="back_home" :to="{ name: 'home' }">
                        <img src="/img/back-gray.png" alt="go back icon">
                    </router-link>
                    <div class="image">
                        <img v-if="restaurant.logo && restaurant.logo.startsWith('uploads')"
                            :src="base_restaurant_api + '/storage/' + restaurant.logo" alt="Restaurant Logo">
                        <img v-else-if="restaurant.logo && restaurant.logo.startsWith('/img/')"
                            :src="base_restaurant_api + restaurant.logo" alt="Restaurant Logo">
                        <img v-else :src="restaurant.logo" alt="Restaurant Logo">
                    </div>
                    <div class="text text-center">
                        <h5>{{ restaurant.name }}</h5>
                        <img width="26" src="/img/social/whatsapp.png" alt="whatsapp icon">
                        <div class="cousines">
                            <h6>cousines</h6>
                            <span class="cousine" v-for="(cousine, index) in restaurant.cousines" :key="cousine.id">{{
                                cousine.name }}<span v-if="index < restaurant.cousines.length - 1">, </span>
                            </span>
                        </div>
                        <div class="telephone">
                            <h6>telephone</h6>
                            <span>{{ restaurant.telephone_number }}</span>
                        </div>
                        <div class="address">
                            <h6>address</h6>
                            <span>{{ restaurant.address }}</span>
                        </div>
                    </div>
                    <div class="socials">
                        <a href=""><img src="/img/social/instagram.png" alt="instagram icon"></a>
                        <a href=""><img src="/img/social/facebook.png" alt="facebook icon"></a>
                        <a href=""><img src="/img/social/x.png" alt="x icon"></a>
                    </div>
                </div>
            </div>
            <!-- DISHES -->
            <div class="right">
                <div class="dishes">
                    <template v-for="dish in restaurant.dishes" :key="dish.id">

                        <div class="dish_card" v-if="dish.visible">
                            <div class="top">
                                <div class="card_left">
                                    <div>
                                        <h5>{{ dish.name }}</h5>
                                        <p>{{ dish.description }}</p>
                                    </div>
                                    <div class="ingredients">
                                        <h6>ingredients</h6>
                                        <p>{{ dish.ingredients }}</p>
                                    </div>
                                </div>
                                <div class="card_right">
                                    <div class="price">
                                        <h5>{{ dish.price }}</h5><span>&#8364;</span>
                                    </div>
                                    <div class="image">
                                        <img v-if="dish.cover_image && dish.cover_image.startsWith('uploads')"
                                            :src="base_restaurant_api + '/storage/' + dish.cover_image" alt="Dish">

                                        <img v-else-if="dish.cover_image && dish.cover_image.startsWith('/img/')"
                                            :src="base_restaurant_api + dish.cover_image" alt="Dish">

                                        <img v-else :src="dish.cover_image" alt="Dish">
                                    </div>
                                </div>
                            </div>
                            <div class="bottom">
                            </div>
                            <div class="actions">
                                <div @click="addToCart(dish, restaurant.id)" class="buttons btn_primary">Add to Cart
                                </div>
                                <div v-if="getCurrentQuantity(dish.id) > 0"
                                    @click="removeFromCart(dish.id, restaurant.id)" class="buttons btn_negative"><i
                                        class="fa-solid fa-minus"></i></div>
                                <div v-if="getCurrentQuantity(dish.id) > 0" class="counter ms-3">{{
                                    getCurrentQuantity(dish.id) }} <small class="text-secondary">pz.</small></div>
                                <!-- <img width="" src="/img/cart-icon.png" alt="cart icon"> -->
                            </div>
                        </div>

                    </template>

                </div>
            </div>
        </div>
    </template>
    <template v-else>
        <h1>{{ message }}</h1>
    </template>

</template>



<style>
#menu {
    display: flex;

    .left {
        width: 350px;
        padding-right: 2rem;
    }

    .right {
        flex: 1;
        position: relative;
    }

    .vertical_banner {
        height: 100%;
        background-color: var(--boo-secondary-light);
        border-radius: 2rem;
        padding: 2rem 0;
        transition: transform .45s ease;
        position: relative;

        .back_home {
            position: absolute;
            top: 3rem;
            left: 0rem;
            transform: translateX(-50%);
            width: 60px;
            aspect-ratio: 1;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 4px solid var(--boo-secondary-light);
            background-color: white;
            transition: background-color .25s ease, filter .1s ease;

            &:hover {
                background-color: var(--boo-gray-800);
            }

            &:hover img {
                filter: invert();
            }
        }

        .image {
            width: 200px;
            margin: auto;
            overflow: hidden;
            border-radius: 50%;
            margin-bottom: 2rem;

            img {
                width: 100%;
                object-fit: cover;
            }
        }

        .text {
            margin-bottom: auto;

            div {
                margin: 2rem 0;
            }

            h5 {
                padding-bottom: 1rem;
            }

            h6 {
                letter-spacing: 2.25px;
                color: var(--boo-primary);
                text-transform: uppercase;
            }
        }

        .socials {
            position: absolute;
            bottom: 4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 2rem;
            width: 100%;

        }
    }

    .dishes {
        overflow-y: auto;
        scrollbar-width: thin;
        height: 880px;
        border-radius: 1rem;
        padding-right: 1rem;
        /* scrollbar-color: var(--boo-primary) var(--boo-secondary-light); */
        scrollbar-color: var(--boo-primary) transparent;

        .dish_card {
            position: relative;
            color: var(--boo-lighter);
            margin-bottom: 2rem;

            .top {
                border-radius: 2rem;
                padding: 2.5rem 3.5rem;
                background-color: var(--boo-gray-800);
                box-shadow: 0px 10px 8px rgba(0, 0, 0, 0.381);
                display: flex;
                min-height: 320px;
                z-index: 0;

                .card_left {
                    width: 50%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    gap: 2rem;
                    padding-right: 1rem;

                    h5 {
                        font-weight: 400;
                        letter-spacing: 1px;
                        font-size: 1.6rem;

                        font-family: "Rubik", sans-serif;
                    }

                    p {
                        color: var(--boo-gray-400);
                        font-size: .75rem;
                        font-weight: 300;
                        line-height: 1.3rem;
                    }

                    .ingredients {
                        h6 {
                            letter-spacing: 2.25px;
                            color: var(--boo-primary);
                            text-transform: uppercase;
                        }

                        p {
                            color: var(--boo-gray-400);
                            font-size: .75rem;
                            line-height: 1.2rem;
                            margin-bottom: 0;
                        }
                    }
                }

                .card_right {
                    width: 50%;
                    position: relative;

                    .price {
                        position: absolute;
                        background-color: var(--boo-secondary-dark);
                        width: 100px;
                        aspect-ratio: 1;
                        border-radius: 50%;
                        z-index: 1;
                        right: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        color: var(--boo-gray-800);
                        box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.381);

                        h5 {
                            font-size: 1.3rem;
                            font-weight: 600;
                            margin-bottom: 0;
                            margin-right: 3px;
                        }
                    }

                    .image {
                        width: 330px;
                        /* top: 1rem; */
                        right: 0rem;
                        position: absolute;
                        border-radius: 50%;
                        overflow: hidden;
                        box-shadow: 10px 20px 20px rgba(0, 0, 0, 0.381);

                        img {
                            width: 100%;
                            object-fit: cover;
                            transition: transform 2s ease;

                            &:hover {
                                transform: rotate(45deg);
                            }
                        }
                    }
                }
            }

            .bottom {
                position: absolute;
                width: 100%;
                height: 180px;
                z-index: -1;
                border-radius: 2rem;
                transform: translateY(-4rem);
                background-color: var(--boo-darker);
            }

            .actions {
                display: flex;
                gap: .5rem;
                width: 100%;
                padding: 1.8rem 3rem;
                align-items: center;

                .btn_negative {
                    padding-inline: 0;
                    width: 3.5rem;
                }
            }
        }
    }
}
</style>