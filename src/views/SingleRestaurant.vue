<script>
import axios from 'axios';
export default {

    name: 'SingleRestaurant',

    data() {
        return {
            base_api: 'http://127.0.0.1:8000/api/restaurant/',
            base_restaurant_api: 'http://127.0.0.1:8000',

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

    <div class="container">
        <div class="col">
            <h1>{{ restaurant.name }}</h1>

            <template v-if="restaurant.logo && restaurant.logo.startsWith('uploads')">
                <img width="400" :src="base_restaurant_api + '/storage/' + restaurant.logo" alt="">
            </template>
            <template v-else-if="restaurant.logo && restaurant.logo.startsWith('/img/')">
                <img width="400" :src="base_restaurant_api + restaurant.logo" alt="">
            </template>
            <template v-else>
                <img width="400" :src="restaurant.logo" alt="">
            </template>

            <h3>{{ restaurant.piva }}</h3>
        </div>
    </div>

</template>



<style></style>