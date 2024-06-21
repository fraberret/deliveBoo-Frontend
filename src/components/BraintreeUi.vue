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
    <div id="dropin-container"></div>
    <button id="submit-button" class="button button--small button--green">Purchase</button>
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