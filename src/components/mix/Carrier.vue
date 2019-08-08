<template>
  <g
    v-if="activeCarriers.includes(carrier.name)"
    :class="{'carrier--selectable': isExplorer}"
    :transform="'translate(' + tweenedXPosition + ',0)'"
  >
    <EnergyCircle
      class="circle__target"
      :class="{ 'circle__target--active' : carrier[currentTargetCode].values[rangeValue] > carrier.baseline.values[rangeValue] }"
      v-show="carrier[currentTargetCode].values[rangeValue] > carrier.baseline.values[rangeValue]"
      :maxRadius="maxRadius * currentScale"
      :value="carrier[currentTargetCode].values[rangeValue]"
      :maxValue="maxValue"
      :carrierType="isFossil(carrier.name) ? 'type__f' : 'type__nf'"
      :packingMode="isWalkthroughMode() && atWalkthroughStep([6])"
      :packingValues="getPackData(carrier.name, 'target')"
      :transform="getRotation(carrier.name) + getYTranslate(carrier.name, 'target')"
    />
    <EnergyCircle
      class="circle__baseline"
      :maxRadius="maxRadius * currentScale"
      :value="carrier.baseline.values[rangeValue]"
      :maxValue="maxValue"
      :carrierType="isFossil(carrier.name) ? 'type__f' : 'type__nf'"
      :packingMode="isWalkthroughMode() && atWalkthroughStep([6])"
      :packingValues="getPackData(carrier.name, 'baseline')"
      :transform="getRotation(carrier.name) + getYTranslate(carrier.name, 'baseline')"
    />
    <EnergyCircle
      class="circle__target"
      :class="{ 'circle__target--active' : carrier[currentTargetCode].values[rangeValue] < carrier.baseline.values[rangeValue] }"
      v-show="carrier[currentTargetCode].values[rangeValue] < carrier.baseline.values[rangeValue]"
      :maxRadius="maxRadius * currentScale"
      :value="carrier[currentTargetCode].values[rangeValue]"
      :maxValue="maxValue"
      :carrierType="isFossil(carrier.name) ? 'type__f' : 'type__nf'"
      :packingMode="isWalkthroughMode() && atWalkthroughStep([6])"
      :packingValues="getPackData(carrier.name, 'target')"
      :transform="getRotation(carrier.name) + getYTranslate(carrier.name, 'target')"
    />
    <transition name="fade">
      <CarrierTooltip
        v-if="hoveredCarrier === carrier.name"
        :baselineValue="carrier.baseline.values[rangeValue]"
        :targetValue="carrier[currentTargetCode].values[rangeValue]"
      />
    </transition>
  </g>
</template>

<script>
import { createPackData, getDiameters } from '../../utils/utils'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import EnergyCircle from '@/components/visuals/EnergyCircle.vue'
import CarrierTooltip from '@/components/mix/CarrierTooltip.vue'

export default {
  name: 'Carrier',
  components: {
    EnergyCircle,
    CarrierTooltip
  },
  props: {
    maxWidth: {
      type: Number,
      required: true
    },
    carrier: {
      type: Object,
      required: true
    },
    society: {
      type: Object,
      required: true
    },
    xPosition: {
      type: Number,
      required: true
    },
    hoveredCarrier: {
      type: String,
      required: false,
      default: null
    }
  },
  data: function() {
    return {
      tweenedXPosition: 0,
      activeCarriers: []
    }
  },
  computed: {
    ...mapState(['selection', 'walkthrough', 'mode']),
    ...mapGetters({
        maxValue: 'carriersMaxValueAbs',
        rangeValue: 'rangeValue'
    }),
    isExplorer: function () {
      return !this.mode.isWalkthrough
    },
    activeStep: function () {
      return this.walkthrough.activeStep
    },
    steps: function () {
      return this.walkthrough.steps
    },
    currentScale: function () {
      if (this.mode.isWalkthrough) {
        return this.walkthrough.steps[this.activeStep].scale
      } else {
        return 1
      }
    },
    maxRadius: function () {
      return this.maxWidth / 2
    },
    currentTargetCode: function () {
      return 'target' + this.selection.target.code
    },
    packData: function () {

      if (this.isWalkthroughMode() && this.atWalkthroughStep([6])) {

        const diameters = getDiameters()

        const fossil = this.society.carriers.filter(carrier => {
          return this.isFossil(carrier.name)
        })

        const nonfossil = this.society.carriers.filter(carrier => {
          return !this.isFossil(carrier.name)
        })

        const fossilBaseline = {
          name: 'fossilBaseline',
          children: fossil.map(carrier => {
            return {
              name: carrier.name,
              value: carrier.baseline.values[this.rangeValue]
            }
          })
        }

        const fossilTarget = {
          name: 'fossilTarget',
          children: fossil.map(carrier => {
            return {
              name: carrier.name,
              value: carrier[this.currentTargetCode].values[this.rangeValue]
            }
          })
        }

        const nonfossilBaseline = {
          name: 'nonfossilBaseline',
          children: nonfossil.map(carrier => {
            return {
              name: carrier.name,
              value: carrier.baseline.values[this.rangeValue]
            }
          }) 
        }

        const nonfossilTarget = {
          name: 'nonfossilTarget',
          children: nonfossil.map(carrier => {
            return {
              name: carrier.name,
              value: carrier[this.currentTargetCode].values[this.rangeValue]
            }
          })
        }

        const packData = {
          fossil: {
            baseline: createPackData(diameters.fossil.baseline, fossilBaseline),
            target: createPackData(diameters.fossil.target, fossilTarget)
          },
          nonfossil: {
            baseline: createPackData(diameters.nonfossil.baseline, nonfossilBaseline),
            target: createPackData(diameters.nonfossil.target, nonfossilTarget)
          }
        }
        return packData
      }
    }
  },
  methods: {
    getPackData: function (carrier, scenario) {
      if (this.isWalkthroughMode() && this.atWalkthroughStep([6])) {
        if (this.isFossil(carrier)) {
          return scenario === 'baseline'
            ? this.packData.fossil.baseline.children.find(node => node.data.name === carrier) 
            : this.packData.fossil.target.children.find(node => node.data.name === carrier)
        } else {
          return scenario === 'target'
            ? this.packData.nonfossil.target.children.find(node => node.data.name === carrier)
            : this.packData.nonfossil.baseline.children.find(node => node.data.name === carrier)
        }
      }
    },
    getRotation: function (carrier) {
      if (this.isWalkthroughMode() && this.atWalkthroughStep([6])) {
        // packing layout here
        if (this.isFossil(carrier)) {
          return 'rotate(180)'
        } else {
          return 'rotate(0)'
        }
      } else {
        return 'rotate(-90)'
      }
    },
    getYTranslate: function (carrier, scenario) {
      if (this.isWalkthroughMode() && this.atWalkthroughStep([6])) {
        if (this.isFossil(carrier)) {
          if (scenario === 'baseline') {
            return 'translate(0,-' + getDiameters().fossil.baseline / 2 + ')'
          } else {
            return 'translate(0,-' + getDiameters().fossil.target / 2 + ')'
          }
        } else {
          if (scenario === 'baseline') {
            return 'translate(0,-' + getDiameters().nonfossil.baseline / 2 + ')'
          } else {
            return 'translate(0,-' + getDiameters().nonfossil.target / 2 + ')'
          }
        }
      } else {
        return 'translate(0,0)'
      }
    },
    isFossil: function (carrier) {
      const fossilCarriers = ['Coal', 'Gas', 'Oil']
      if (fossilCarriers.includes(carrier)) {
        return true
      } else {
        return false
      }
    },
    tween: function (startValue, endValue, tweeningDuration) {
      const vm = this
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, tweeningDuration)
        .onUpdate(function () {
          vm.tweenedXPosition = this.tweeningValue
        })
        .start()
      
      animate()
    }
  },
  watch: {
    activeStep: function (newStep, oldStep) {
      if (this.mode.isWalkthrough) {
        this.activeCarriers = [...this.steps[this.activeStep].variables.carriers]
      }
    },
    xPosition: function (newPos, oldPos) {
      this.tween(oldPos, newPos, 800)
    }
  },
  created: function () {
    if (this.mode.isWalkthrough) {
      // if walkthrough: set visible SSPs to array in walkthrough.json
      this.activeCarriers = [...this.steps[this.activeStep].variables.carriers]
    } else {
      // if not walkthrough: set visible SSPs to currently selected carriers
      this.activeCarriers = ["Coal", "Gas", "Oil", "Biomass", "Hydro", "Nuclear", "Solar", "Wind"]
    }
  },
  mounted: function () {
    this.tweenedXPosition = this.xPosition
  }
}
</script>

<style scoped lang="scss">
</style>
