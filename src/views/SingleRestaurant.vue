<script>
import axios from 'axios';
export default {

    name: 'SingleRestaurant',

    data() {
        return {
            base_api: 'http://127.0.0.1:8000/api/restaurant/',
            base_restaurant_api: 'http://127.0.0.1:8000',
            success: '',
            message: '',
            restaurant: {}

        }
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
                    this.loading = true
                    /* console.log(this.restaurants) */

                })
                .catch(err => console.error(err))

        }
    },
    mounted() {
        this.callRestaurant()

    }
}
</script>


<template>

    <template v-if="success">
        <div class="container">
            <div class="d-flex align-items-center">
                <div class="col-6">


                    <template v-if="restaurant.logo && restaurant.logo.startsWith('uploads')">
                        <img width="400" :src="base_restaurant_api + '/storage/' + restaurant.logo" alt="">
                    </template>
                    <template v-else-if="restaurant.logo && restaurant.logo.startsWith('/img/')">
                        <img width="400" :src="base_restaurant_api + restaurant.logo" alt="">
                    </template>
                    <template v-else>
                        <img width="400" :src="restaurant.logo" alt="">
                    </template>


                </div>
                <div class="col-6">
                    <h1>Name: {{ restaurant.name }}</h1>
                    <h2>Address: {{ restaurant.address }}</h2>

                    <h3>P.Iva: {{ restaurant.piva }}</h3>
                    <div><strong>Telephone Number: </strong> {{ restaurant.telephone_number }}</div>
                </div>
            </div>

            <h2>Menu</h2>
            <div class="row row-cols-3">

                <div class="card" v-for="dish in restaurant.dishes">
                    <template v-if="dish.cover_image && dish.cover_image.startsWith('uploads')">
                        <img class="card-img-top" :src="base_restaurant_api + '/storage/' + dish.cover_image" alt="">
                    </template>
                    <template v-else-if="dish.cover_image && dish.cover_image.startsWith('/img/')">
                        <img class="card-img-top" :src="base_restaurant_api + dish.cover_image" alt="">
                    </template>
                    <template v-else>
                        <img class="card-img-top" :src="dish.cover_image" alt="">
                    </template>

                    <div class="card-body">
                        <h3>{{ dish.name }}</h3>
                        <template v-if="dish.description">
                            <p><strong>Description: </strong> {{ dish.description }}</p>
                        </template>
                        <h4>Price: {{ dish.price }}</h4>
                        <template v-if="dish.ingredients">
                            <p><strong>Ingredients: </strong> {{ dish.ingredients }}</p>
                        </template>
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