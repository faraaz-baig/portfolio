<template>
  <div>
    <div class="bg-blue text-white">
      <div
        class="bg-blue min-h-screen select-none flex flex-col justify-between bg-fixed max-w-screen-xl mx-auto"
      >
        <Navbar />
        <Nuxt />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>