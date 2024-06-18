<script>
import axios from 'axios';

export default {
    name: 'HomePage',
    data() {
        return {
            base_api: 'http://127.0.0.1:8000/api',
            api_url: '/restaurants/',
            restaurants: [],
            filteredRestaurants: [],
            loading: false,
            searchTerm: ''
        }
    },
    mounted() {
        const url = this.base_api + this.api_url
        axios
            .get(url)
            .then(resp => {
                this.restaurants = resp.data.results
                this.loading = true
                /* console.log(this.restaurants) */

            })
            .catch(err => console.error(err))
    },
    methods: {
        filterRestaurants() {
            const url = this.base_api + this.api_url + this.searchTerm
            axios
                .get(url)
                .then(resp => {
                    this.filteredRestaurants = resp.data.results
                    this.loading = true
                    /* console.log(this.restaurants) */

                })
                .catch(err => console.error(err))

        },

    }
}
</script>


<template>
    <div class="container">

        <div class="search">
            <div class="searchbar">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input @keyup="filterRestaurants" v-model="searchTerm" type="search"
                    placeholder="Cerca o inizia una nuova chat">
            </div>
        </div>

        <div class="restaurants">
            <div v-for="restaurant in filteredRestaurants" class="card">
                <h3>{{ restaurant.name }}</h3>
            </div>
        </div>

    </div>

</template>



<style>
.container {
    width: 90%;
    margin: auto;
    max-width: 1280px;

    .restaurants {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        width: 100%;

        .card {
            width: calc(100% / 3 - 1rem);
            height: 300px;
        }

    }
}
</style>