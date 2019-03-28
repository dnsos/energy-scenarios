import Vue from 'vue'
import Vuex from 'vuex'

import carriers from './assets/data/combinedCarriers'
import fossil from './assets/data/fossil.json'
import total from './assets/data/total.json'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, // TODO: disable for production (https://vuex.vuejs.org/guide/strict.html)
  state: {
    carriers: carriers,
    types: {
      fossil: fossil,
      nonfossil: {}
    },
    aggregated: {
      default: total,
      selected: {
        region: "World",
        scenario: "SSP2-Baseline"
      }
    },

  },
  getters: {
    regions: (state) => {
      let scenarios = state.aggregated.default.data // all possible scenario/region combinations
      
      // create set of distinct regions (https://codeburst.io/javascript-array-distinct-5edc93501dc4)
      const distinctRegions = [...new Set(scenarios.map(scenario => scenario.regioncode))]
      return distinctRegions
    },
    selectedData: (state) => {
      return state.aggregated.default.data.filter(s => { // TODO: rename the s
        return s.regioncode === state.aggregated.selected.region && s.scenario === state.aggregated.selected.scenario
      })
    }
  },
  mutations: {
    setRegion: (state, payload) => {
      state.aggregated.selected.region = payload
    }
  },
  actions: {
  }
})
