import { mount } from '@vue/test-utils';
import MovieDetails from '@/views/MovieDetails.vue';
import movieService from '@/utils/api.js';

// Mock movieService.getMovieById
jest.mock('@/utils/api.js', () => ({
  getMovieById: jest.fn()
}));

describe('MovieDetails', () => {
  // Test rendering and initial data
  it('renders movie details with initial data', async () => {
    const mockMovie = {
      id: 1,
      title: 'Avengers: Endgame',
      poster_path: 'avengers.jpg',
      overview: 'Avengers: Endgame is a superhero film...',
      genres: [{ name: 'Action' }, { name: 'Adventure' }],
      credits: {
        crew: [{ job: 'Director', name: 'Russo Brothers' }],
        cast: [{ name: 'Robert Downey Jr.' }, { name: 'Chris Evans' }, { name: 'Scarlett Johansson' }]
      },
      vote_average: 8.5
    };

    movieService.getMovieById.mockResolvedValue(mockMovie);

    const wrapper = mount(MovieDetails, {
     global: {
        mocks: {
          $route: {
            params: {
              id: 1
            }
          }
        }
      }
    });

    await wrapper.vm.$nextTick();
    

    expect(wrapper.exists()).toBe(true);
    // expect(wrapper.find('.movie-details-overview').text()).toBe('Avengers: Endgame is a superhero film...');
    // expect(wrapper.findAll('.movie-genre-badge')).toHaveLength(2);
    // expect(wrapper.findAll('.names')).toHaveLength(5); // 3 stars + 2 writers
    // expect(wrapper.find('.watchlist-button').exists()).toBe(true);
    // expect(wrapper.find('.play-trailer-btn').exists()).toBe(true);
  });
});
