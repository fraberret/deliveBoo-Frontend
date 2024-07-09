<script>
import axios from 'axios';
import { store } from '../store';
export default {
    name: 'CheckoutForm',
    data() {
        return {
            store,
            tokenApi: '',
            loading: true,
            dropinInstance: null,
            restaurant_name: store.localCart[0].nameRestaurant,
            formData: {
                dishes: [],
                amount: '',
                token: '',
                restaurant_id: '',
                customer_name: '',
                customer_lastname: '',
                customer_address: '',
                customer_email: '',
                customer_telephone: '',
            },
            loadingGif: false,
            formErrors: [],
            formDanger: false
        };
    },
    methods: {
        getToken() {
            axios.get('http://localhost:8000/api/payments/token')
                .then(res => {
                    this.tokenApi = res.data.token;
                    this.initializeBraintree();
                    this.loading = false;
                    this.loadingGif = false;
                })
                .catch(err => console.error(err));
        },
        initializeBraintree() {
            braintree.dropin.create({
                authorization: this.tokenApi,
                container: '#dropin-container',
            }, (error, dropinInstance) => {
                if (error) {
                    console.error(error);
                    return;
                }
                this.dropinInstance = dropinInstance;
            });
        },
        loadGif() {
            this.loadingGif = true
            setTimeout(() => {
                this.loadingGif = false
            }, 500);
        },
        order() {
            this.dropinInstance.requestPaymentMethod((error, payload) => {
                if (error) {
                    console.error(error);
                    this.formDanger = true
                    return;
                }

                // test visa 4111111111111111
                this.formData.token = payload.nonce;
                this.formData.dishes = store.localCart;
                this.formData.amount = store.grandTotal();
                this.formData.restaurant_id = store.localCart[0].restaurantId;
                this.loadingGif = true

                axios.post('http://localhost:8000/api/payments/checkout', this.formData)
                    .then(res => {
                        this.loadingGif = false
                        console.log('Order placed successfully', res.data);
                        this.formErrors = []
                        store.cartQuantity = 0
                        store.localCart = []
                        localStorage.clear();
                        localStorage.setItem('order', JSON.stringify(this.formData));
                        this.sendMail()
                        this.redirectToOrderInfo()
                        this.dropinInstance.clearSelectedPaymentMethod();
                    })
                    .catch(error => {
                        this.loadingGif = false
                        this.dropinInstance.clearSelectedPaymentMethod();
                        if (error.response) {
                            this.formErrors = error.response.data.errors;
                        } else {
                            console.error('Error placing order', error);
                        }
                    });
            });
        },
        redirectToOrderInfo() {
            const modalElement = document.getElementById('cartModal');
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
            this.$router.push({ name: 'orderInfo' });
        },
        sendMail() {
            const data = {
                name: this.formData.customer_name,
                email: this.formData.customer_email,
                restaurant_name: this.restaurant_name,
                message: 'they successfully received your order',
            }

            axios.post('http://localhost:8000/api/contacts', data).then(response => {
                console.log(response);
            }).catch(err => { console.error(err); })
        }
    },
    mounted() {
        const modalElement = document.getElementById('cartModal');
        modalElement.addEventListener('shown.bs.modal', () => {
            this.getToken();
        });
        modalElement.addEventListener('hidden.bs.modal', () => {
            if (this.dropinInstance) {
                this.dropinInstance.teardown((err) => {
                    if (err) {
                        console.error('Error tearing down Dropin instance:', err);
                    }
                    this.dropinInstance = null;
                });
            }
        });
    }
};
</script>

<template>
    <div>
        <!-- Modal trigger button -->
        <div class="">
            <button type="button" class="border-0 p-4 ms-auto buttons btn_primary" data-bs-toggle="modal"
                data-bs-target="#cartModal">
                Order Now
            </button>
        </div>

        <!-- Modal Body -->
        <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
        <div class="modal fade" id="cartModal" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
            role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
                <!-- Loading GIF -->
                <div v-if="loadingGif"
                    class="modal-content h-25 w-50 m-auto d-flex align-items-center justify-content-center">
                    <img width="200" src="/img/logo-gif.gif" alt="Loading...">
                </div>
                <template v-else>
                    <div v-if="!loading" class="modal-content"
                        :class="formDanger && 'bg-form-danger border-1 border-danger'">
                        <div class="modal-header text-white" :class="formDanger ? 'bg-danger' : 'bg-dark'">
                            <h5 class="modal-title" id="modalTitleId">
                                Checkout - {{ restaurant_name }} - Total: {{ store.grandTotal().toFixed(2) }}€
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="order()" method="post" class="py-3">
                                <h5 class="text-center pb-3">Enter Your Informations</h5>
                                <div class="billing_info mb-5 ">
                                    <div class="d-flex gap-3 pt-3">
                                        <!-- NAME -->
                                        <div class="mb-3 w-50">
                                            <label for="customer_name" class="form-label">Name*</label>
                                            <input required v-model="formData.customer_name" type="text"
                                                :class="formErrors['customer_name'] && 'is-invalid'"
                                                class="form-control " id="customer_name" name="customer_name"
                                                placeholder="Your Name..." minlength="3" maxlength="100" />
                                            <div v-if="formErrors['customer_name']" class="alert alert-danger mt-3">
                                                <small>{{ formErrors['customer_name'][0] }}</small>
                                            </div>
                                        </div>
                                        <!-- LASTNAME -->
                                        <div class="mb-3 w-50">
                                            <label for="customer_lastname" class="form-label">Last Name*</label>
                                            <input v-model="formData.customer_lastname" type="text" class="form-control"
                                                id="customer_lastname" name="customer_lastname"
                                                aria-describedby="helpId" placeholder="Your Last Name..." required
                                                minlength="3" maxlength="100" />
                                            <div v-if="formErrors['customer_lastname']" class="alert alert-danger mt-3">
                                                <small>{{ formErrors['customer_lastname'][0] }}</small>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="d-flex gap-3 pt-3">
                                        <!-- EMAIL -->
                                        <div class="mb-3 w-50">
                                            <label for="customer_email" class="form-label">Email*</label>
                                            <input v-model="formData.customer_email" type="email" class="form-control"
                                                id="customer_email" name="customer_email" aria-describedby="helpId"
                                                placeholder="Your Email..." minlength="5" maxlength="255" required />
                                            <div v-if="formErrors['customer_email']" class="alert alert-danger mt-3">
                                                <small>{{ formErrors['customer_email'][0] }}</small>
                                            </div>
                                        </div>
                                        <!-- PHONE NUMBER -->
                                        <div class="mb-3 w-50">
                                            <label for="customer_telephone" class="form-label">Phone Number*</label>
                                            <input v-model="formData.customer_telephone" type="tel" class="form-control"
                                                id="customer_telephone" name="customer_telephone"
                                                aria-describedby="helpId" placeholder="Your Phone Number..." required
                                                autofocus pattern="^\+[0-9]{12}$"
                                                title="Telephone number must begin with a + followed by 12 digits." />
                                            <div v-if="formErrors['customer_telephone']"
                                                class="alert alert-danger mt-3">
                                                <small>{{ formErrors['customer_telephone'][0] }}</small>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- ADDRESS -->
                                    <div class="mb-3 pt-3">
                                        <label for="customer_address" class="form-label">Address*</label>
                                        <input v-model="formData.customer_address" type="text" class="form-control"
                                            id="customer_address" name="customer_address" aria-describedby="helpId"
                                            placeholder="Your Address..." required minlength="5" maxlength="100" />
                                        <div v-if="formErrors['customer_address']" class="alert alert-danger mt-3">
                                            <small>{{ formErrors['customer_address'][0] }}</small>
                                        </div>
                                    </div>

                                </div>
                                <div class="payment_method">
                                    <h5 class="text-center pb-0">Choose your payment method</h5>
                                    <!-- DROPIN UI -->
                                    <div id="dropin-container"></div>
                                </div>

                                <div class="d-flex mt-5 align-items-end">
                                    <h6 class="required_field_text"><span>*</span> fields are required</h6>
                                    <button type="submit" id="submit-button"
                                        class="buttons btn_primary border-0 ms-auto">Confirm</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <!-- <div v-else class="text-center my-5 w-100">loading...</div> -->
                    <div v-else class="modal-content h-25 w-50 m-auto d-flex align-items-center justify-content-center">
                        <img width="200" src="/img/logo-gif.gif" alt="Loading...">
                    </div>
                </template>

            </div>
        </div>


    </div>
</template>

<style>
.bg-form-danger {
    background-color: #fdf5f5;
    /* border: 2px solid #ff5858; */
}

.form-label {
    color: var(--boo-primary);
    text-transform: uppercase;
    font-weight: 500;
}

.modal-header .btn-close {
    filter: invert(1);
}

.modal-dialog-scrollable .modal-body {
    scrollbar-width: thin;
    scrollbar-color: var(--boo-gray-800) transparent;
}

.modal-dialog {
    max-width: 800px;
}

/* .billing_info {
    background-color: var(--boo-primary);
    background-color: #f8f8f8;
} */

.required_field_text {
    color: var(--boo-primary);
}

.braintree-loaded .braintree-sheet__container {
    background-color: #fdf5f5
}

.braintree-sheet--has-error .braintree-sheet__error {
    color: #CA2A2A;
    align-items: center;
    justify-content: center;
    display: flex;
    padding: 1rem 0 0 0;
    position: relative;
    margin-top: 4px;
}

.braintree-sheet {
    background-color: #f5f0ff;
}

.braintree-sheet__header {
    align-items: center;
    border-bottom: 1px solid #B5B5B5;
    display: flex;
    flex-wrap: wrap;
    padding: 12px 15px 0 12px;
    position: relative;
}

.braintree-form__field {
    background-color: white;
    width: 100%;
}

.braintree-sheet__content--form {
    /* height: 241px; */

    label {
        display: block;
    }

    .braintree-form__notice-of-collection {
        padding-top: 1rem;
    }

    .braintree-form__flexible-fields {
        display: block;
    }
}
</style>