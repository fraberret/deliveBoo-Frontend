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
            <h1>Order Information</h1>
            <div>Name: {{ formData.customer_name }}</div>
            <div>Last Name: {{ formData.customer_lastname }}</div>
            <div>Address: {{ formData.customer_address }}</div>
            <div>Email: {{ formData.customer_email }}</div>
            <div>Phone: {{ formData.customer_telephone }}</div>
            <div>Total: {{ formData.amount }} &#8364;</div>
            <div>
                <h3>Dishes:</h3>
                <div v-for="dish in formData.dishes" :key="dish.dishID">
                    {{ dish.price }} &#8364;
                    {{ dish.quantity }} pz.
                </div>
            </div>
        </div>
        <div v-else class="text-center py-5 text-secondary">No Orders To Show...</div>
    </div>
</template>

<style></style>