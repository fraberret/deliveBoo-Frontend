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
    <div class="container">
        <template v-if="store.localCart.length > 0">

            <h2 class="mb-4">Your order to <span class="text-warning">{{ store.localCart[0].nameRestaurant }}</span>
            </h2>

            <table class="table table-striped table-hover table-bordered">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col" class="w-35">Name</th>
                        <th scope="col" class="w-15">Price</th>
                        <th scope="col" class="w-35">Quantity</th>
                        <th scope="col" class="w-15">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in store.localCart" :key="item.dishID">
                        <td>{{ item.name }}</td>
                        <td>{{ item.price }}€</td>
                        <td class="d-flex align-items-center">
                            <button class="btn btn-dark" @click="decreaseQuantity(item.dishID)"
                                v-if="item.quantity > 1">-</button>
                            <button class="btn btn-danger" @click="deleteItem(item.dishID)"
                                v-if="item.quantity === 1"><i class="fa-solid fa-trash"></i></button>
                            <span class="mx-3 w-2">{{ item.quantity }}</span>
                            <button class="btn btn-dark ms-1" @click="increaseQuantity(item.dishID)">+</button>

                        </td>
                        <td>
                            <div class="singleTotal">{{ (item.quantity * item.price).toFixed(2) }}€</div>
                        </td>
                    </tr>
                    <tr class="table-dark">
                        <th colspan="3" class="text-right">Total Order</th>
                        <td>{{ store.grandTotal().toFixed(2) }}€</td>
                    </tr>
                </tbody>
            </table>

            <div class="d-flex justify-content-between align-items-center ">
                <button class="border-0 p-4 buttons bg-danger text-white" @click="deleteAll()"><i
                        class="fa-solid fa-trash"></i>  Delete All</button>

                <CheckoutForm />
            </div>


        </template>
        <template v-else>
            <div class="alert alert-warning" role="alert">
                The cart is empty.
            </div>
        </template>
    </div>

</template>

<style>
.w-2 {
    width: 2%;
}

.w-15 {
    width: 15%;
}

.w-35 {
    width: 35%;
}

.btn {
    transition: transform 2s ease;
}
</style>