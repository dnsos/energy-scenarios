import Vue from 'vue'
import Vuex from 'vuex'

import fossil from './assets/data/fossil.json'
import total from './assets/data/total.json'

import biomass from './assets/data/biomass.json'
import coal from './assets/data/coal.json'
import gas from './assets/data/gas.json'
import geothermal from './assets/data/geothermal.json'
import hydro from './assets/data/hydro.json'
import nuclear from './assets/data/nuclear.json'
import oil from './assets/data/oil.json'
import other from './assets/data/other.json'
import solar from './assets/data/solar.json'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, // TODO: disable for production (https://vuex.vuejs.org/guide/strict.html)
  state: {
    carriers: {
      fossil: {
        aggregated: fossil,
        coal: coal,
        gas: gas,
        oil: oil
      },
      nonfossil: {
        aggregated: {},
        biomass: biomass,
        geothermal: geothermal,
        hydro: hydro,
        nuclear: nuclear,
        other: other,
        solar: solar
      },
      total: {
        aggregated: total
      }
    },
    selection: {
      region: "World",
      scenario: "SSP2-Baseline"
    },
    general: {
      startyear: total.startyear,
      yearinterval: total.yearinterval,
      unit: total.unit
    }
  },
  getters: {
    regions: (state) => {
      let scenarios = state.carriers.total.aggregated.data // all possible scenario/region combinations
      
      // create set of distinct regions (https://codeburst.io/javascript-array-distinct-5edc93501dc4)
      const distinctRegions = [...new Set(scenarios.map(scenario => scenario.regioncode))]
      return distinctRegions
    },
    fossilData: (state) => {
      return state.carriers.fossil.aggregated.data.filter(s => { // TODO: rename the s
        return s.regioncode === state.selection.region && s.scenario === state.selection.scenario
      })
    },
    totalData: (state) => {
      return state.carriers.total.aggregated.data.filter(s => { // TODO: rename the s
        return s.regioncode === state.selection.region && s.scenario === state.selection.scenario
      })
    },
    startyear: (state) => {
      return state.general.startyear
    },
    yearinterval: (state) => {
      return state.general.yearinterval
    },
    unit: (state) => {
      return state.general.unit
    }
  },
  mutations: {
    setRegion: (state, payload) => {
      state.selection.region = payload
    }
  },
  actions: {
  }
})
