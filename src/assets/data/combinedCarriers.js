import biomass from './biomass.json'
import coal from './coal.json'
import gas from './gas.json'
import geothermal from './geothermal.json'
import hydro from './hydro.json'
import nuclear from './nuclear.json'
import oil from './oil.json'
import other from './other.json'
import solar from './solar.json'

let carriers = [
  { ...biomass },
  { ...coal },
  { ...gas },
  { ...geothermal },
  { ...hydro },
  { ...nuclear },
  { ...oil },
  { ...other },
  { ...solar }
]

export default carriers