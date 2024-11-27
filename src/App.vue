<script setup>
import Category from "./views/Component/Category.vue";
import Hero from "./views/Component/Hero.vue";
import HomeCards from "./views/Component/HomeCards.vue";
import Productivity from "./views/Component/Productivity.vue";
import Navbar from "./views/Navbar/Navbar.vue";

// import { RouterView } from 'vue-router';
// import { NLoadingBarProvider } from 'naive-ui'; // Ensure this is also imported if not globally registered
</script>

<template>
  <!-- <n-loading-bar-provider>
    <RouterView />
  </n-loading-bar-provider> -->
  <Navbar />
  <Hero
    title="Data to enrich your online business"
    subTitle="Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem
          cupidatat commodo. Elit sunt amet fugiat veniam occaecat"
  />
  <Productivity />
  <HomeCards />
  <Category />
</template>


<style scoped>
</style>
