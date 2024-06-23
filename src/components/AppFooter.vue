<script>
export default {
    name: 'AppFooter'
}
</script>


<template>
    <footer class="mt-5">

        <div class="container mb-2">
            <div class="row">
                <div class="col-12 col-md-4">
                    <img src="/img/logo-deliveboo.png" class="mw-100 pb-3" alt="">
                    <p>Deliveboo brings your favorite meals right to your doorstep. We partner with the best local
                        restaurants to offer you a wide variety of dishes, all delivered fast and fresh. Join our
                        community of happy customers and enjoy the convenience of online ordering and home delivery.</p>
                    <div class="socials">
                        <a href=""><img src="/img/social/instagram.png" alt="instagram icon"></a>
                        <a href=""><img src="/img/social/facebook.png" alt="facebook icon"></a>
                        <a href=""><img src="/img/social/x.png" alt="x icon"></a>
                    </div>
                </div>
                <div class="col-6 col-md-2">
                    <h5>About Us</h5>
                    <ul class="list-unstyled lh-lg">
                        <li>Francesco Berretta</li>
                        <li>Daniele Colaci</li>
                        <li>Nicola Dell'Olio</li>
                        <li>Riccardo Imperiale</li>
                        <li>Nicola Serra</li>
                    </ul>
                </div>
                <div class="col-6 col-md-2">
                    <h5>Company</h5>
                    <ul class="list-unstyled lh-lg">
                        <li>Careers</li>
                        <li>Press</li>
                        <li>Terms & Conditions</li>
                        <li>Privacy Policy</li>
                        <li>Partners</li>
                        <li>Investor Relations</li>
                    </ul>
                </div>
                <div class="col-6 col-md-2">
                    <h5>Support</h5>
                    <ul class="list-unstyled lh-lg">
                        <li>Help Center</li>
                        <li>FAQs</li>
                        <li>Contact Us</li>
                        <li>Order Tracking</li>
                        <li>Shipping Information</li>
                        <li>Returns & Exchanges</li>
                    </ul>
                </div>
                <div class="col-6 col-md-2">
                    <h5>Get in Touch</h5>
                    <ul class="list-unstyled lh-lg">
                        <li>Contact Form</li>
                        <li>Customer Service</li>
                        <li>Follow Us on Social Media</li>
                        <li>Subscribe to Newsletter</li>
                    </ul>
                </div>
            </div>
        </div>

    </footer>
</template>



<style>
p,
li {
    font-size: 12px;
}

.socials {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
}
</style>