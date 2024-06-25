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
            if (store.cartQuantity < 5) {
                found.quantity++;
                store.cartQuantity++;
                localStorage.setItem('cart', JSON.stringify(store.localCart));
            } else {
                alert("You cannot buy more than 5 items of this type.");
            }
        },
        decreaseQuantity(dishId) {
            let found = store.localCart.find(item => item.dishID === dishId);
            if (found.quantity > 1) {
                found.quantity--
                store.cartQuantity--
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
        }
    }
}
</script>

<template>
    <div class="container">

        

        <h2 class="mb-4">Your order to <span class="text-warning">{{ store.localCart[1].nameRestaurant }}</span></h2>

        <template v-if="store.localCart.length > 0">
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
                            <button class="btn btn-dark" @click="decreaseQuantity(item.dishID)">-</button>
                            <span class="mx-3 w-2">{{ item.quantity }}</span>
                            <button class="btn btn-dark ms-1" @click="increaseQuantity(item.dishID)">+</button>
                            <button class="ms-auto btn btn-danger" @click="deleteItem(item.dishID)"><i
                                    class="fa-solid fa-trash"></i></button>
                        </td>
                        <td>
                            <div class="singleTotal">{{ (item.quantity * item.price).toFixed(2) }}€</div>
                        </td>
                    </tr>
                    <tr class="table-dark">
                        <th colspan="3" class="text-right">Grand Total</th>
                        <td>{{ store.grandTotal().toFixed(2) }}€</td>
                    </tr>
                </tbody>
            </table>

            <CheckoutForm />
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
</style>