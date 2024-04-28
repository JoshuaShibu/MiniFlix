
import { createWebHistory, createRouter } from 'vue-router'

import HomeView from '../views/HomeView.vue';
import MovieDetails from '../views/MovieDetails.vue';

const routes = [
  { path: '/', 
    component: HomeView 
  },
  { 
    path: '/details/:id', 
    component: MovieDetails,
    meta: { transition: 'slide-left' }  
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export { routes };


export default router;
