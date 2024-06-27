<script>

export default {
    name: 'HomeVideo'
}
</script>

<template>
    <div class="vid">
        <div class="video_banner">
            <video playsInline loop preload="auto" autoplay muted>
                <source src="/video/food-b.mp4" type="video/mp4">
            </video>

            <div class="video_filter"></div>
        </div>
    </div>
</template>

<style scoped>
.vid {
    /* position: fixed; */
    top: 0;
    z-index: -1;
    width: 100%;
    margin-top: -3rem;
}

.video_banner {
    width: 100%;
    height: 500px;
    /* margin: 1.5rem 0; */
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: transform .45s ease;
    transform: translateY(0px) scale(1);
    position: relative;

    video {
        filter: brightness(0.4);
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .video_filter {
        inset: 0;
        background-color: #2e0047;
        mix-blend-mode: color;
        position: absolute;
    }
}
</style>