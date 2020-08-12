import Vue from 'vue'
import VueRouter from 'vue-router'
import filmrouter from './film'
import cinemarouter from './cinema'
import minerouter from './mine'

Vue.use(VueRouter)

const routes = [
  filmrouter,
  cinemarouter,
  minerouter,
  {
    path: '/*',
    redirect: '/film'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
