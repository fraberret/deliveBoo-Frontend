<script>
import axios from 'axios';
import AppBanner from '../components/AppBanner.vue';
import { store } from '../store.js'

export default {
    name: 'RestaurantMenu',
    data() {
        return {
            store,
            base_url: 'http://127.0.0.1:8000',
            base_api: 'http://127.0.0.1:8000/api/restaurant/',
            base_restaurant_api: 'http://127.0.0.1:8000',
            success: '',
            message: '',
            restaurant: {},
            loading: true,
            currentQuantity: 0,
            showModal: false
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

                    if (resp.data.success) {
                        this.restaurant = resp.data.response
                        this.success = resp.data.success
                        this.message = resp.data.message
                        this.loading = false

                    } else {
                        this.loading = false
                        this.$router.push({ name: 'notFound' })
                    }
                })
                .catch(err => console.error(err))

        },
        addToCart(dish, currentRestaurantId) {

            if (store.localCart.length > 0 && store.localCart[0].restaurantId !== currentRestaurantId) {
                this.showModal = true;
                return;
            }

            let found = store.localCart.find(item => item.dishID === dish.id);

            if (found) {
                found.quantity++
                store.cartQuantity++
            } else {
                store.cartQuantity++
                store.localCart.push({ restaurantId: currentRestaurantId, dishID: dish.id, nameRestaurant: this.restaurant.name, name: dish.name, price: dish.price, quantity: 1, restaurantSlug: this.restaurant.slug });
            }

            localStorage.setItem('cart', JSON.stringify(store.localCart));
            // this.$forceUpdate();
        },
        removeFromCart(dishId, currentRestaurantId) {

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
        },
        switchRestaurant() {
            store.localCart = [];
            localStorage.clear();
            store.cartQuantity = 0
        },
        getImageSrc(image) {
            if (image && image.startsWith('uploads')) {
                return this.base_url + '/storage/' + image;
            } else if (image && image.startsWith('/img/')) {
                return this.base_url + image;
            } else if (!image) {
                return '/img/default.png';
            }
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
                        <img :src="getImageSrc(restaurant.logo)" alt="Restaurant Logo">
                    </div>
                    <div class="restaurant_info">
                        <div class="text text-center">
                            <h5>{{ restaurant.name }}</h5>
                            <!-- <img width="26" src="/img/social/whatsapp.png" alt="whatsapp icon"> -->
                            <div class="info">
                                <div class="cousines">
                                    <h6>cousines</h6>
                                    <span class="cousine" v-for="(cousine, index) in restaurant.cousines"
                                        :key="cousine.id">{{
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
                        </div>
                        <div class="socials">
                            <a href=""><img src="/img/social/instagram.png" alt="instagram icon"></a>
                            <a href=""><img src="/img/social/facebook.png" alt="facebook icon"></a>
                            <a href=""><img src="/img/social/x.png" alt="x icon"></a>
                        </div>
                    </div>
                </div>
            </div>
            <!-- DISHES -->
            <div class="right">
                <div class="dishes" v-if="restaurant.dishes.length > 0">
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
                                        <img :src="getImageSrc(dish.cover_image)" alt="Restaurant Logo">
                                    </div>
                                </div>
                            </div>
                            <div class="bottom">
                            </div>
                            <div class="actions">

                                <!-- Modal trigger button -->
                                <div v-if="store.localCart.length > 0 && store.localCart[0].restaurantId !== restaurant.id"
                                    type="button" data-bs-toggle="modal" data-bs-target="#modalId"
                                    class="buttons bg-gray">Add to Cart
                                </div>

                                <div v-else @click="addToCart(dish, restaurant.id)"
                                    class="buttons btn_primary d-flex gap-2">
                                    <i class="fa-solid fa-plus" v-if="getCurrentQuantity(dish.id) > 0"></i>Add to
                                    Cart
                                </div>

                                <div v-if="getCurrentQuantity(dish.id) > 0"
                                    @click="removeFromCart(dish.id, restaurant.id)" class="buttons btn_negative"><i
                                        class="fa-solid fa-minus"></i></div>
                                <div v-if="getCurrentQuantity(dish.id) > 0" class="counter">{{
                                    getCurrentQuantity(dish.id) }} <small class="text-secondary">pz.</small></div>
                                <!-- <img width="" src="/img/cart-icon.png" alt="cart icon"> -->
                            </div>
                        </div>
                        <div v-else class="no_visible">
                            <div class="dish_card no_visible">
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
                                            <img :src="getImageSrc(dish.cover_image)" alt="Restaurant Logo">
                                        </div>
                                    </div>
                                </div>
                                <div class="bottom">
                                </div>
                                <div class="actions">

                                    <div v-if="dish.visible" class="if-visible">


                                        <!-- Modal trigger button -->
                                        <div v-if="store.localCart.length > 0 && store.localCart[0].restaurantId !== restaurant.id"
                                            type="button" data-bs-toggle="modal" data-bs-target="#modalId"
                                            class="buttons bg-gray">Add to Cart
                                        </div>

                                        <div v-else @click="addToCart(dish, restaurant.id)" class="buttons btn_primary">
                                            Add
                                            to
                                            Cart
                                        </div>

                                        <div v-if="getCurrentQuantity(dish.id) > 0"
                                            @click="removeFromCart(dish.id, restaurant.id)"
                                            class="buttons btn_negative"><i class="fa-solid fa-minus"></i></div>
                                        <div v-if="getCurrentQuantity(dish.id) > 0" class="counter">
                                            {{ getCurrentQuantity(dish.id) }} <small class="text-secondary">pz.</small>
                                        </div>
                                        <!-- <img width="" src="/img/cart-icon.png" alt="cart icon"> -->
                                    </div>
                                    <div v-else class="" style="height: 56px;">
                                        <!-- no need of add to cart button -->
                                    </div>
                                </div>

                            </div>
                            <div class="not_available">
                                <h2>Not Available</h2>
                            </div>
                        </div>
                    </template>

                </div>
                <div class="no_menu d-flex flex-column align-items-center justify-content-center p-5" v-else>
                    <img src="/img/logo-sad.png" alt="" width="500">
                    <h2 class="text-center">Sorry, there are no dishes at the moment in this restaurant</h2>
                </div>
            </div>

        </div>
    </template>
    <template v-else>
        <h1>{{ message }}</h1>
    </template>


    <!-- Modal Body -->
    <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
    <div class="modal fade" id="modalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"
        aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div class="modal-content p-3 rounded-5">
                <div class="modal-header border-bottom-0">
                    <h5 class="modal-title" id="modalTitleId">
                        Different Restaurant Item Selected!
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body pb-5">
                    You have items from a different restaurant. If you click <b>Confirm</b>, you will empty your cart
                    and
                    you'll be able to order from this restaurant.
                </div>
                <div class="modal-footer d-flex justify-content-between border-top-0">
                    <button type="button" class="btn bg-gray buttons" data-bs-dismiss="modal">
                        Cancel
                    </button>
                    <button type="button" class="btn btn_primary buttons" @click="switchRestaurant()"
                        data-bs-dismiss="modal">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    </div>

</template>



<style>
#menu {
    display: flex;

    .left {
        width: 380px;
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
            aspect-ratio: 1;
            margin: auto;
            overflow: hidden;
            border-radius: 50%;
            margin-bottom: 2rem;

            img {
                width: 100%;
                height: 100%;
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

    .no_menu {
        /* position: absolute;
            top: 0;
            left: 0; */
        width: 100%;
        background-color: var(--boo-gray-800);
        color: var(--boo-lighter);
        border-radius: 2rem;
        height: 880px;
    }

    .dishes {
        overflow-y: auto;
        scrollbar-width: thin;
        height: 880px;
        border-radius: 1rem;
        padding-right: 2rem;
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
                min-height: 300px;
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
                        aspect-ratio: 1;
                        /* top: 1rem; */
                        right: 0rem;
                        position: absolute;
                        border-radius: 50%;
                        overflow: hidden;
                        box-shadow: 10px 20px 20px rgba(0, 0, 0, 0.381);

                        img {
                            width: 100%;
                            height: 100%;
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

                .counter {
                    margin-left: 1rem;
                }

                .btn_negative {
                    background-color: var(--boo-primary);
                    border: none;
                    padding-inline: 0;
                    width: 3.5rem;

                    &:hover {
                        border: none;
                        border-color: aqua;
                    }
                }
            }
        }

        .no_visible {
            position: relative;

            .dish_card {
                filter: brightness(.2) opacity(.8) grayscale();
            }

            .not_available {
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;

                h2 {
                    color: var(--boo-lighter);
                    opacity: 1;
                    font-size: 1.5rem;
                }
            }
        }

    }
}



/* media queries ---------------------------------------->  */

@media screen and (max-width: 1400px) {
    #menu {
        flex-direction: column;

        .left {
            width: 100%;
            padding-right: 0rem;
        }

        .vertical_banner {
            /* height: 350px; */
            display: flex;
            padding: 4rem 2rem;
            z-index: 3;


            .image {
                width: 200px;
                margin: auto;
                overflow: hidden;
                border-radius: 50%;

                img {
                    width: 100%;
                    object-fit: cover;
                }
            }

            .restaurant_info {
                flex-grow: 1;
            }

            .text {
                padding: 0 2rem;

                .info {
                    display: flex;
                    gap: 3rem;
                    align-items: center;
                    justify-content: center;
                    border-top: 1px solid var(--boo-gray-400);
                    border-bottom: 1px solid var(--boo-gray-400);
                }

                div {
                    margin: 1.8rem 0;
                }
            }

            .socials {
                position: static;
                margin-bottom: 0;
            }
        }

        .right {
            position: relative;

            &::after {
                position: absolute;
                border-radius: 2rem;
                content: '';
                width: 80%;
                right: 8rem;
                height: 100px;
                top: -120px;
                z-index: 1;
                box-shadow: 0px 50px 30px rgba(0, 0, 0, 0.345);
            }
        }

        .dishes {
            padding-top: 2rem;
            padding-left: 8rem;
            padding-right: 8rem;

            .dish_card {
                .actions {

                    .counter {
                        margin-left: 1rem;
                    }
                }
            }
        }
    }

    .confirm-modal {
        width: 50%;
    }
}

.bg-gray {
    border: 3px gray solid !important;
    background-color: transparent !important;
    color: gray !important;
    transition: background-color 1s ease, color 1s ease;
}

@media screen and (max-width: 1200px) {
    #menu {
        flex-direction: column;

        .right {
            position: relative;

            &::after {
                position: absolute;
                border-radius: 2rem;
                content: '';
                width: 92%;
                right: 2rem;
                height: 100px;
                top: -120px;
                z-index: 1;
                box-shadow: 0px 50px 30px rgba(0, 0, 0, 0.345);
            }
        }

        .dishes {
            padding-top: 2rem;
            padding-left: 2rem;
            padding-right: 3rem;


        }
    }
}

@media screen and (max-width: 920px) {
    #menu {

        .vertical_banner {
            display: flex;
            flex-direction: column;
            padding: 2rem 2rem;
            z-index: 3;


            .image {
                width: 200px;
                margin: auto;
                overflow: hidden;
                border-radius: 50%;

                img {
                    width: 100%;
                    object-fit: cover;
                }
            }

            .restaurant_info {
                flex-grow: 1;
            }

            .text {
                padding: 0 2rem;
                margin-top: 1rem;

                .info {
                    display: flex;
                    gap: 3rem;
                    align-items: center;
                    justify-content: center;
                    border-top: 1px solid var(--boo-gray-400);
                    border-bottom: 1px solid var(--boo-gray-400);
                }

                div {
                    margin: 1.8rem 0;
                }
            }

            .socials {
                position: static;
            }
        }

        .dishes {
            padding-right: 2rem;

            .dish_card {


                .top {

                    .card_left {
                        padding-right: 4rem;

                        h5 {
                            font-size: 1.8rem;
                        }

                        p {
                            font-size: 1rem;
                            line-height: 1.5rem;
                        }

                        .ingredients {
                            h6 {
                                font-size: 1.2rem;
                            }

                            p {
                                font-size: 1rem;
                                line-height: 1.6rem;
                            }
                        }
                    }

                    .card_right {


                        .image {
                            width: 280px;
                        }
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 760px) {
    .confirm-modal {
        justify-content: center;
        margin: auto
    }

    #menu {

        .left {
            padding-right: 0rem;
        }

        .vertical_banner {

            .image {
                width: 200px;
                margin: auto;
                overflow: hidden;
                border-radius: 50%;

                img {
                    width: 100%;
                    object-fit: cover;
                }
            }

            .text {

                .info {
                    margin: 2rem 0;
                    padding: 1rem 0;
                    display: flex;
                    flex-direction: column;
                    gap: 0rem;
                }

                div {
                    margin: .8rem 0;
                }
            }

            .socials {
                position: static;
            }
        }

        .right {

            &::after {
                display: none;
            }
        }

        .dishes {
            padding-left: 0;
            overflow-y: visible;
            height: 100%;
            padding-right: 0;

            .dish_card {

                .actions {
                    justify-content: center;
                    padding: 1.8rem 1rem;

                    .counter {
                        margin-left: .5rem;
                    }
                }

                .top {
                    flex-direction: column-reverse;

                    .card_left {
                        text-align: center;
                        width: 100%;
                        margin: auto;
                        display: flex;
                        justify-content: center;
                        text-align: center;
                        padding: 0;

                        h5 {
                            font-size: 2rem;
                        }

                        p {
                            font-size: 1.2rem;
                            line-height: 1.8rem;
                            margin-top: 1rem;
                        }

                        .ingredients {

                            h6 {
                                letter-spacing: 2.25px;
                                font-size: 1.5rem;
                            }

                            p {
                                font-size: 1rem;
                                line-height: 1.5rem;
                            }
                        }
                    }

                    .card_right {
                        width: 100%;
                        height: 250px;


                        /* .price {
                            right: 3rem;
                        } */

                        .image {
                            width: 215px;
                            top: 0;
                            left: 0;
                            right: 0rem;
                            margin: auto;
                        }
                    }
                }
            }
        }
    }

    .confirm-modal {
        width: 75%;
    }
}
</style>