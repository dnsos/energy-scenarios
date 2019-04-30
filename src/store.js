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

import walkthrough from './assets/walkthrough.json'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, // TODO: disable for production (https://vuex.vuejs.org/guide/strict.html)
  state: {
    carriers: {
      fossil: fossil,
      grouped: {
        original: [coal, gas, oil, biomass, hydro, nuclear, solar, wind]
      },
      total: total
    },
    selection: {
      region: { name: "World", code: "World"},
      society: { name: "Middle of the Road", code: "SSP2"},
      target: { name: "Climate Target 2°C", code: "26"},
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
    },
    walkthrough: {
      steps: walkthrough,
      activeStep: 0
    }
  },
  getters: {
    fossilData: (state) => {
      return state.carriers.fossil.data.find(s => {
        return s.regioncode === state.selection.region.code && s.scenario === (state.selection.society.code + "-Baseline")
      })
    },
    totalData: (state) => {
      return state.carriers.total.data.find(s => {
        return s.regioncode === state.selection.region.code && s.scenario === (state.selection.society.code + "-Baseline")
      })
    },
    matrixData: (state) => {
      const arrSSPs = state.societies.map(society => {
        const baseline = {
          total: null,
          fossil: null,
          nonfossil: { values: [] }
        }

        baseline.total = state.carriers.total.data.find(s => {
          return s.regioncode === state.selection.region.code && s.scenario === (society.code + "-Baseline")
        })

        baseline.fossil = state.carriers.fossil.data.find(s => {
          return s.regioncode === state.selection.region.code && s.scenario === (society.code + "-Baseline")
        })

        baseline.nonfossil.values = baseline.total.values.map((value, index) => {
          return value - baseline.fossil.values[index]
        })

        const target = {
          total: null,
          fossil: null,
          nonfossil: { values: [] }
        }

        target.total = state.carriers.total.data.find(s => {
          return s.regioncode === state.selection.region.code && s.scenario === (society.code + "-" + state.selection.target.code)
        }) || { values: [0,0,0,0,0,0,0,0,0] }

        target.fossil = state.carriers.fossil.data.find(s => {
          return s.regioncode === state.selection.region.code && s.scenario === (society.code + "-" + state.selection.target.code)
        }) || { values: [0,0,0,0,0,0,0,0,0] }

        target.nonfossil.values = target.total.values.map((value, index) => {
          return value - target.fossil.values[index]
        })

        return {
          society: {
            name: society.name,
            code: society.code
          },
          baseline: baseline,
          target: target
        }
      })
      return arrSSPs
    },
    matrixMaxValue: (state, getters) => {
      const maxSSPs = getters.matrixData.map(ssp => {
        const maxBaselineFossil = Math.max(...ssp.baseline.fossil.values)
        const maxBaselineNonfossil = Math.max(...ssp.baseline.nonfossil.values)
        const maxTargetFossil = Math.max(...ssp.target.fossil.values)
        const maxTargetNonfossil = Math.max(...ssp.target.nonfossil.values)
        return Math.max(maxBaselineFossil, maxBaselineNonfossil, maxTargetFossil, maxTargetNonfossil)
      })
      return Math.max(...maxSSPs)
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
        }) || { values: [0,0,0,0,0,0,0,0,0] } // TODO: fallback for infeasible scenarios. More elegant?

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
    rangeValue: (state) => {
      return (state.selection.year - state.general.startyear) / state.general.yearinterval
    },
    year: (state) => { // TODO: remove? Already in mapState
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
    },
    setYearFromWalkthrough: (state, payload) => {
      state.selection.year = payload
    },
    setStep: (state, payload) => {
      state.walkthrough.activeStep = payload
    }
  },
  actions: {
    changeTarget: ({ commit }, payload) => { // TODO: make mutation instead of action
      commit('setTarget', payload)
    }
  }
})
