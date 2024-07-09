<script>
export default {
  name: 'PageLoader',
  data() {
    return {
      isLoading: true,
    }
  },
  mounted() {
    // restart the gif 
    window.addEventListener('load', () => {
      const gif = this.$refs.gif;
      gif.src = gif.src;
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 3200);
  }
}
</script>

<template>
  <transition name="loader">
    <div v-if="isLoading" class="loader">
      <img ref="gif" src="/img/passing3.gif" alt="logo gif">
    </div>
  </transition>
  <transition name="oval">
    <div v-if="isLoading" class="oval"></div>
  </transition>
</template>

<style>
body {
  overflow: auto;
}

.loader-leave-active {
  transition: transform .5s cubic-bezier(0.9, 0, 1, 1);
}

.loader-leave-to {
  transform: translateY(-100%);
}

.oval-enter-active,
.oval-leave-active {
  transition: transform .5s cubic-bezier(0.9, 0, 1, 1);
}

.oval-enter-from {
  transform: translate(-5%, 0) scaleY(1);
}

.oval-leave-to {
  transform: translate(-5%, -100vh) scaleY(0);
}

.loader {
  position: fixed;
  inset: 0;
  background-color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 990;

  img {
    width: 100vw;
  }
}


.oval {
  position: fixed;
  bottom: -500px;
  width: 110%;
  height: 1000px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 900;
  background-color: #333333;
  box-shadow: 0px 100px 100px 20px rgba(29, 29, 29, 0.687);
}
</style>
