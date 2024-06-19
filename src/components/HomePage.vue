<script>
import axios from 'axios';

export default {
  name: 'HomePage',



  data() {
    return {

      base_api: 'http://127.0.0.1:8000/api',
      api_url: '/restaurants',
      api_cousines_url: '/cousines',
      restaurants: [],
      cousines: [],
      loading: false

    }
  },
  methods: {
    getRestaurants() {
      const url = this.base_api + this.api_url
      axios
        .get(url)
        .then(resp => {
          this.restaurants = resp.data.results
          this.loading = true
          /* console.log(this.restaurants) */

        })
        .catch(err => console.error(err));

    },

    getCousines() {
      const url = this.base_api + this.api_cousines_url
      console.log(url);
      axios
      
        .get(url)
        .then(resp => {
          this.cousines = resp.data.results
          this.loading = true
          console.log(this.cousines)

        })
        .catch(err => console.error(err))
    }
  },

  mounted() {
    this.getRestaurants(),
    this.getCousines()

  }

}
</script>


<template>
  <div class="container">

    <div class="search">

      <div class="searchbar">

        <i class="fa-solid fa-magnifying-glass"></i>
        <input v-model="searchTerm" type="search" placeholder="Cerca o inizia una nuova chat">

        
      </div>
    </div>
    <div v-for="cousine in cousines" class="badge text-dark">{{ cousine.name }}</div>
  </div>

</template>



<style lang="css" scoped>
.container {
  height: 100vh;
}
</style>