<template>
  <g class="carriers__wrapper">
    <g class="society__groups">
      <g v-for="(society) in societies"
        :key="'circles__' + society.code"
        class="society__group"
        :transform="'translate(0,' +  yTransform(society.code) + ')'"
      >
        <CarrierCircles
          :maxWidth="carrierMaxWidth"
          :society="society"
          :activeSSPs="activeSSPs"
        />
      </g>
    </g>
    <g class="society__names" v-if="isExplorer || isWalkthroughMode() && atWalkthroughStep([7,8,9])">
      <g
        v-for="(society) in societies"
        :key="'name__' + society.code"
        class="society__name"
        :transform="'translate(0,' +  yTransform(society.code) + ')'"
      >
        <g v-if="activeSSPs.includes(society.code)">
          <text dy="20">{{ society.name }}
            <tspan
              v-if="society.carriers[0]['target' + selection.target.code].status === 'infeasible'"
              class="society--infeasible"
            >&nbsp;(Target infeasible)</tspan>
            <tspan
              v-if="isExplorer"
              class="button__clear"
              @click="removeActiveSociety(society.code)"
            >&nbsp;&nbsp;×&nbsp;&nbsp;</tspan>
          </text>
          <line x1="0" y1="6" :x2="society.carriers.length * carrierMaxWidth" y2="6" class="society__divider" />
        </g>
      </g>
    </g>
    <CarriersNames
      v-if="isExplorer || isWalkthroughMode() && atWalkthroughStep([7,8,9])"
      :width="width"
      :height="height"
      :societies="societies"
      :carrierMaxWidth="carrierMaxWidth"
      :marginTop="currentMarginTop"
    />
  </g>
</template>

<script>
import { mapState } from 'vuex'
import CarrierCircles from '@/components/mix/CarrierCircles.vue'
import CarriersNames from '@/components/mix/CarriersNames.vue'
import * as d3 from 'd3'

export default {
  name: 'CarrierMix',
  components: {
    CarrierCircles,
    CarriersNames
  },
  props: ['width', 'height', 'societies', 'maxValue', 'rangeValue'],
  data: function() {
    return {
      activeSSPs: []
    }
  },
  computed: {
    ...mapState(['selection', 'walkthrough', 'mode']),
    isExplorer: function () {
      return !this.mode.isWalkthrough
    },
    activeStep: function () {
      return this.walkthrough.activeStep
    },
    steps: function () {
      return this.walkthrough.steps
    },
    carrierMaxWidth: function () {
      return this.width / this.societies[0].carriers.length // TODO: more elegantly?
    },
    currentMarginTop: function () {
      const yTransform = (this.activeSSPs.length <= 4) ? -25 : 25 // extra margin for beauty reasons
      return (this.height / 2) - ((this.carrierMaxWidth * this.activeSSPs.length) / 2) + yTransform
    }
  },
  methods: {
    yTransform: function (code) {
      const distributionStates = this.isExplorer || this.mode.isWalkthrough && this.atWalkthroughStep([7,8,9])
      const packStates = this.mode.isWalkthrough && this.atWalkthroughStep([6])

      // distribute along y-axis if Explorer mode or Walkthrough mode at steps 7, 8, 9
      if (distributionStates) {
        // TODO: what did I do here again?
        // TODO: where to include currentScale?
        const remainingHeight = this.height - (this.activeSSPs.length * this.carrierMaxWidth)
        const marginTop = (remainingHeight / 2) + (this.activeSSPs.length * this.carrierMaxWidth) / this.activeSSPs.length - (this.carrierMaxWidth / 2)
        return marginTop + (this.activeSSPs.indexOf(code) * this.carrierMaxWidth)
      }

      // y-position according to matrix position for circle packing
      else if (packStates) {
        const society = this.societies.find(society => society.code === code)
        return 0
      }
      
      // if no positioning state has ben detected
      else {
        console.error('No y-positioning of carriers detected')
        return 0
      }
    },
    removeActiveSociety: function (SSP) {
      this.$store.commit('removeExplorerSociety', SSP)
    }
  },
  watch: {
    activeStep: function (newStep, oldStep) {
      if (this.mode.isWalkthrough) {
        this.activeSSPs = [...this.steps[this.activeStep].variables.SSPs]
      }
    }
  },
  created: function () {
    if (this.mode.isWalkthrough) {
      // if walkthrough: set visible SSPs to array in walkthrough.json
      this.activeSSPs = [...this.steps[this.activeStep].variables.SSPs]
    } else {
      // if not walkthrough: set visible SSPs to currently selected SSPs
      this.activeSSPs = this.selection.explorer.mix.activeSocieties
    }
  },
  mounted: function () {}
}
</script>

<style scoped lang="scss">
text {
    font-size: calc(var(--font-size) - 4px);
    font-weight: 500;
    text-anchor: middle;
  }
.carrier-circle {
  transform: rotate(90);
}
.carrier--selectable:hover {
  cursor: pointer;
}
.society__name text {
  text-anchor: start;
  .society--infeasible {
    fill: var(--color-yellow);
  }
}
.society__divider {
  stroke: var(--color-grey-09);
  stroke-width: .75;
}
.button__clear {
  font-size: var(--font-size-small);
  cursor: pointer;
}
</style>
