<script>

import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }

}
</script>

<template>

  <AppHeader></AppHeader>


  <main>
    <RouterView />
  </main>

  <AppFooter></AppFooter>

</template>

<style></style>
