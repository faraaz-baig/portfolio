<template>
  <div>
    <div class="p-6 min-h-96 flex flex-col justify-center hero">
      <div class="">
        <h1 class="text-5xl md:text-7xl font-black w-64 md:w-96">
          Hello, I’m Mariam <span class="text-5xl">👩</span>
        </h1>
        <p
          class="text-white text-opacity-70 text-lg md:text-2xl font-normal w-80 md:w-1/2 xl:w-2/6 my-10"
        >
          Educaion and hospitality professional based in bangalore
        </p>
      </div>
      <div class="bg-white h-1 w-9 mb-10"></div>
      <div>
        <p class="text-white text-opacity-70">Selected case study below</p>
        <nuxt-link
          to="work#case"
          class="inline-flex items-center font-bold mt-1"
        >
          Learn More
          <ArrowRight class="w-5 ml-1" />
        </nuxt-link>
      </div>
      <a href="#work" class="self-center absolute bottom-0 mb-7"
        ><ArrowDown class="w-12 animate-bounce"
      /></a>
    </div>

    <!--Services Section 1-->

    <div id="work" class="min-h-screen flex flex-col items-center">
      <div class="flex flex-col items-center mt-32">
        <h1 class="text-2xl sm:text-4xl font-bold">
          My Services in Hospitality 🏨
        </h1>
        <p class="text-lg sm:text-xl mt-4 w-96 mx-auto text-center">
          I help top hotels around the world with planning and designing
        </p>
      </div>
      <div class="h-1/2 grid gap-14 lg:grid-cols-2 grid-cols-1 mt-20 px-2">
        <div class="flex flex-col lg:flex-row items-center">
          <Coaching class="w-16" />
          <div class="w-96 text-center lg:text-left">
            <p class="font-bold text-lg mt-3 lg:ml-4">Recruitment Coaching</p>
            <p class="mt-2 px-2 lg:px-0 lg:ml-4">
              Help recruit staff that has flexibility dealing with situation, an
              aptitude for learning and development accommodative
            </p>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row items-center">
          <Clean class="w-16" />
          <div class="w-96 text-center lg:text-left">
            <p class="font-bold text-lg mt-3 lg:ml-4">Grooming and Hygiene</p>
            <p class="mt-2 px-2 lg:px-0 lg:ml-4">
              Grooming suitable for the service industry. (suitable hairstyles,
              nail art , type of shoes, how to wear uniforms etc)
            </p>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row items-center">
          <Cog class="w-16" />
          <div class="w-96 text-center lg:text-left">
            <p class="font-bold text-lg mt-3 lg:ml-4">
              Inventory/discard procedures
            </p>
            <p class="mt-2 px-2 lg:px-0 lg:ml-4">
              Inventory for fixed and movable items. Discard procedures for
              fixed and movable items etc
            </p>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row items-center">
          <Decoration class="w-16" />
          <div class="w-96 text-center lg:text-left">
            <p class="font-bold text-lg mt-3 lg:ml-4">Decorations</p>
            <p class="mt-2 px-2 lg:px-0 lg:ml-4">
              Suitable flower arrangements for on and off seasons, and
              decorations for occasions
            </p>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row items-center">
          <Clock class="w-16" />
          <div class="w-96 text-center lg:text-left">
            <p class="font-bold text-lg mt-3 lg:ml-4">staff productivity</p>
            <p class="mt-2 px-2 lg:px-0 lg:ml-4">
              organize the task in a specific order/manner so that they can
              finish the tasks on time without stress
            </p>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row items-center">
          <Cost class="w-16" />
          <div class="w-96 text-center lg:text-left">
            <p class="font-bold text-lg mt-3 lg:ml-4">Cost control measures</p>
            <p class="mt-2 px-2 lg:px-0 lg:ml-4">
              Introducing waste to wealth themes in the department
            </p>
          </div>
        </div>
      </div>
    </div>

    <!--Services Section 2-->

    <div id="work" class="flex flex-col items-center mb-56">
      <div class="flex flex-col items-center mt-40">
        <h1 class="text-2xl sm:text-4xl font-bold">
          My Services in Education 🎓
        </h1>
        <p class="text-lg sm:text-xl mt-4 w-96 mx-auto text-center">
          I help students with problems like lack of concentration children with
          fear for exams, slow learner etc.
        </p>
      </div>
      <div class="h-1/2 grid gap-14 lg:grid-cols-2 grid-cols-1 mt-20">
        <div class="flex flex-col lg:flex-row items-center">
          <Tuts class="w-16" />
          <div class="w-96 text-center lg:text-left">
            <p class="font-bold text-lg mt-3 lg:ml-4">
              Tuitions for school children
            </p>
            <p class="mt-2 px-2 lg:px-0 lg:ml-4">
              Provide tuitions for school children for English, and Arts
              subjects
            </p>
          </div>
        </div>
        <div class="flex flex-col lg:flex-row items-center">
          <Conselling class="w-16" />
          <div class="w-96 text-center lg:text-left">
            <p class="font-bold text-lg mt-3 lg:ml-4">
              Counselling and Coaching for children
            </p>
            <p class="mt-2 px-2 lg:px-0 lg:ml-4">
              Children with problems like lack of concentration, not able to
              adjust in the school
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.hero {
  height: calc(100vh - 96px);
}
</style>
