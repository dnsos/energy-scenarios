import Vue from 'vue'
import Vuex from 'vuex'

//import combinedFiles from './assets/data/combinedFiles.js' // TODO: remove or fix
import biomass from './assets/data/biomass.json'
import coal from './assets/data/coal.json'
import gas from './assets/data/gas.json'
import geothermal from './assets/data/geothermal.json'
import hydro from './assets/data/hydro.json'
import nuclear from './assets/data/nuclear.json'
import oil from './assets/data/oil.json'
import other from './assets/data/other.json'
import solar from './assets/data/solar.json'
import total from './assets/data/total.json'


Vue.use(Vuex)

export default new Vuex.Store({
  strict: true, // TODO: disable for production (https://vuex.vuejs.org/guide/strict.html)
  state: {
    carriers: [
      biomass,
      coal,
      gas,
      geothermal,
      hydro,
      nuclear,
      oil,
      other,
      solar
    ],
    aggregated: total
  },
  mutations: {

  },
  actions: {

  }
})
