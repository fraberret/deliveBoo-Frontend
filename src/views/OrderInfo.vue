<script>
export default {
    name: 'OrderInfo',
    data() {
        return {
            formData: null
        };
    },
    mounted() {
        this.formData = JSON.parse(localStorage.getItem('order'));
    },
    beforeRouteLeave() {
        localStorage.clear();
    }
};
</script>
<template>
    <div class="container">
        <div v-if="formData">
            <h1 class="d-flex display-5 fw-semibold justify-content-center my-3 text-success">
                Yes! Your order is confirmed.
            </h1>
            <h2 class="d-flex justify-content-center mb-5">
                Thank you for purchasing from our restaurant!
            </h2>
            <h2 class="my-4">Order Information</h2>
            <div class="row">
                <div class="col-md-6">
                    <h5>Customer Information</h5>
                    <ul class="list-unstyled lh-lg">
                        <li class="fs-6"><b>Name:</b> {{ formData.customer_name }}</li>
                        <li class="fs-6"><b>Last Name:</b> {{ formData.customer_lastname }}</li>
                        <li class="fs-6"><b>Address:</b> {{ formData.customer_address }}</li>
                        <li class="fs-6"><b>Email:</b> {{ formData.customer_email }}</li>
                        <li class="fs-6"><b>Phone:</b> {{ formData.customer_telephone }}</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <h5>Order Summary</h5>
                    <ul class="list-unstyled lh-lg">
                        <li class="fs-6"><b>Total:</b> {{ formData.amount }} &#8364;</li>
                    </ul>
                    <h5>Dishes:</h5>
                    <ul class="list-unstyled lh-lg">
                        <li v-for="dish in formData.dishes" :key="dish.dishID">
                            <b>{{ dish.name }}</b> - {{ dish.price }} &#8364; ({{ dish.quantity }} pz.)
                        </li>
                    </ul>
                </div>
            </div>
            <router-link to="/" class="buttons btn_primary text-center mt-4 mx-auto">Return to Home</router-link>
        </div>


        <div v-else class="text-center py-5 text-secondary">No Orders To Show...</div>
    </div>
</template>

<style scoped>
.buttons {
    text-decoration: none;
    width: 200px;
}

</style>