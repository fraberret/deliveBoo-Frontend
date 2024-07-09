<script>
import axios from 'axios';
import AppBanner from '../components/AppBanner.vue';
import HomeVideo from '../components/HomeVideo.vue';


export default {
    name: 'HomePage',
    data() {
        return {
            base_url: 'http://127.0.0.1:8000',
            api_restaurants_url: '/api/restaurants/',
            api_cousines_url: '/api/cousines',
            cousines: [],
            restaurants: [],
            filteredRestaurants: [],
            isLoading: false,
            searchTerm: '',
            searchCuisinesArray: [],
            searchCuisines: '',
            selectedCousine: [],
            isFilteredRestaurants: false,
            isRestaurants: true,
            allSelected: false
        }
    },
    components: {
        AppBanner,
        HomeVideo
    },
    methods: {
        getAllRestaurants() {
            this.selectedCousine = []
            this.searchCuisinesArray = []
            this.isLoading = true
            this.allSelected = true
            this.isRestaurants = true
            this.isFilteredRestaurants = false
            const url = this.base_url + this.api_restaurants_url

            axios.get(url)
                .then(resp => {
                    this.restaurants = resp.data.results
                    this.loadGif()

                }).catch(err => console.error(err));
        },
        getCousines() {
            const url = this.base_url + this.api_cousines_url

            axios.get(url)
                .then(resp => {
                    this.cousines = resp.data.results
                }).catch(err => console.error(err))
        },
        // search bar filter
        // filterRestaurants() {
        //  this.isLoading = true
        //     const url = this.base_url + this.api_restaurants_url + this.searchTerm
        //     axios.get(url)
        //         .then(resp => {
        //             this.filteredRestaurants = resp.data.results
        //             this.loadGif()

        //         }).catch(err => console.error(err))
        // },
        filterRestaurantsbyCousine() {
            this.allSelected = false
            this.isRestaurants = false
            this.isFilteredRestaurants = true
            this.isLoading = true

            const url = this.base_url + this.api_cousines_url + '/' + this.searchCuisines

            axios.get(url)
                .then(resp => {
                    this.filteredRestaurants = resp.data.results
                    this.loadGif()

                }).catch(err => console.error(err))
        },
        addCousineToSearch(cousine, i) {
            this.allSelected = false
            const index = this.searchCuisinesArray.indexOf(cousine);

            if (!this.searchCuisinesArray.includes(cousine)) {
                this.selectedCousine.push(i + 1)
                this.searchCuisinesArray.push(cousine);
            } else {
                this.selectedCousine.splice(index, 1)
                this.searchCuisinesArray.splice(index, 1);
            }

            this.searchCuisines = this.searchCuisinesArray.join(',');

            if (this.searchCuisines) {
                this.filterRestaurantsbyCousine();
            } else {
                this.filteredRestaurants = []
            }
        },
        loadGif() {
            setTimeout(() => {
                this.isLoading = false
            }, 500);
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
        this.getAllRestaurants()
        this.getCousines()
    },
}
</script>


<template>
    <HomeVideo />
    <!-- <div class="search">
    <div class="searchbar">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input @keyup="filterRestaurants" v-model.trim="searchTerm" type="search"
            placeholder="Cerca un ristorante">
    </div>
     </div> -->

    <div class="container search_section">
        <AppBanner title="Chose a restaurant by selecting one or more cousine " subTitle="our restaurants" />

        <div class="search_container">
            <div class="cousines">
                <div class="cousine">
                    <div class="cousine_btn" @click="getAllRestaurants()"
                        :class="allSelected === true ? 'cousine_btn_selected' : 'cousine_btn_unselected'">
                        <img :src="allSelected == true ? '/img/logo-deliveboo-small-white.png' : '/img/logo-deliveboo-small.png'"
                            alt="small logo"> <span>All</span>
                    </div>
                </div>
                <div class="cousine" v-for="(cousine, index) in cousines" :key="cousine.id">
                    <div class="cousine_btn" @click="addCousineToSearch(cousine.name, index)"
                        :class="selectedCousine.includes(cousine.id) ? 'cousine_btn_selected' : 'cousine_btn_unselected'">
                        <img :src="selectedCousine.includes(cousine.id) ? '/img/logo-deliveboo-small-white.png' : '/img/logo-deliveboo-small.png'"
                            alt="small logo"> <span> {{ cousine.name }}</span>
                    </div>
                </div>
            </div>

            <div class="restaurants">
                <div class="restaurant_count text-end">
                    <div v-if="allSelected" class="count">
                        <h4> Restaurants found: </h4>
                        <span> {{ restaurants.length }}</span>
                    </div>
                    <div v-else-if="filteredRestaurants.length == 0" class="count">
                        <h4>Restaurants found: </h4>
                        <span>{{ filteredRestaurants.length }}</span>
                    </div>
                    <div v-else class="count">
                        <h4>Restaurants found: </h4>
                        <span>{{ filteredRestaurants.length }}</span>
                    </div>
                </div>
                <div v-if="isLoading" class="gif">
                    <img width="200" src="/img/logo-gif.gif" alt="">
                    <h6 class="text-secondary">Loading..</h6>
                </div>
                <template v-else>
                    <template v-if="isRestaurants">
                        <div v-if="restaurants.length" :class="restaurants.length > 6 && 'pe_3'"
                            class="restaurants_container w-100">
                            <div v-for="restaurant in restaurants" class="restaurant_card">
                                <router-link class="router_link"
                                    :to="{ name: 'RestaurantMenu', params: { slug: restaurant.slug } }">
                                    <div class="top">
                                        <img :src="getImageSrc(restaurant.logo)" alt="Restaurant Logo">
                                    </div>
                                    <div class="bottom">
                                        <h6>{{ restaurant.name }}</h6>
                                        <div class="badges">
                                            <div v-for="cousine in restaurant.cousines" :key="cousine.id"
                                                :class="[searchCuisinesArray.includes(cousine.name) ? 'badge_light' : 'badge_dark']">
                                                {{ cousine.name }}
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </template>
                    <template v-if="isFilteredRestaurants">
                        <div v-if="filteredRestaurants.length" :class="filteredRestaurants.length > 6 && 'pe_3'"
                            class="restaurants_container w-100">
                            <div v-for="restaurant in filteredRestaurants" class="restaurant_card">
                                <router-link class="router_link"
                                    :to="{ name: 'RestaurantMenu', params: { slug: restaurant.slug } }">
                                    <div class="top">
                                        <img :src="getImageSrc(restaurant.logo)" alt="Restaurant Logo">
                                    </div>

                                    <div class="bottom">
                                        <h6>{{ restaurant.name }}</h6>
                                        <div class="badges">
                                            <div v-for="cousine in restaurant.cousines" :key="cousine.id"
                                                :class="[searchCuisinesArray.includes(cousine.name) ? 'badge_light' : 'badge_dark']">
                                                {{ cousine.name }}
                                            </div>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                        <div v-else-if="isFilteredRestaurants && selectedCousine.length != 0" class="no_restaurants">
                            <img width="150" src="/img/logo-sad.png" alt="">
                            <h4>No restaurants found for this selection</h4>
                            <h6>Keep searching</h6>
                        </div>
                    </template>
                    <div v-if="selectedCousine.length === 0 && !allSelected" class="p-5">
                        <h4>Select one ore more cousines to find restaurants...</h4>
                    </div>
                </template>
            </div>
        </div>
        <!-- <hr> -->
    </div>
</template>

<style>
.search_section {
    margin-top: -12rem;
}

.pe_3 {
    padding-right: 1.2rem;
}

.no_restaurants {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 1rem;

    img {
        margin-top: 2.5rem;
    }

    h4 {
        /* color: var(--boo-gray-500); */
        font-weight: 400;
        margin-top: 1rem;
        margin-bottom: 0;
        text-align: center;
    }

    h6 {
        color: var(--boo-primary);
    }
}

.search_container {
    display: flex;
    margin-top: 5rem;
    margin-bottom: 5rem;
    max-height: 800px;

    .cousines {
        /* width: 300px; */
        width: 25%;
        /* flex-shrink: 0; */
        padding-right: 2rem;
        overflow-y: scroll;
        scrollbar-width: thin;
        scrollbar-color: var(--boo-primary) rgb(255, 255, 255);
        margin-right: 1.3rem;

        .cousine {
            /* background-color: red; */
            height: 65px;
            display: flex;
            margin-bottom: 1.5rem;
            user-select: none;

            .cousine_btn {
                width: 100%;
                border-radius: 40px;
                display: flex;
                align-items: center;
                padding-left: 2.2rem;
                padding-right: 1.5rem;
                height: 100%;
                font-size: 1.1rem;
                cursor: pointer;
                transition: all .25s ease;

                img {
                    width: 28px;
                    margin-right: .8rem;
                }
            }

            .cousine_btn_unselected {
                border: 1px solid transparent;
                background-color: transparent;
                transition: all .25s ease;

                &:hover {
                    /* border: 1px solid var(--boo-primary); */
                    border: 1px solid var(--boo-secondary-light);
                    background-color: var(--boo-secondary-light);
                }
            }

            .cousine_btn_selected {
                border: 1px solid var(--boo-primary);
                background-color: var(--boo-primary);
                color: var(--boo-lighter);
            }
        }
    }

    .restaurants {
        width: 85%;
        /* flex-grow: 1; */
        display: flex;
        position: relative;


        .restaurant_count {
            position: absolute;
            z-index: 1;
            right: 8px;
            top: -3.4rem;

            .count {
                display: flex;
                width: 100%;
                align-items: center;

                h4 {
                    font-weight: 400;
                    font-size: 1rem;
                    color: var(--boo-gray-400);
                    margin-bottom: 0;
                    margin-right: .5rem;
                }

                span {
                    color: var(--boo-gray-800);
                    font-weight: 400;
                    font-size: .9rem;
                    background-color: var(--boo-gray-700);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 32px;
                    height: 32px;
                    padding-top: 1px;
                    border-radius: 50%;
                    color: var(--boo-lighter);
                }
            }

        }

        .restaurants_container {
            overflow-y: auto;
            gap: 1rem;
            display: flex;
            flex-wrap: wrap;
            scrollbar-width: thin;
            scrollbar-color: var(--boo-primary) rgb(255, 255, 255);

            .router_link {
                text-decoration: none;
            }

            .restaurant_card {
                width: calc((100% / 3) - (2rem / 3));
                border-radius: 2rem;
                overflow: hidden;
                height: fit-content;
                /* border: 2px solid var(--boo-gray-400); */
                height: calc(50% - 1rem);

                .top {
                    /* max-height: 290px; */
                    overflow: hidden;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 75%;


                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        /* object-position: center; */
                        display: block;
                        filter: saturate(0.5) brightness(0.9);
                        transition: all .5s ease;

                        &:hover {
                            filter: saturate(1) brightness(1);
                            transform: scale(1.2) rotate(-10deg);
                        }
                    }
                }

                .bottom {
                    height: 25%;
                    background-color: var(--boo-gray-800);
                    padding: 1rem 2rem 1.4rem 2rem;
                    /* border-top: 1px solid var(--boo-gray-600); */

                    h6 {
                        text-decoration: none;
                        color: var(--boo-gray-300);
                        font-size: 1.2rem;
                        font-weight: 400;
                        letter-spacing: 1px;
                        padding-left: 2px;
                        padding-bottom: 2px;
                        white-space: nowrap;
                    }

                    .badges {
                        display: flex;
                        gap: .4rem;

                        .badge_dark,
                        .badge_light {
                            padding-inline: .6rem;
                            border-radius: 30px;
                            color: var(--boo-lighter);
                            font-size: 0.7rem;
                            font-weight: 500;
                            height: 26px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background-color: var(--boo-primary);
                        }

                        .badge_light {
                            color: var(--boo-lighter);
                            background-color: var(--boo-secondary-dark);
                            border: 1px solid var(--boo-secondary-dark);
                            color: var(--boo-gray-800);
                        }

                        .badge_dark {
                            color: var(--boo-lighter);
                            border: 1px solid var(--boo-gray-600);
                            background-color: transparent;
                            color: var(--boo-gray-500);
                        }
                    }
                }
            }
        }
    }
}

.gif {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    padding: 3rem 0;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
}

.badge {
    cursor: pointer;
    transition: 1s ease;
    background-color: var(--boo-primary);

    &:hover {
        background-color: var(--boo-gray-700) !important;
    }
}

/* media queries ---------------------------------------->  */

@media screen and (max-width: 1400px) {

    .search_container {

        .cousines {
            width: 25%;
            padding-right: 1rem;
            margin-bottom: 3rem;
        }

        .restaurants {
            width: 75%;
        }
    }
}

@media screen and (max-width: 1200px) {
    .banner {
        margin-bottom: -2rem;
    }

    .search_container {
        display: flex;
        flex-direction: column;
        max-height: 100%;

        .cousines {
            height: 400px;
            width: 100%;
            padding-right: 8rem;
            margin-bottom: 5rem;
            overflow-y: scroll;
            scrollbar-width: thin;
            scrollbar-color: var(--boo-primary) rgb(255, 255, 255);
            /* scrollbar-color: var(--boo-primary) rgb(247, 247, 247); */
            margin-right: 2rem;

            .cousine {
                /* background-color: red; */
                height: 65px;
                display: flex;
                margin-bottom: 1.5rem;
                user-select: none;

                .cousine_btn {
                    width: 100%;
                    border-radius: 40px;
                    display: flex;
                    align-items: center;
                    padding-left: 2.2rem;
                    padding-right: 1.5rem;
                    height: 100%;
                    font-size: 1.1rem;
                    cursor: pointer;
                    transition: all .25s ease;

                    img {
                        width: 28px;
                        margin-right: .8rem;
                    }
                }

                .cousine_btn_unselected {
                    border: 1px solid transparent;
                    background-color: transparent;
                    transition: all .25s ease;

                    &:hover {
                        /* border: 1px solid var(--boo-primary); */
                        border: 1px solid var(--boo-secondary-light);
                        background-color: var(--boo-secondary-light);
                    }
                }

                .cousine_btn_selected {
                    border: 1px solid var(--boo-primary);
                    background-color: var(--boo-primary);
                    color: var(--boo-lighter);
                }
            }
        }



        .restaurants {
            width: 100%;
            display: flex;

            .restaurants_container {
                gap: 2rem;

                .restaurant_card {
                    width: calc((100% / 2) - 1rem);
                    height: fit-content;

                    .top {
                        aspect-ratio: 1;
                    }

                    .bottom {
                        padding: 2rem 2rem 2rem 2rem;

                        h6 {
                            font-size: 1.8rem;
                        }

                        .badges {

                            .badge_dark,
                            .badge_light {
                                padding-inline: 1.2rem;
                                border-radius: 35px;
                                font-size: 1.2rem;
                                font-weight: 500;
                                height: 35px;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 900px) {

    .search_container {
        .restaurants {
            .restaurants_container {
                gap: 1rem;

                .restaurant_card {
                    width: calc((100% / 2) - .5rem);

                    .bottom {
                        padding: 1.5rem 2rem 1.5rem 2rem;

                        h6 {
                            font-size: 1.2rem;
                        }

                        .badges {

                            .badge_dark,
                            .badge_light {
                                padding-inline: 1rem;
                                border-radius: 30px;
                                font-size: 1rem;
                                height: 34px;
                            }
                        }
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 676px) {

    .search_container {
        .cousines {
            padding-right: 1rem;
        }

        .restaurants {
            .restaurants_container {
                gap: 1rem;

                .restaurant_card {
                    width: 100%;

                    .top {
                        aspect-ratio: 1;
                    }

                    .bottom {

                        h6 {
                            font-size: 1.2rem;
                        }

                        .badges {
                            display: flex;
                            flex-wrap: wrap;
                            gap: .4rem;

                            .badge_dark,
                            .badge_light {
                                padding-inline: 1rem;
                                border-radius: 35px;
                                font-size: 1rem;
                                height: 35px;
                            }
                        }
                    }

                }
            }
        }
    }


    .pe_3 {
        padding-right: 0rem;
    }
}
</style>