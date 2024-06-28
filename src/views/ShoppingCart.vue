<script>
import CheckoutForm from '../components/CheckoutForm.vue'
import { store } from '../store';
export default {
    name: 'ShoppingCart',
    components: {
        CheckoutForm
    },
    data() {
        return {
            store
        }
    },
    methods: {
        increaseQuantity(dishId) {
            let found = store.localCart.find(item => item.dishID === dishId);
            found.quantity++;
            store.cartQuantity++;
            localStorage.setItem('cart', JSON.stringify(store.localCart));
        },
        decreaseQuantity(dishId) {
            let found = store.localCart.find(item => item.dishID === dishId);
            if (found.quantity > 1) {
                found.quantity--
                store.cartQuantity--
                localStorage.setItem('cart', JSON.stringify(store.localCart));
            }
        },
        deleteItem(dishId) {
            let index = store.localCart.findIndex(item => item.dishID === dishId);
            let found = store.localCart.find(item => item.dishID === dishId);

            if (index !== -1) {
                store.cartQuantity -= found.quantity
                store.localCart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(store.localCart));
            }
        },
        deleteAll() {
            store.localCart = [];
            store.cartQuantity = 0
            localStorage.clear();
        }
    }
}
</script>

<template>
    <div class="container d-flex justify-content-center flex-column align-items-center">
        <template v-if="store.localCart.length > 0">

            <h2 class="mb-4">Your order to <Router-Link class="text-decoration-none"
                    :to="{ name: 'RestaurantMenu', params: { slug: store.localCart[0].restaurantSlug } }"
                    style="color: var(--boo-primary);">{{ store.localCart[0].nameRestaurant
                    }}</Router-Link></h2>

            <div v-for="item in store.localCart" :key="item.dishID" class="card mb-3 w-100 rounded-5 px-2">
                <div class="card-body d-flex justify-content-between align-items-center">
                    <div>
                        <h5 class="card-title">{{ item.name }}</h5>
                        <p class="card-text">Price: {{ item.price }}€</p>
                    </div>
                    <div class="d-flex flex-column justify-content-center gap-3">
                        <div class="btn-group" role="group" aria-label="Quantity controls">
                            <button class="btn btn-dark" @click="decreaseQuantity(item.dishID)"
                                v-if="item.quantity > 1">-</button>
                            <button class="btn btn-dark" @click="deleteItem(item.dishID)" v-if="item.quantity === 1"><i
                                    class="fa-solid fa-trash text-danger"></i></button>
                            <span class="mx-3 my-auto">{{ item.quantity }}</span>
                            <button class="btn btn-dark" @click="increaseQuantity(item.dishID)">+</button>
                        </div>
                        <div class="card-text text-center">Total: {{ (item.quantity * item.price).toFixed(2) }}€</div>
                    </div>
                </div>
            </div>

            <div class="card bg-dark text-white mb-3 w-100 rounded-5 px-3">
                <div class="card-body d-flex justify-content-between">
                    <h5 class="card-title" style="margin-bottom: 0;">Total Order</h5>
                    <h5 class="card-title" style="margin-bottom: 0;">{{ store.grandTotal().toFixed(2) }}€</h5>
                </div>
            </div>

            <div class="cart-buttons-box mb-4 px-5">

                <div class="cart-delete-box w-100">
                    <button class="buttons bg-danger" data-bs-toggle="modal" data-bs-target="#deleteAllModal"><i
                            class="fa-solid fa-trash me-2"></i>Delete All
                    </button>
                </div>
                <div class="cart-items-box w-100 justify-content-end gap-3">

                    <Router-Link class="text-decoration-none buttons btn_primary btn_back_to_restaurant"
                        :to="{ name: 'RestaurantMenu', params: { slug: store.localCart[0].restaurantSlug } }">Add more
                        Items
                    </Router-Link>
                    <CheckoutForm />
                </div>

            </div>

            <div class="modal fade" id="deleteAllModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
                role="dialog" aria-labelledby="deleteAllModalTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
                    <div class="modal-content rounded-5">
                        <div class="modal-header border-bottom-0">
                            <h5 class="modal-title" id="deleteAllModalTitle">Confirm Delete All Items</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">Are you sure you want to delete all items in the cart?</div>
                        <div class="modal-footer d-flex justify-content-between border-top-0">
                            <button type="button" class="btn bg-gray buttons" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" @click="deleteAll()" data-bs-dismiss="modal"
                                class="btn btn_primary buttons">Delete All</button>
                        </div>
                    </div>
                </div>
            </div>

        </template>
        <template v-else>
            <div class="alert alert-warning" role="alert">The cart is empty.</div>
        </template>
    </div>
</template>

<style>
.card {
    max-width: 1000px;
    margin-bottom: 10px;
}

.bg-danger {
    border: 3px rgb(220, 53, 69) solid !important;
    background-color: transparent !important;
    color: rgb(220, 53, 69) !important;
    transition: background-color 1s ease, color 1s ease;

    &:hover {
        background-color: rgb(220, 53, 69) !important;
        color: white !important;
    }
}

.cart-buttons-box {
    width: 100%;

    .buttons {
        width: 100%;
    }

    display: flex;
    flex-direction: column;
    justify-content: center;
}

.cart-delete-box {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}

.cart-items-box {
    display: flex;
    margin-top: 1rem;
    justify-content: center;
    flex-direction: column;
}

/* ** media query **  */

@media screen and (min-width: 480px) {
    .cart-buttons-box {

        .buttons {
            width: fit-content;
        }

        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

    .cart-items-box {
        flex-direction: row;
    }

    .cart-delete-box {
        margin-top: 1rem;
        justify-content: start;
    }
}
</style>