<script>
import BraintreeUi from '../components/BraintreeUi.vue'
export default {
    name: 'ShoppingCart',
    components: {
        BraintreeUi
    },
    data() {
        return {
            cartItems: null
        }
    },
    methods: {
        getTotal() {
            let megaTotal = 0
            let totals = document.querySelectorAll('.singleTotal');
            totals.forEach(total => {
                megaTotal += total.value
            });
            console.log(totals);
        }
    },
    mounted() {
        const cart = JSON.parse(localStorage.getItem('cart'));
        this.cartItems = cart
        this.getTotal()
        // console.log(this.cartItems);
    },
}
</script>

<template>

    <div class="container">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">id</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in cartItems">
                    <th scope="row">{{ item.dishID }}</th>
                    <td>{{ item.price }}</td>
                    <td>{{ item.quantity }}</td>
                    <td>
                        <div class="singleTotal">{{ item.quantity * item.price }}</div>
                    </td>
                </tr>
                <tr class="bg-dark">
                    <th></th>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>


        <BraintreeUi />
    </div>

</template>

<script></script>