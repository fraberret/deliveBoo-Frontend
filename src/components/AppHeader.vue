<script>
export default {
    name: 'AppHeader'
}
</script>


<template>
    <header>
        <nav class="navbar navbar-expand-md navbar-light py-4 mb-5">
            <div class="container">
                <router-link :to="{ name: 'home' }" class="navbar-brand d-flex align-items-center" href="">
                    <div class="logo_laravel ps-2">
                        <img src="/img/logo-deliveboo.png" alt="app logo">
                    </div>
                </router-link>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                    <ul class="navbar-nav ms-auto">

                        <li class="nav-item">
                            <a class="nav-link nav_link px-4" href="http://localhost:8000/login">I own a place</a>
                        </li>

                        <!-- <li class="nav-item">
                            <a class="nav-link nav_link px-4" href="">Ciao</a>
                        </li> -->

                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>



<style></style>