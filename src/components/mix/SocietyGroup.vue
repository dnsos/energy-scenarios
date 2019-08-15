<template>
  <g v-if="activeSSPs.includes(society.code)" class="carrier-wrappers">
    <g
      v-for="(carrier, index) in society.carriers"
      :key="carrier.name"
      class="carrier-wrapper"
      :transform="'translate(' + 0 + ',' + yTransform() + ')'"
      @mouseenter="setHovered(carrier.name)"
      @mouseleave="setUnhovered()"
    >
      <CarrierCircles
        :maxWidth="maxWidth"
        :carrier="carrier"
        :society="society"
        :xPosition="xTransform(index)"
        :yPosition="yTransform()"
        :hoveredCarrier="hoveredCarrier"
      />
    </g>
  </g>
</template>

<script>
import { createPackData, getDiameters } from '../../utils/utils'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import EnergyCircle from '@/components/visuals/EnergyCircle.vue'
import CarrierTooltip from '@/components/mix/CarrierTooltip.vue'
import CarrierCircles from '@/components/mix/CarrierCircles.vue'

export default {
  name: 'SocietyGroup',
  components: {
    EnergyCircle,
    CarrierTooltip,
    CarrierCircles
  },
  props: {
    maxWidth: {
      type: Number,
      required: true
    },
    society: {
      type: Object,
      required: true
    },
    activeSSPs: {
      type: Array,
      required: true
    }
  },
  data: function() {
    return {
      hoveredCarrier: null,
      activeCarriers: []
    }
  },
  computed: {
    ...mapState(['selection', 'walkthrough', 'mode', 'matrixCoordinates']),
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
    }
  },
  methods: {
    xTransform: function (index) {
      if (this.mode.isWalkthrough && this.atWalkthroughStep([6])) {
        return this.matrixCoordinates[this.society.code.toLowerCase()].x
      } else {
        return (this.maxWidth * index) + this.maxRadius
      }
    },
    yTransform: function () {
      if (this.mode.isWalkthrough && this.atWalkthroughStep([6])) {
        return this.matrixCoordinates[this.society.code.toLowerCase()].y
      } else {
        return 0
      }
    },
    setHovered: function (carrier) {
      this.hoveredCarrier = carrier
    },
    setUnhovered: function () {
      this.hoveredCarrier = null
    }
  },
  watch: {
    activeStep: function (newStep, oldStep) {
      if (this.mode.isWalkthrough) {
        this.activeCarriers = [...this.steps[this.activeStep].variables.carriers]
      }
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
  mounted: function () {}
}
</script>

<style scoped lang="scss">
text {
    font-size: calc(var(--font-size) - 4px);
    font-weight: 500;
    text-anchor: middle;
  }
.carrier-wrapper {
  transform: rotate(90);
}
.carrier--selectable:hover {
  cursor: default;
}
</style>
