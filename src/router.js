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
      path: '/walkthrough/:step',
      name: 'walkthrough',
      component: () => import('./views/Walkthrough.vue')
    },
    {
      path: '/demand',
      name: 'demand',
      component: () => import('./views/Demand.vue')
    },
    {
      path: '/mix',
      name: 'mix',
      component: () => import('./views/Mix.vue')
    },
    {
      path: '/matrix-figure',
      name: 'matrix-figure',
      component: () => import('./views/MatrixFigure.vue')
    }
  ]
})
