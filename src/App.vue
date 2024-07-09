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
    }
}
</script>

<template>
    <PageLoader></PageLoader>

    <AppHeader></AppHeader>

    <main>
        <RouterView />
    </main>

    <AppFooter></AppFooter>
</template>

<style></style>
