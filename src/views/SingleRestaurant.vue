<script>
import axios from 'axios';
import AppBanner from '../components/AppBanner.vue';

export default {

    name: 'SingleRestaurant',

    data() {
        return {
            base_api: 'http://127.0.0.1:8000/api/restaurant/',
            base_restaurant_api: 'http://127.0.0.1:8000',
            success: '',
            message: '',
            restaurant: {},
            loading: true,
            cart: []
        }
    },
    components: {
        AppBanner
    },
    methods: {
        callRestaurant() {
            const url = this.base_api + this.$route.params.slug
            console.log(url);
            axios
                .get(url)
                .then(resp => {
                    // console.log(resp.data);
                    this.restaurant = resp.data.response
                    this.success = resp.data.success
                    this.message = resp.data.message
                    this.loading = false
                    /* console.log(this.restaurants) */

                })
                .catch(err => console.error(err))

        },
        addToCart(dish) {
            let localCart = localStorage.getItem('cart');

            if (localCart === null) {
                localCart = [];
            } else {
                localCart = JSON.parse(localCart);
            }

            let found = localCart.find(item => item.dish.id === dish.id);

            if (found) {
                found.quantity++;
            } else {
                localCart.push({ dish: dish, quantity: 1 });
            }

            localStorage.setItem('cart', JSON.stringify(localCart));
        },
        removeFromCart(dishId) {

            let localCart = localStorage.getItem('cart');

            if (localCart === null) {
                localCart = [];
            } else {
                localCart = JSON.parse(localCart);
            }

            let index = localCart.findIndex(item => item.dish.id === dishId);

            if (index !== -1) {
                localCart[index].quantity--;

                if (localCart[index].quantity <= 0) {
                    JSON.parse(localCart).splice(index, 1);
                }
            }

            localStorage.setItem('cart', JSON.stringify(localCart));
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
        <div class="container">
            <AppBanner :title="restaurant.name" subTitle="Our Menu" routeName="home" />
            <div class="row align-items-center my-4">
                <div class="col-md-6 mb-3 mb-md-0">


                    <template v-if="restaurant.logo && restaurant.logo.startsWith('uploads')">
                        <img class="img-fluid rounded" width="400"
                            :src="base_restaurant_api + '/storage/' + restaurant.logo" alt="Restaurant Logo">
                    </template>
                    <template v-else-if="restaurant.logo && restaurant.logo.startsWith('/img/')">
                        <img class="img-fluid rounded" width="400" :src="base_restaurant_api + restaurant.logo"
                            alt="Restaurant Logo">
                    </template>
                    <template v-else>
                        <img class="img-fluid rounded" width="400" :src="restaurant.logo" alt="Restaurant Logo">
                    </template>


                </div>
                <div class="col-md-6">
                    <!-- <h1><b>Name:</b> {{ restaurant.name }}</h1> -->
                    <h2><b>Address:</b> {{ restaurant.address }}</h2>

                    <h6><b>P.Iva:</b> {{ restaurant.piva }}</h6>
                    <div><b>Telephone Number: </b> {{ restaurant.telephone_number }}</div>
                </div>
            </div>

            <h2 class="my-3">Menu</h2>
            <div class="row">

                <div class="col-12 col-sm-6 col-md-4 mb-4" v-for="dish in restaurant.dishes">

                    <div class="card h-100">
                        <template v-if="dish.cover_image && dish.cover_image.startsWith('uploads')">
                            <img class="card-img-top rounded-circle"
                                :src="base_restaurant_api + '/storage/' + dish.cover_image" alt="Dish">
                        </template>
                        <template v-else-if="dish.cover_image && dish.cover_image.startsWith('/img/')">
                            <img class="card-img-top rounded-circle" :src="base_restaurant_api + dish.cover_image"
                                alt="Dish">
                        </template>
                        <template v-else>
                            <img class="card-img-top rounded-circle" :src="dish.cover_image" alt="Dish">
                        </template>

                        <div class="card-body">
                            <h3 class="card-title">{{ dish.name }}</h3>
                            <template v-if="dish.description">
                                <p class="card-text"><b>Description: </b> {{ dish.description }}</p>
                            </template>
                            <h4 class="card-subtitle mb-2 text-muted"><b>Price:</b> {{ dish.price }}€</h4>
                            <template v-if="dish.ingredients">
                                <p class="card-text"><b>Ingredients: </b> {{ dish.ingredients }}</p>
                            </template>
                            <div @click="addToCart(dish)" class="btn btn-primary">Add To Cart</div>
                            <div @click="removeFromCart(dish.id)" class="btn btn-secondary">Remove Cart</div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    </template>
    <template v-else>
        <h1>{{ message }}</h1>
    </template>

</template>



<style></style>