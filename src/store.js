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
    mode: {
      isWalkthrough: true
    },
    selection: {
      region: { name: "World", code: "World"},
      society: { name: "Middle of the Road", code: "SSP2"},
      target: { name: "Climate Target 2°C", code: "26"},
      year: 2020,
      explorer: {
        matrix: {
          isActive: true
        },
        mix: {
          isActive: false,
          activeCarrier: 'Oil'
        }
      }
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
    baseline: [
      {
        name: "No Climate Policies",
        code: "baseline"
      }
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
    // TODO: remove unused getters: fossilData, totalData?
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
          feasible: null,
          total: null,
          fossil: null,
          nonfossil: { values: [] }
        }

        if (state.carriers.total.data.find(s => {
          return s.regioncode === state.selection.region.code && s.scenario === (society.code + "-" + state.selection.target.code)
        })) {
          target.feasible = true
        } else {
          target.feasible = false
        }

        target.total = state.carriers.total.data.find(s => {
          return s.regioncode === state.selection.region.code && s.scenario === (society.code + "-" + state.selection.target.code)
        }) || { values: [null,null,null,null,null,null,null,null,null] }

        target.fossil = state.carriers.fossil.data.find(s => {
          return s.regioncode === state.selection.region.code && s.scenario === (society.code + "-" + state.selection.target.code)
        }) || { values: [null,null,null,null,null,null,null,null,null] }

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
    matrixDataNew: (state) => {
      const SSPs = state.societies.map(society => {
        const REGIONS = state.regions.map(region => {

          // initialise object for region
          const REGION = {
            region: region
          }

          // initialise object for region's baseline
          const baseline = {
            total: null,
            fossil: null,
            nonfossil: { values: [] }
          }
  
          baseline.total = state.carriers.total.data.find(s => {
            return s.regioncode === region.code && s.scenario === (society.code + "-Baseline")
          })
  
          baseline.fossil = state.carriers.fossil.data.find(s => {
            return s.regioncode === region.code && s.scenario === (society.code + "-Baseline")
          })
  
          baseline.nonfossil.values = baseline.total.values.map((value, index) => {
            return value - baseline.fossil.values[index]
          })

          const TARGETS = state.targets.map(target => {

            // initialise object for region's target
            const targetObj = {
              ...target,
              feasible: null,
              total: null,
              fossil: null,
              nonfossil: { values: [] }
            }

            if (state.carriers.total.data.find(s => {
              return s.regioncode === region.code && s.scenario === (society.code + "-" + target.code)
            })) {
              targetObj.feasible = true
            } else {
              targetObj.feasible = false
            }
    
            targetObj.total = state.carriers.total.data.find(s => {
              return s.regioncode === region.code && s.scenario === (society.code + "-" + target.code)
            }) || { values: [null,null,null,null,null,null,null,null,null] }
    
            targetObj.fossil = state.carriers.fossil.data.find(s => {
              return s.regioncode === state.selection.region.code && s.scenario === (society.code + "-" + target.code)
            }) || { values: [null,null,null,null,null,null,null,null,null] }
    
            targetObj.nonfossil.values = targetObj.total.values.map((value, index) => {
              return value - targetObj.fossil.values[index]
            })

            return targetObj

          })

          // save filtered/calculated data to this region's object
          REGION.society = {
            name: society.name,
            code: society.code
          }
          REGION.baseline = baseline
          REGION.targets = TARGETS
  
          return REGION
        })
        return REGIONS
      })
      return SSPs
    },
    matrixMaxValue: (state, getters) => {
      const maxSSPs = getters.matrixDataNew.map(ssp => {
        const maxRegion = ssp.map(region => {
          const maxBaselineFossil = Math.max(...region.baseline.fossil.values)
          const maxBaselineNonfossil = Math.max(...region.baseline.nonfossil.values)
          const maxTarget19Fossil = Math.max(...region.targets[1].fossil.values)
          const maxTarget19Nonfossil = Math.max(...region.targets[1].nonfossil.values)
          const maxTarget26Fossil = Math.max(...region.targets[0].fossil.values)
          const maxTarget26Nonfossil = Math.max(...region.targets[0].nonfossil.values)
          return Math.max(maxBaselineFossil, maxBaselineNonfossil, maxTarget19Fossil, maxTarget19Nonfossil, maxTarget26Fossil, maxTarget26Nonfossil)
        })
        return Math.max(...maxRegion)
      })
      return Math.max(...maxSSPs)
    },
    carriersDataNew: (state) => {
      const carriersData = state.societies.map(society => {
        
        // object for society
        const societyObj = {
          name: society.name,
          code: society.code,
          carriers: null
        }

        // fallback object for infeasible scenarios
        const infeasibleScenario = {
          status: 'infeasible',
          values: [0,0,0,0,0,0,0,0,0]
        }

        // for each society loop through carriers and find respective scenario (or add fallback scenario)
        const carriers = state.carriers.grouped.original.map(carrier => {
          const baseline = carrier.data.find(s => {
            return s.regioncode === state.selection.region.code && s.scenario === society.code + '-Baseline'
          })
          const target19 = carrier.data.find(s => {
            return s.regioncode === state.selection.region.code && s.scenario === society.code + '-19'
          }) || infeasibleScenario
          const target26 = carrier.data.find(s => {
            return s.regioncode === state.selection.region.code && s.scenario === society.code + '-26'
          }) || infeasibleScenario

          return {
            name: carrier.variable,
            baseline: baseline,
            target19: target19,
            target26: target26
          }
        })

        // add list of carriers and their filtered scenarios to society object
        societyObj.carriers = carriers

        return societyObj
      })
      return carriersData
    },
    carriersMaxValue: (state) => {
      const maxCarriers = state.carriers.grouped.original.map(carrier => {
        /* filters all scenarios that equal the current selection */
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
    carriersMaxValueAbs: (state) => {
      const maxCarriers = state.carriers.grouped.original.map(carrier => {
        /* filters all scenarios that include the possible futures (baseline, 19, 26),
           also includes all SSPs */
        const maxScenarios = carrier.data.filter(s => {
          return s.scenario.includes('Baseline')
          || s.scenario.includes('19')
          || s.scenario.includes('26')
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
    // TODO: the following can be acessed via mapState. Remove from getters?
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
    toggleMode: (state, payload) => {
      if (payload === 'explorer') {
        state.mode.isWalkthrough = false
      } else if (payload === 'walkthrough') {
        state.mode.isWalkthrough = true
      } else {
        state.mode.isWalkthrough = !state.mode.isWalkthrough
      }
    },
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
      state.selection.year = payload
    },
    setStep: (state, payload) => {
      state.walkthrough.activeStep = payload
    },
    setExplorerSociety: (state, payload) => {
      state.selection.explorer.SSP = payload
    }
  },
  actions: {
    changeTarget: ({ commit }, payload) => {
      commit('setTarget', payload)
    },
    changeRegion: ({ commit }, payload) => {
      commit('setRegion', payload)
    },
    changeYear: ({ commit }, payload) => {
      commit('setYear', payload)
    },
    changeMode: ({ commit }, payload) => {
      commit('toggleMode', payload)
    }
  }
})
