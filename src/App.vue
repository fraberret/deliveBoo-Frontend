<script>

import HomePage from './components/HomePage.vue';
import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    HomePage,
    AppHeader,
    AppFooter
  }

}
</script>

<template>

  <AppHeader></AppHeader>


  <main>
    <HomePage></HomePage>
  </main>

  <AppFooter></AppFooter>

</template>

<style></style>
