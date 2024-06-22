<script>
import BraintreeUi from '../components/BraintreeUi.vue'
import { store } from '../store';
export default {
    name: 'ShoppingCart',
    components: {
        BraintreeUi
    },
    data() {
        return {
            store
        }
    },
    methods: {
        calculateTotal(item) {
            return item.quantity * item.price;
        },
        increaseQuantity(dishId) {
            let found = store.localCart.find(item => item.dishID === dishId);
            found.quantity++
            store.cartQuantity++

        },
        decreaseQuantity(dishId) {
            let found = store.localCart.find(item => item.dishID === dishId);
            if (found.quantity > 0) {
                found.quantity--
                store.cartQuantity--
            }
        }
    },
    computed: {
        megaTotal() {
            let total = 0;
            for (let item of store.localCart) {
                total += this.calculateTotal(item);
            }
            return total;
        }
    },
}
</script>

<template>

    <div class="container">
        <table class="table table-striped table-hover table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity
                    </th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in store.localCart" :key="item.dishID">
                    <th scope="row">{{ item.dishID }}</th>
                    <td>{{ item.price }}€</td>
                    <td>
                        <button class="btn btn-dark" @click="decreaseQuantity(item.dishID)">-</button>
                        <button class="btn btn-dark ms-1" @click="increaseQuantity(item.dishID)">+</button>
                        <span class="ms-3">{{ item.quantity }}</span>
                    </td>
                    <td>
                        <div class="singleTotal">{{ (item.quantity * item.price).toFixed(2) }}€</div>
                    </td>
                </tr>
                <tr class="table-dark">
                    <th colspan="3" class="text-right">Grand Total</th>
                    <td>{{ megaTotal.toFixed(2) }}€</td>
                </tr>
            </tbody>
        </table>


        <BraintreeUi />
    </div>

</template>

<script></script>