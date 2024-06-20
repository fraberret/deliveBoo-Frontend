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
            selectedCousine: [],
            isRestaurants: false
        }
    },
    methods: {
        getRestaurants() {
            this.loading = false

            const url = this.base_api + this.api_url

            axios.get(url)
                .then(resp => {
                    this.restaurants = resp.data.results
                    this.loadGif()

                }).catch(err => console.error(err));
        },
        getCousines() {
            const url = this.base_api + this.api_cousines_url

            axios.get(url)
                .then(resp => {
                    this.cousines = resp.data.results
                }).catch(err => console.error(err))
        },
        // search bar filter
        // filterRestaurants() {
        //     this.loading = false

        //     const url = this.base_api + this.api_url + this.searchTerm

        //     axios.get(url)
        //         .then(resp => {
        //             this.filteredRestaurants = resp.data.results
        //             this.loadGif()

        //         }).catch(err => console.error(err))
        // },
        filterRestaurantsbyCousine() {
            this.isRestaurants = true
            this.loading = false
            const url = this.base_api + this.api_cousines_url + '/' + this.searchCuisines

            axios.get(url)
                .then(resp => {
                    this.filteredRestaurants = resp.data.results
                    this.loadGif()

                }).catch(err => console.error(err))
        },
        addCousineToSearch(cousine, i) {

            const index = this.searchCuisinesArray.indexOf(cousine);

            if (!this.searchCuisinesArray.includes(cousine)) {
                this.selectedCousine.push(i + 1)
                this.searchCuisinesArray.push(cousine);
            } else {
                this.selectedCousine.splice(index, 1)
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
        loadGif() {
            setTimeout(() => {
                this.loading = true
            }, 1000);
        }
    },
    mounted() {
        this.loading = true
        this.isRestaurants = false

        // this.isRestaurants = false
        // this.getRestaurants()
        this.getCousines()
    },
}
</script>


<template>
    <div class="container">

        <!-- <div class="search">
            <div class="searchbar">
                <i class="fa-solid fa-magnifying-glass"></i>
                <input @keyup="filterRestaurants" v-model.trim="searchTerm" type="search"
                    placeholder="Cerca o inizia una nuova chat">
            </div>
        </div> -->


        <template v-for="(cousine, index) in cousines" :key="cousine.id">
            <div :class="selectedCousine.includes(cousine.id) ? 'bg-dark' : 'bg-primary'"
                class="badge bg-primary mx-1 text-white text-dark" @click="addCousineToSearch(cousine.name, index)">
                {{ cousine.name }}
            </div>
        </template>
        <template v-if="!loading">
            <div class="gif">
                <img width="200" src="/img/logo-gif.gif" alt="">
                <h6 class="text-secondary">loading...</h6>
            </div>
        </template>

        <template v-else>

            <template v-if="isRestaurants">
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
                <div v-else>
                    <div class="restaurants">
                        <div class="p-5">
                            no restaurants...
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="p-5">

                    <h4>Select one ore more cousines to find restaurants...</h4>
                </div>
            </template>

        </template>
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

.gif {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 3rem 0;
    flex-direction: column;
    gap: 1rem;
    align-items: center;

    img {
        margin: auto;
    }
}

.badge {
    cursor: pointer;
}
</style>