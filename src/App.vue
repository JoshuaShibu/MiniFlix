<template>
  <HeaderComponent/>
  <router-view v-slot="{ Component }">
  <!-- Use a custom transition or fallback to `fade` -->
  <transition :key="$route.path" :name="fade" mode="out-in">
    <component :is="Component"/>
  </transition>
  </router-view>
</template>

<script>

import './assets/styles/main.scss';
import HeaderComponent from './components/HeaderComponent.vue';
export default {
  name: 'App',
  components: {
    HeaderComponent,
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
}
body {
margin: 0px
}
</style>
