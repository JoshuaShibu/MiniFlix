<template>
<div v-if="movie" class="container">
    <div class="movie-details-left">
        <div class="movie-details-left-first">
        <div class="movie-pictures" @mouseenter="showPlayButton = true" @mouseleave="showPlayButton = false">
                <img class="movie-picture" :src="movie.poster_path" alt="Avengers: Endgame">
                <button v-show="showPlayButton" class="play-button">Play</button>
            </div>
        </div>
    </div>
    <div class="movie-details-right">
      <div class="movie-title">
        {{movie.title}}
      </div>
        <span>
          <strong>Director</strong>: {{ movie.credits.crew.filter((c) => c.job === 'Director')[0].name }}
        </span>
        <p class="movie-details-overview">{{movie.overview}}</p>
        <p><strong>Release Date:</strong> April 26, 2019</p>
        <p><strong>Genre:</strong><span class="movie-genre-badge" v-for="genre in geners" :key="genre">{{ genre }}</span></p>
        <p><strong>Stars:</strong><span v-for="star in stars" :key="star" class="names">{{ star.name }}</span> </p>
        <p><strong>Writers:</strong><span v-for="writer in writers" :key="writer" class="names">{{ writer.name }}</span> </p>
        <p><strong>IMDb Rating:</strong> {{Math.floor(movie.vote_average)}}/10</p>
        <div class="btn-row">
          <button class="watchlist-button">Add to Watchlist</button>
           <button class="play-trailer-btn"><i class="fas fa-play"></i> Play Trailer</button>
        </div>
    </div>
</div>
<div v-else></div>
</template>

// we can loop this in some way //
<script>


import movieService from '../utils/api.js';

export default {
  name:"MovieDeatils",
  data() {
    return {
      movie: null,
      geners: [],
      showPlayButton: false,
      stars:[],
      writers:[]
    };
  },
  async created() {
    const { id } = this.$route.params;
    this.movie = await movieService.getMovieById(id);
    if (this.movie) {
      this.geners = this.movie.genres.map((gener)=> gener.name);
      this.stars = this.movie.credits.cast.slice(0, 3); 
      this.writers = this.movie.credits.crew.filter((element)=> element.job === "Writer" | element.job === "Screenplay");
    }
  },
  methods: {
  },
};
</script>
