
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import api from '../../src/utils/api.js'; // Import your API functions

// Create a new instance of MockAdapter
const mock = new MockAdapter(axios);

describe('API Caching', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  it('should cache movie data when calling getMovieById', async () => {
    // Mock the API response
    const mockMovieId = 123;
    const mockMovieData = { id: mockMovieId, title: 'Mock Movie' };
    mock.onGet(`https://api.themoviedb.org/3/movie/${mockMovieId}?append_to_response=credits`).reply(200, mockMovieData);

    // Call getMovieById twice
    await api.getMovieById(mockMovieId);
    await api.getMovieById(mockMovieId);

    // Expect only one network call to have been made
    expect(mock.history.get.length).toBe(1);

    // Expect movie data to be cached
    const cachedMovie = localStorage.getItem(`movie_cache_${mockMovieId}`);
    expect(cachedMovie).toBeTruthy();
  });

  it('should cache movie list data when calling getMovies', async () => {
    // Mock the API response
    const mockMovieList = [{ 
        "id": 1, 
        "title": 'Mock Movie 1',
        "backdrop_path":"https://image.tmdb.org/t/p/originalundefined",
        "poster_path":"https://image.tmdb.org/t/p/originalundefined"
      }, 
      { 
        "id": 2, 
        "title": 'Mock Movie 2', 
        "backdrop_path":"https://image.tmdb.org/t/p/originalundefined",
        "poster_path":"https://image.tmdb.org/t/p/originalundefined"
      }];
    
    mock.onGet('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc').reply(200, { results: mockMovieList });

    await api.getMovies();

    // Expect movie list data to be cached
    const cachedMovies = localStorage.getItem('movie_cache_movies');
    
    expect(cachedMovies).toBeTruthy();
    
    // Expect cached data to match the API response
    expect(JSON.parse(cachedMovies)[0].id).toEqual(mockMovieList[0].id);
  });
});
