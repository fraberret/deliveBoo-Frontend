<script>
export default {
    name: 'BraintreeUi',
    // data() {
    //     return {
    //         tokenApi: ''
    //     }
    // },
    // getToken() {
    //     axios.get('http://localhost:8000/api/braintree/token')
    //         .then(res => {
    //             this.tokenApi = res.data.token
    //             console.log(res.data.token);
    //         }).catch(err => console.error(err))
    // },
    mounted() {
        let button = document.querySelector('#submit-button');

        braintree.dropin.create({
            authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b',
            selector: '#dropin-container'
        }, function (err, instance) {
            button.addEventListener('click', function () {
                instance.requestPaymentMethod(function (err, payload) {
                    // Submit payload.nonce to your server
                });
            })
        });
    }
}
</script>

<template>
    <!-- Modal trigger button -->
    <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalId">
        Buy
    </button>

    <!-- Modal Body -->
    <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
    <div class="modal fade" id="modalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog"
        aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalTitleId">
                        Choise your method of pay
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div id="dropin-container"></div>
                    <button id="submit-button" class="button button--small button--green">Purchase</button>
                </div>
            </div>
        </div>
    </div>


</template>

<style>
.button {
    cursor: pointer;
    font-weight: 500;
    left: 3px;
    line-height: inherit;
    position: relative;
    text-decoration: none;
    text-align: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 3px;
    display: inline-block;
}

.button--small {
    padding: 10px 20px;
    font-size: 0.875rem;
}

.button--green {
    outline: none;
    background-color: #64d18a;
    border-color: #64d18a;
    color: white;
    transition: all 200ms ease;
}

.button--green:hover {
    background-color: #8bdda8;
    color: white;
}
</style>