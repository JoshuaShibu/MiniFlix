<template>
  <div class="banner">
    <img :src="selectedMovie?.backdrop_path" alt="Movie Image" class="banner-image">
    <div class="banner-content">
      <h1 class="banner-title">Watch More Amazing Movies Now.</h1>
      <p class="banner-description">Watch all the latest movies and shows only on miniflix. Best expirence of the movies and series.</p>
      <div class="banner-buttons">
        <button class="more-details-btn">Read More</button>
        <button class="play-now-btn"><i class="fas fa-play"></i> Play Trailer</button>
      </div>
    </div>
  </div>
</template>
<script>

import movieService from '../utils/api.js';
export default {
  name: 'BannerComponent',
  data() {
    return {
      movies: [],
      selectedMovie: null,
    };
  },
  async created() {
    // Fetch movie data
    this.movies = await movieService.getMovies();
    const randomIndex = Math.floor(Math.random() * 10) + 1;
    this.selectedMovie = this.movies[randomIndex];
    console.log('inthe Bnana', this.selectedMovie);
  },
  methods: {
    goToMovieDetails(id) {
      this.$router.push(`/movie/${id}`);
    },
  },
}
</script>
<style lang="">
  
</style>