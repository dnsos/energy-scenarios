import Vue from 'vue'
import Vuex from 'vuex'

import fossil from './assets/data/fossil.json'
import total from './assets/data/total.json'

import biomass from './assets/data/biomass.json'
import coal from './assets/data/coal.json'
import gas from './assets/data/gas.json'
// import geothermal from './assets/data/geothermal.json'
import hydro from './assets/data/hydro.json'
import nuclear from './assets/data/nuclear.json'
import oil from './assets/data/oil.json'
// import other from './assets/data/other.json'
import solar from './assets/data/solar.json'
import wind from './assets/data/wind.json'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, // TODO: disable for production (https://vuex.vuejs.org/guide/strict.html)
  state: {
    carriers: {
      fossil: {
        aggregated: fossil
      },
      nonfossil: {
        aggregated: {}
      },
      grouped: {
        original: [coal, gas, oil, biomass, hydro, nuclear, solar, wind]
      },
      total: {
        aggregated: total
      }
    },
    selection: {
      region: { name: "World", code: "World"},
      society: { name: "Middle of the Road", code: "SSP2"},
      target: { name: "Climate Target 1.5°C", code: "19"},
      year: 2020
    },
    regions: [
      {
        name: "World",
        code: "World"
      },
      {
        name: "OECD States",
        code: "R5.2OECD"
      },
      {
        name: "Asia",
        code: "R5.2ASIA"
      },
      {
        name: "Latin America",
        code: "R5.2LAM"
      },
      {
        name: "Middle East & Africa",
        code: "R5.2MAF"
      },
      {
        name: "Reforming Economies",
        code: "R5.2REF"
      },
    ],
    societies: [
      {
        name: "The Green Road",
        code: "SSP1"
      },
      {
        name: "Middle of the Road",
        code: "SSP2"
      },
      {
        name: "Regional Rivalry",
        code: "SSP3"
      },
      {
        name: "A Road Divided",
        code: "SSP4"
      },
      {
        name: "Fossil Fueled Development",
        code: "SSP5"
      },
    ],
    targets: [
      {
        name: "Climate Target 2°C",
        code: "26"
      },
      {
        name: "Climate Target 1.5°C",
        code: "19"
      }
    ],
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
      return state.carriers.fossil.aggregated.data.find(s => {
        return s.regioncode === state.selection.region.code && s.scenario === (state.selection.society.code + "-Baseline")
      })
    },
    totalData: (state) => {
      return state.carriers.total.aggregated.data.find(s => {
        return s.regioncode === state.selection.region.code && s.scenario === (state.selection.society.code + "-Baseline")
      })
    },
    carriersData: (state) => {
      const carriersArr = state.carriers.grouped.original.map(carrier => {

        carrier.baseline = carrier.data.find(s => {
          return s.regioncode === state.selection.region.code && s.scenario === (state.selection.society.code + "-Baseline")
        })
        
        carrier.target = carrier.data.find(s => {
          let selectedRegion = state.selection.region.code
          let selectedScenario = state.selection.society.code + "-" + state.selection.target.code

          return s.regioncode === selectedRegion && s.scenario === selectedScenario
        }) || { values: [0,0,0,0,0,0,0,0] } // TODO: fallback for infeasible scenarios. More elegant?

        return carrier
      })
      return carriersArr
    },
    carriersMaxValue: (state) => {
      const maxCarriers = state.carriers.grouped.original.map(carrier => {

        const maxScenarios = carrier.data.filter(s => {
          return s.regioncode === state.selection.region.code
        })

        const maxScenario = maxScenarios.map(s => {
          return Math.max(...s.values)
        })

        return Math.max(...maxScenario)
      })
      return Math.max(...maxCarriers)
    },
    year: (state) => {
      return state.selection.year
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
      state.selection.region = state.regions.find(region => region.code === payload)
    },
    setSociety: (state, payload) => {
      state.selection.society = state.societies.find(society => society.code === payload)
    },
    setTarget: (state, payload) => {
      state.selection.target = state.targets.find(target => target.code === payload)
    },
    setYear: (state, payload) => {
      state.selection.year = state.general.startyear + (payload * state.general.yearinterval)
    }
  },
  actions: {
    changeCarriersData: ({ commit }, payload) => {
      commit('setCarriersData', payload)
    },
    changeTarget: ({ commit }, payload) => {
      commit('setTarget', payload)
    }
  }
})
