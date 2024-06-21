<script>
import BraintreeUi from '../components/BraintreeUi.vue'
export default {
    name: 'ShoppingCart',
    components: {
        BraintreeUi
    },
    data() {
        return {
            cartItems: []
        }
    },
    mounted() {
        const cart = JSON.parse(localStorage.getItem('cart'));
        this.cartItems = cart
    },
    methods: {
        calculateTotal(item) {
            return item.quantity * item.price;
        }
    },
    computed: {
        megaTotal() {
            let total = 0;
            for (let item of this.cartItems) {
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
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in cartItems" :key="item.dishID">
                    <th scope="row">{{ item.dishID }}</th>
                    <td>{{ item.price }}€</td>
                    <td>{{ item.quantity }}</td>
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