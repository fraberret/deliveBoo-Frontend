<script>
import axios from 'axios';

export default {
  name: 'HomePage',



  data() {
    return {

      base_api: 'http://127.0.0.1:8000/api',
      api_url: '/restaurants',
      restaurants: [],
      loading: false

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

  }

}
</script>


<template>
  <!-- <div class="search">

    <div class="searchbar">

      <i class="fa-solid fa-magnifying-glass"></i>
      <input v-model="searchTerm" type="search" placeholder="Cerca o inizia una nuova chat">

.    </div>
  </div> -->

</template>



<style></style>