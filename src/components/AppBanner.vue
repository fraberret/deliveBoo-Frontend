<script>
export default {
    name: 'AppBanner',
    props: {
        title: String,
        subTitle: String,
        routeName: String,
    }
}
</script>


<template>
    <div class="banner">
        <div class="text">
            <h6>{{ subTitle }}</h6>
            <h2>
                {{ title }}
            </h2>
        </div>
        <div class="actions single_dish" v-if="routeName">
            <Router-Link :to="{ name: routeName }" class="btn">
                <span>Go Back</span>
            </Router-Link>
            <!-- {{ --modal trigger-- }}
            <a type="button" class="btn delete" data-bs-toggle="modal" data-bs-target="#modal-{{ $dish->id }}">
                <img width="21" src="{{ asset('img/icons/trash.png') }}" alt="trash icon">
                <span>Delete</span>
            </a> -->
        </div>
    </div>
</template>



<style>
.banner {
    background-color: var(--boo-secondary-light);
    width: 100%;
    margin: 1.5rem 0;
    border-radius: 2rem;
    padding: 4.8rem 4.8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform .45s ease;
    transform: translateY(0px) scale(1);

    .text {
        h2 {
            font-family: "Rubik", sans-serif;
            font-size: 2.7rem;
            letter-spacing: .5px;
            line-height: 3.5rem;
            font-weight: 600;
            margin-bottom: 0;
            width: 60%;
        }

        h6 {
            letter-spacing: 2.25px;
            color: var(--boo-primary);
            text-transform: uppercase;
        }
    }

    &:hover {
        transform: translateY(-7px) scale(1.04);
    }

    .actions {
        .btn {
            background-color: var(--boo-primary);
            padding-inline: 2.5rem;
            height: 3.5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 3.5rem;
            color: var(--boo-lighter);
            position: relative;
            z-index: 1;
            overflow: hidden;
            border-color: var(--boo-primary);

            &::after {
                position: absolute;
                content: '';
                width: 200px;
                aspect-ratio: 1;
                border-radius: 50%;
                background-color: var(--boo-gray-700);
                z-index: -1;
                transform: translate(-100%, 100%) scale(.5);
                transition: transform .4s ease;
            }

            &:hover::after {
                transform: translate(0%, 0%) scale(1);
            }

            &:hover {
                border-color: var(--boo-gray-700);
            }
        }
    }
}

@media screen and (max-width: 780px) {
    .banner {
        flex-direction: column;
        text-align: center;

        .text {
            margin-bottom: 1.8rem;

            h2 {
                width: 100%;
                margin: auto;
            }
        }

        &:hover {
            transform: translateY(0px) scale(1);
        }
    }
}
</style>