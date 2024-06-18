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
  <div v-for="restaurant in restaurants">

    <h3>{{ restaurant.name }}</h3>

  </div>

</template>



<style></style>