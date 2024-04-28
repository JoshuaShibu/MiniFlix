<template>
  <div>
    <CarouselComponent :movies="this.movies" :movieSection="this.movieSection"/>
  </div>
</template>

<script>
import movieService from '../utils/api.js';
import CarouselComponent from './CarouselComponent.vue';

export default {
  data() {
    return {
      movies: [],
      movieSection: null,
    };
  },
  components: {
    CarouselComponent
  },
  
  async created() {
    // Fetch movie data
    this.movies = await movieService.getMovies();
    this.movieSection = "Trending Now";
  },
  
  methods: {
    goToMovieDetails(id) {
      this.$router.push(`/movie/${id}`);
    },
  },
};
</script>

<style scoped>
/* Your CSS styles for movie thumbnails */
</style>