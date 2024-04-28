import axios from 'axios';
import Swal from 'sweetalert2';
import router from '../router';

const CACHE_KEY_PREFIX = 'movie_cache_';

export default {
  async getMovieById(id) {
    const cachedData = localStorage.getItem(`${CACHE_KEY_PREFIX}${id}`);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const getMovieByIdOptions = {
      method: 'GET',
      url: `https://api.themoviedb.org/3/movie/${id}?append_to_response=credits`,
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTAzZDc4Zjg1N2NlZDc4MzM1ZGYyMTk0Y2IzOWU0OSIsInN1YiI6IjY2MmI4N2NkOWFjNTM1MDExYzhmNDJhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tlJbrgVoNq0kHRT5oMZqDQyWYurCncP0CROCdOjhJMw'
      }
    };

    try {
      const response = await axios.request(getMovieByIdOptions);
      const movie = {
        ...response.data,
        backdrop_path: `https://image.tmdb.org/t/p/original${response.data.backdrop_path}`,
        poster_path: `https://image.tmdb.org/t/p/original${response.data.poster_path}`
      };

      localStorage.setItem(`${CACHE_KEY_PREFIX}${id}`, JSON.stringify(movie));

      return movie;
    } catch (error) {
      handleError(error);
    }
  },

  async getMovies() {
    const cachedData = localStorage.getItem(`${CACHE_KEY_PREFIX}movies`);
    if (cachedData) {
      return JSON.parse(cachedData);
    }

    const options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTAzZDc4Zjg1N2NlZDc4MzM1ZGYyMTk0Y2IzOWU0OSIsInN1YiI6IjY2MmI4N2NkOWFjNTM1MDExYzhmNDJhZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tlJbrgVoNq0kHRT5oMZqDQyWYurCncP0CROCdOjhJMw'
      }
    };

    try {
      const response = await axios.request(options);
      const movies = response.data.results.map(movie => ({
        ...movie,
        backdrop_path: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
        poster_path: `https://image.tmdb.org/t/p/original${movie.poster_path}`
      }));
      
      localStorage.setItem(`${CACHE_KEY_PREFIX}movies`, JSON.stringify(movies));

      return movies;
    } catch (error) {
      handleError(error);
    }
  },
};

function handleError(error) {
  Swal.fire({
    title: 'Error!',
    text: `${error.response.data.status_message}`,
    icon: 'error',
    confirmButtonText: 'Go Back to Home Page',
  }).then(() => {
    router.push('/');
  });
}
