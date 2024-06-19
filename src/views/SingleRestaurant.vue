<script>
import axios from 'axios';
export default {

    name: 'SingleRestaurant',

    data() {
        return {
            base_api: 'http://127.0.0.1:8000/api/restaurant/',
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

    <h1>{{ restaurant.name }}</h1>

</template>



<style></style>