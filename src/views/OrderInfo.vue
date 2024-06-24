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
            <div class="alert alert-success" role="alert">
                Order Successfull
            </div>
            <h2 class="my-4">Order Information</h2>
            <div class="row">
                <div class="col-md-6">
                    <h5>Customer Information</h5>
                    <ul class="list-unstyled lh-lg">
                        <li><b>Name:</b> {{ formData.customer_name }}</li>
                        <li><b>Last Name:</b> {{ formData.customer_lastname }}</li>
                        <li><b>Address:</b> {{ formData.customer_address }}</li>
                        <li><b>Email:</b> {{ formData.customer_email }}</li>
                        <li><b>Phone:</b> {{ formData.customer_telephone }}</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <h5>Order Summary</h5>
                    <ul class="list-unstyled lh-lg">
                        <li><b>Total:</b> {{ formData.amount }} &#8364;</li>
                    </ul>
                    <h5>Dishes:</h5>
                    <ul class="list-unstyled lh-lg">
                        <li v-for="dish in formData.dishes" :key="dish.dishID">
                            <b>{{ dish.name }}</b> - {{ dish.price }} &#8364; ({{ dish.quantity }} pz.)
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div v-else class="text-center py-5 text-secondary">No Orders To Show...</div>
    </div>
</template>

<style></style>