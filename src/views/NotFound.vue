<script>
export default {
    name: 'NotFound'
}
</script>

<template>
    <main class="px-5 mx-4">
        <div class="error ">
            <h1 class="display-3 w-75">
                Sorry, couldn't find what you are looking for
            </h1>
        </div>
        <router-link class=" text-decoration-none btn btn-light mt-3" :to="{ name: 'home' }">
            Go Home, trust me
        </router-link>
        <div class="img">
            <img class="not-found-img" src="/img/logo-sad.png">
        </div>
    </main>
</template>

<style scoped>
.img {
    text-align: end;
    margin-right: 1rem;
}

.not-found-img {
    transform: scaleX(-1);
}

a{
    color:var(--boo-primary);
    border: 2px solid currentColor;
    font-size: 1.5rem ;
}

</style>