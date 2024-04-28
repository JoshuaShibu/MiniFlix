<template lang="">
  <BannerComponent/>
  <MovieLists/>
</template>
<script>

import MovieLists from '../components/MovieLists.vue';
import BannerComponent from '../components/BannerComponent.vue';
export default {
  name: 'HomeView',
  components: {
    MovieLists,
    BannerComponent,
    
  }
}
</script>
