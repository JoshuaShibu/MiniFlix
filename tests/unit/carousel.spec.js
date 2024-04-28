import { mount } from '@vue/test-utils';
import MovieCarousel from '@/components/CarouselComponent.vue';

describe('MovieCarousel', () => {
  // Test rendering and initial data
  it('renders movie carousel with initial data', () => {
    const wrapper = mount(MovieCarousel, {
      propsData: {
        movies: [
          { id: 1, title: 'Movie 1', poster_path: 'poster1.jpg', release_date: '2022-01-01' },
          { id: 2, title: 'Movie 2', poster_path: 'poster2.jpg', release_date: '2022-01-02' }
        ],
        movieSection: 'Trending Now'
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('.section-heading').text()).toBe('Trending Now');
    expect(wrapper.findAll('.carousel-item')).toHaveLength(2);
  });

  // Test method invocation
  // it('navigates to movie details page when a movie is selected', async () => {
  //   const mockRouterPush = jest.fn();
  //   const wrapper = mount(MovieCarousel, {
  //     propsData: {
  //       movies: [{ id: 1, title: 'Movie 1', poster_path: 'poster1.jpg', release_date: '2022-01-01' }],
  //       movieSection: 'Trending Now'
  //     },
  //     mocks: {
  //       $router: {
  //         push: mockRouterPush
  //       }
  //     }
  //   });

  //   await wrapper.find('.carousel-item').trigger('click');
  //   expect(mockRouterPush).toHaveBeenCalledWith('/details/1');
  // });

  // // Test method invocation on mouseover
  it('updates selectedIndex when hovering over a movie', async () => {
    const wrapper = mount(MovieCarousel, {
      propsData: {
        movies: [{ id: 1, title: 'Movie 1', poster_path: 'poster1.jpg', release_date: '2022-01-01' }],
        movieSection: 'Trending Now'
      }
    });

    await wrapper.find('.carousel-item').trigger('mouseover');
    expect(wrapper.vm.selectedIndex).toBe(0);
  });
});
