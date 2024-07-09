<script>
import { store } from '../store';
export default {
    name: 'AppHeader',
    data() {
        return {
            store,
            imgSrc: ''
        }
    },
    methods: {
        changeLogo() {
            window.innerWidth < 676 ? this.imgSrc = '/img/logo-ghost.png' : this.imgSrc = '/img/logo-deliveboo.png';
        }
    },
    mounted() {
        store.localCart.forEach(item => {
            store.cartQuantity += item.quantity
        });
        this.cartQuantity = store.localCart.reduce((sum, item) => sum + item.quantity, 0);

        this.changeLogo()

        window.addEventListener('resize', () => {
            this.changeLogo()
        });

    },
}
</script>


<template>
    <header>
        <nav class="container">
            <router-link class="logo" :to="{ name: 'home' }">
                <img :src="imgSrc" alt="app logo">
            </router-link>
            <div class="nav_links">

            </div>
            <div class="actions">
                <router-link class="cart" :to="{ name: 'cart' }">
                    <img src="/img/cart-icon.png" alt="cart icon">
                    <div v-if="store.cartQuantity > 0" class="cartCounter">
                        <small>{{ store.cartQuantity }}</small>
                    </div>
                </router-link>
                <a class="buttons btn_primary" target="_blank" href="http://localhost:8000/">I own a place</a>
            </div>
        </nav>
    </header>

</template>



<style scoped>
header {
    margin-bottom: 3rem;

    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.25rem 0;

        .logo img {
            transition: transform 0.3s ease-in-out;
        }

        .logo img:hover {
            transform: scale(1.05);
        }

        .nav_links {
            display: flex;
            align-items: center;
            gap: 3rem;

            .nav_link {
                color: var(--boo-gray-700);
                text-decoration: none;
                font-weight: 500;
                letter-spacing: .5px;
                font-size: .9rem;
                position: relative;
                display: flex;
                justify-content: center;

                &:hover {
                    color: var(--boo-darker);
                }

                &::after {
                    content: '';
                    top: 2rem;
                    position: absolute;
                    width: 4px;
                    aspect-ratio: 1;
                    border-radius: 50%;
                    background-color: transparent;
                    transition: background-color .2s ease;
                }

                &:hover::after {
                    background-color: var(--boo-gray-600);
                }
            }
        }

        .actions {
            display: flex;
            align-items: center;
            gap: 2rem;

            .cart {
                position: relative;

                .cartCounter {
                    position: absolute;
                    width: 21px;
                    height: 21px;
                    border-radius: 50%;
                    top: 13px;
                    left: 10px;
                    font-size: 13px;
                    background-color: var(--boo-primary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--boo-lighter);
                }

                img:hover {
                    transform: scale(1.05);
                }
            }


            .btn_primary {
                font-size: 0.9rem;
                height: 3rem;
                font-weight: 300;
                padding-inline: 1.6rem;
                text-decoration: none;
            }
        }
    }
}
</style>