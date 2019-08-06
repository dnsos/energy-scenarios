import store from '../store'
import * as d3 from 'd3'

export function getDiameters() {
  const currentMatrixGroup = document.querySelector('#matrix__group-' + store.state.selection.society.code.toLowerCase())
  const diameters = {
    fossil: {
      baseline: currentMatrixGroup.querySelector('.circle__fossil.circle__baseline').getBBox().width,
      target: currentMatrixGroup.querySelector('.circle__fossil.circle__target').getBBox().width
    },
    nonfossil: {
      baseline: currentMatrixGroup.querySelector('.circle__nonfossil.circle__baseline').getBBox().width,
      target: currentMatrixGroup.querySelector('.circle__nonfossil.circle__target').getBBox().width
    }
  }
  return diameters
}

export function createPackData (size, carriers) {

  const pack = d3.pack().size([size, size]).padding(2)

  const root = d3.hierarchy(carriers).sum(d => {
    return d.value
  })

  return pack(root)
}