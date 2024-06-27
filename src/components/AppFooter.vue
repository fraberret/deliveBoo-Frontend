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
                    <img src="/img/logo-deliveboo.png" class="mw-100 pb-3" alt="logo deliveboo">
                    <p class="pe-5 footer_text">Deliveboo brings your favorite meals right to your doorstep. <span> We
                            partner
                            with the
                            best local
                            restaurants to offer you a wide variety of dishes, all delivered fast and fresh. </span></p>
                    <!-- Join our
                        community of happy customers and enjoy the convenience of online ordering and home delivery. -->
                    <div class="socials d-flex justify-content-start gap-5">
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
footer {
    background-color: var(--boo-secondary-light);
    padding: 8rem 0 4rem 0;

    .footer_text {
        line-height: 1.5rem;
        padding-bottom: .5rem;
        font-size: .9rem;
        font-weight: 300;

        span {
            font-weight: 600;
        }
    }

    h5 {
        margin-bottom: 1rem;
        color: var(--boo-gray-800);
    }
}

p,
li {
    font-size: 12px;
}

.socials {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    margin-bottom: 4rem;
}
</style>