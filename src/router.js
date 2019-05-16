import Vue from 'vue'
import Router from 'vue-router'
import Intro from './views/Intro.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'intro',
      components: {
        sidebar: null,
        main: Intro
      }
    },
    {
      path: '/walkthrough/:step',
      name: 'walkthrough',
      components: {
        sidebar: () => import('./views/Sidebar.vue'),
        main: () => import('./views/Walkthrough.vue')
      }
    },
    {
      path: '/explorer',
      name: 'explorer',
      components: {
        sidebar: () => import('./views/Sidebar.vue'),
        main: () => import('./views/Explorer.vue')
      }
    }
  ]
})
