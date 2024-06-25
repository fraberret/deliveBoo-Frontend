<script>

import AppHeader from './components/AppHeader.vue';
import AppFooter from './components/AppFooter.vue';
import PageLoader from './components/PageLoader.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter,
    PageLoader
  },
  data() {
    return {
      showLoader: false
    };
  },
  beforeRouteEnter(to, from, next) {
    if (to.path === '/') {
      next(vm => {
        vm.showLoader = true;
      });
    } else {
      next(vm => {
        vm.showLoader = false;
      });
    }
  }

}
</script>

<template>
  <PageLoader v-if="showLoader"></PageLoader>

  <AppHeader></AppHeader>

  <main>
    <RouterView />
  </main>

  <AppFooter></AppFooter>
</template>

<style></style>
