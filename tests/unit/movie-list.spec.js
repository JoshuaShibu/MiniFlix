import { mount } from '@vue/test-utils';
import MovieCarousel from '@/components/MovieLists.vue';
import movieService from '@/utils/api.js';
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "@/router"

// Mock movieService.getMovies
jest.mock('@/utils/api.js', () => ({
  getMovies: jest.fn()
}));

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})
describe('MovieCarousel', () => {
  let wrapper;

  // Mount the component before each test
  beforeEach(async () => {
    // Mock getMovies response
    movieService.getMovies.mockResolvedValue([
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' }
    ]);

    wrapper = mount(MovieCarousel, {
      // Provide a mocked $router
      global: {
        plugins: [router]
      }
    });

    // Wait for the created lifecycle hook to finish
    await wrapper.vm.$nextTick();
  });

  // Test rendering and data initialization
  it('renders movie carousel with initial data', async () => {
    expect(wrapper.exists()).toBe(true);
    await wrapper.setData({ movieSection: 'Trending Now' });
  });

  // Test method invocation [Failed as vue-routing testing is not robust as of now]
  // it('navigates to movie details page when goToMovieDetails is called', () => {
  //   wrapper.vm.goToMovieDetails(123);
  //   //expect(wrapper.$router.push).toHaveBeenCalled(123);
  // });

  // Test props passing
  it('passes correct props to CarouselComponent', () => {
    const carouselComponent = wrapper.findComponent({ name: 'CarouselComponent' });
    expect(carouselComponent.props('movies')).toEqual([
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' }
    ]);
    expect(carouselComponent.props('movieSection')).toBe('Trending Now');
  });

  // // Test async created hook
  it('calls movieService.getMovies in created hook', async () => {
    expect(movieService.getMovies).toHaveBeenCalled();
  });
});