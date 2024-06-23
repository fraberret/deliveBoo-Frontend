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
            found.quantity++
            store.cartQuantity++

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
        <table class="table table-striped table-hover table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Dish</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity
                    </th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in store.localCart" :key="item.dishID">
                    <td>{{ item.name }}</td>
                    <td>{{ item.price }}€</td>
                    <td class="d-flex align-items-center">
                        <button class="btn btn-dark" @click="decreaseQuantity(item.dishID)">-</button>
                        <button class="btn btn-dark ms-1" @click="increaseQuantity(item.dishID)">+</button>
                        <span class="ms-3">{{ item.quantity }}</span>
                        <button class="ms-auto btn btn-danger" @click="deleteItem(item.dishID)">delete</button>
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
    </div>

</template>

<script></script>