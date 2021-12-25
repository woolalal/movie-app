import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import MovieDetails from '../views/MovieDetails.vue'
import ActorDetails from '../views/ActorDetails.vue'
import SearchMovie from '../views/SearchMovie.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/details/:id',
    name: 'MovieDetails',
    component: MovieDetails,
    props: true
  },
  {
    path: '/actor/:id',
    name: 'ActorDetails',
    component: ActorDetails,
    props: true
  },
  {
    path: '/search-movie',
    name: 'SearchMovie',
    component: SearchMovie,
    props: true,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
