<template>
  <div class="w-full h-24">
    <div
      class="flex justify-between items-center py-3 color px-6 h-24 w-full max-w-screen-xl z-50 fixed"
    >
      <nuxt-link to="/" class="font-bold text-4xl" active-class>M.</nuxt-link>
      <!-- Menu -->
      <div class="hidden sm:flex">
        <nuxt-link to="/about" class="font-bold mr-10">About</nuxt-link>
        <nuxt-link to="/work" class="font-bold">Work</nuxt-link>
      </div>
      <!--side bar-->
      <div
        class="sm:hidden absolute right-0 top-0 z-50 overflow-hidden"
        v-if="drawer"
      >
        <div class="flex flex-col justify-center w-screen h-screen bg-white">
          <Close
            class="w-8 absolute top-0 right-0 mt-8 mr-6 cursor-pointer"
            @click.native="toggle"
          />
          <nuxt-link
            to="/about"
            @click.native="toggle"
            class="font-bold text-2xl mx-auto"
            >About</nuxt-link
          >
          <nuxt-link
            to="/work"
            class="font-bold text-2xl mx-auto my-20"
            @click.native="toggle"
            >Work</nuxt-link
          >
        </div>
      </div>
      <!-- hamburger -->
      <Hamburger class="w-8 sm:hidden cursor-pointer" @click.native="toggle" />
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      drawer: false,
    };
  },
  methods: {
    toggle() {
      this.drawer = !this.drawer;
    },
  },
};
</script>

<style scoped>
.nuxt-link-active {
  border-bottom: 2px solid #4d6fff;
}
.color {
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: saturate(180%) blur(38px);
}
</style>