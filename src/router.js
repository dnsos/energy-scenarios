import Vue from 'vue'
import Router from 'vue-router'
import Intro from './views/Intro.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'intro',
      component: Intro
    },
    {
      path: '/demand',
      name: 'demand',
      // route level code-splitting
      // this generates a separate chunk (demand.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Demand.vue')
    },
    {
      path: '/composition',
      name: 'composition',
      component: () => import('./views/Composition.vue')
    },
    {
      path: '/tracks',
      name: 'tracks',
      component: () => import('./views/Tracks.vue')
    },
    {
      path: '/carbon-price',
      name: 'carbon-price',
      component: () => import('./views/CarbonPrice.vue')
    }
  ]
})
