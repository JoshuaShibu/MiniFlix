<template>
  <div class="main-div" role="region" aria-label="Movie Section">
  <h2 class="section-heading">{{movieSection}}</h2>
    <div class="carousel-container">
      <div class="carousel" :style="{ transform: `translateX(${translateX}px)` }" role="listbox">
        <div v-for="(movie, index) in movies" :key="index" 
          class="carousel-item" 
          :class="{ selected: selectedIndex === index }" 
          @click="selectMovie(index)"
          @mouseover="hoverMovie(index)"
          @keydown.enter="selectMovie(index)"
          tabindex="0"
        >
          <div class="movie-card">
            <img :src="movie.poster_path" alt="Movie Poster">
            <div class="movie-card-content">
              <h2>{{ movie.title }}</h2>
              <div>{{movie.release_date}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['movies','movieSection'],
  data() {
    return {
      selectedIndex: null,
      translateX: 0,
      itemWidth: 200, 
    };
  },
  computed: {
    disableLeftButton() {
      return this.translateX === 0;
    },
    disableRightButton() {
      const maxTranslateX = (this.movies.length - 1) * this.itemWidth;
      return this.translateX === -maxTranslateX;
    }
  },
  mounted() {
    document.body.addEventListener('click', this.handleClickOutside);
  },
  beforeUnmount() {
    document.body.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    slide(direction) {
      const maxTranslateX = (this.movies.length - 1) * this.itemWidth;
      if (direction === 'left' && this.translateX < 0) {
        this.translateX += this.itemWidth;
      } else if (direction === 'right' && this.translateX > -maxTranslateX) {
        this.translateX -= this.itemWidth;
      }
    },
    selectMovie(index) {
      this.selectedIndex = index;
      const selected = this.movies[index]
      this.$router.push(`/details/${selected.id}`);
    },
    hoverMovie(index) {
      if (this.selectedIndex !== index) {
        this.selectedIndex = index;
      }
    },
    handleClickOutside(event) {
      console.log(event);
      const carousel = document.querySelector('.carousel-container');
      
      // Check if the clicked element is not within the carousel
      if (!carousel.contains(event.target)) {
        this.selectedIndex = null; 
      }
    }
  }
}
</script>