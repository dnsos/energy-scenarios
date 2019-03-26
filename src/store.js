import Vue from 'vue'
import Vuex from 'vuex'

import combinedCarriers from './assets/data/combinedCarriers'
import total from './assets/data/total.json'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, // TODO: disable for production (https://vuex.vuejs.org/guide/strict.html)
  state: {
    carriers: combinedCarriers,
    aggregated: total
  },
  mutations: {

  },
  actions: {

  }
})
