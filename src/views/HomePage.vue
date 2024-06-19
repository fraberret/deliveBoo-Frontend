<script>
import axios from 'axios';

export default {
    name: 'HomePage',
    data() {
        return {
            base_url: 'http://127.0.0.1:8000',
            base_api: 'http://127.0.0.1:8000/api',
            api_url: '/restaurants/',
            api_cousines_url: '/cousines',
            cousines: [],
            restaurants: [],
            filteredRestaurants: [],
            loading: false,
            searchTerm: '',

            searchCuisinesArray: [],
            searchCuisines: '',
            // isBadge: false
        }
    },
    methods: {
        getRestaurants() {
            const url = this.base_api + this.api_url

            axios.get(url)
                .then(resp => {
                    this.restaurants = resp.data.results
                    this.loading = true
                }).catch(err => console.error(err));
        },
        getCousines() {
            const url = this.base_api + this.api_cousines_url

            axios.get(url)
                .then(resp => {
                    this.cousines = resp.data.results
                    this.loading = true
                }).catch(err => console.error(err))
        },
        filterRestaurants() {
            const url = this.base_api + this.api_url + this.searchTerm

            axios.get(url)
                .then(resp => {
                    this.filteredRestaurants = resp.data.results
                    this.loading = true
                }).catch(err => console.error(err))
        },
        filterRestaurantsbyCousine() {
            const url = this.base_api + this.api_cousines_url + '/' + this.searchCuisines

            axios.get(url)
                .then(resp => {
                    this.filteredRestaurants = resp.data.results
                    this.loading = true
                    // console.log(this.filterRestaurants)
                }).catch(err => console.error(err))
        },
        addCousineToSearch(cousine) {
            // this.toggleBadge()

            const index = this.searchCuisinesArray.indexOf(cousine);

            if (!this.searchCuisinesArray.includes(cousine)) {
                this.searchCuisinesArray.push(cousine);
            } else {
                this.searchCuisinesArray.splice(index, 1);
            }

            this.searchCuisines = this.searchCuisinesArray.join(',');
            console.log(this.searchCuisines);

            if (this.searchCuisines) {
                this.filterRestaurantsbyCousine();
            } else {
                this.filteredRestaurants = []
            }
        },
        // toggleBadge() {
        //     this.isBadge = !this.isBadge
        // }
    },
    mounted() {
        this.getRestaurants()
        this.getCousines()
    },
}
</script>


<template>
    <div class="container">

        <div class="search">
            <div class="searchbar">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input @keyup="filterRestaurants" v-model.trim="searchTerm" type="search"
                    placeholder="Cerca o inizia una nuova chat">
            </div>
        </div>


        <template v-for="cousine in cousines" :key="cousine.id">
            <div class="badge bg-primary mx-1 text-white text-dark" @click="addCousineToSearch(cousine.name)">
                {{ cousine.name }}
            </div>
        </template>


        <div v-if="filteredRestaurants.length" class="restaurants">
            <div v-for="restaurant in filteredRestaurants" class="card">
                <router-link :to="{ name: 'singleRestaurant', params: { slug: restaurant.slug } }">
                    <template v-if="restaurant.logo && restaurant.logo.startsWith('uploads')">
                        <img :src="base_url + '/storage/' + restaurant.logo" alt="">
                    </template>
                    <template v-else-if="restaurant.logo && restaurant.logo.startsWith('/img/')">
                        <img :src="base_url + restaurant.logo" alt="">
                    </template>
                    <template v-else>
                        <img :src="restaurant.logo" alt="">
                    </template>
                    <h3>{{ restaurant.name }}</h3>
                </router-link>
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

            img {
                max-width: 100%;
                display: block;
            }
        }

    }
}
</style>