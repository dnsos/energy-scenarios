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
  getters: {
    regions: (state) => {
      let scenarios = state.aggregated.data // all possible scenario/region combinations
      
      // create set of distinct regions (https://codeburst.io/javascript-array-distinct-5edc93501dc4)
      const distinctRegions = [...new Set(scenarios.map(scenario => scenario.regioncode))]
      return distinctRegions
    }
  },
  mutations: {

  },
  actions: {

  }
})
