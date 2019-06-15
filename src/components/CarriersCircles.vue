<template>
  <g class="carriers__wrapper" v-if="walkthrough.activeStep >= 7">
    <g class="society__groups">
      <g v-for="(society) in societies"
        :key="'circles__' + society.code"
        class="society__group"
        :transform="'translate(0,' +  yTransform(society.code) + ')'"
      >
        <g v-if="activeSSPs.includes(society.code)">
          <g
            v-for="(carrier, index) in society.carriers"
            :key="carrier.name"
            class="carrier-circle"
            :transform="'translate(' + ((carrierMaxWidth * index) + carrierMaxRadius) + ',0)'"
            @mouseenter="setHovered(carrier.name)"
            @mouseleave="hoveredCarrier = null"
          >

            <transition name="fade">
              <g
                v-if="walkthrough.steps[activeStep].variables.carriers.includes(carrier.name)"
              >
                <EnergyCircle
                  class="circle--target"
                  v-show="carrier[currentTargetCode].values[rangeValue] > carrier.baseline.values[rangeValue]"
                  :maxRadius="carrierMaxRadius * currentScale"
                  :value="carrier[currentTargetCode].values[rangeValue]"
                  :maxValue="maxValue"
                  transform="rotate(-90)"
                />
                <EnergyCircle
                  class="circle--baseline"
                  :maxRadius="carrierMaxRadius * currentScale"
                  :value="carrier.baseline.values[rangeValue]"
                  :maxValue="maxValue"
                  transform="rotate(-90)"
                />
                <EnergyCircle
                  class="circle--target"
                  v-show="carrier[currentTargetCode].values[rangeValue] < carrier.baseline.values[rangeValue]"
                  :maxRadius="carrierMaxRadius * currentScale"
                  :value="carrier[currentTargetCode].values[rangeValue]"
                  :maxValue="maxValue"
                  transform="rotate(-90)"
                />
                <transition name="fade">
                  <CarrierTooltip
                    v-if="hoveredCarrier === carrier.name"
                    :baselineValue="carrier.baseline.values[rangeValue]"
                    :targetValue="carrier[currentTargetCode].values[rangeValue]"
                  />
                </transition>
              </g>
            </transition>
          </g>
        </g>
      </g>
    </g>
    <g class="society__names">
      <g
        v-for="(society) in societies"
        :key="'name__' + society.code"
        class="society__name"
        :transform="'translate(0,' +  yTransform(society.code) + ')'"
      >
        <g v-if="activeSSPs.includes(society.code)">
          <text dy="20">{{ society.name }}</text>
          <line x1="0" y1="6" :x2="society.carriers.length * carrierMaxWidth" y2="6" class="society__divider" />
        </g>
      </g>
    </g>
    <CarriersNames
      :width="width"
      :height="height"
      :societies="societies"
      :carrierMaxWidth="carrierMaxWidth"
    />
  </g>
</template>

<script>
import { mapState } from 'vuex'
import EnergyCircle from '@/components/EnergyCircle.vue'
import CarriersNames from '@/components/carriermix/CarriersNames.vue'
import CarrierTooltip from '@/components/CarrierTooltip.vue'

export default {
  name: 'CarriersCircles',
  components: {
    EnergyCircle,
    CarriersNames,
    CarrierTooltip
  },
  props: ['width', 'height', 'societies', 'maxValue', 'rangeValue'],
  data: function() {
    return {
      hoveredCarrier: null,
      tweeningDuration: 200,
      activeSSPs: []
    }
  },
  computed: {
    ...mapState(['selection', 'walkthrough']),
    activeStep: function () {
      return this.walkthrough.activeStep
    },
    steps: function () {
      return this.walkthrough.steps
    },
    currentScale: function () {
      return this.walkthrough.steps[this.activeStep].scale
    },
    carrierMaxWidth: function () {
      return this.width / this.societies[0].carriers.length // TODO: more elegantly?
    },
    carrierMaxRadius: function () {
      return this.carrierMaxWidth / 2
    },
    currentTargetCode: function () {
      return 'target' + this.selection.target.code
    }
  },
  methods: {
    setHovered: function (carrier) {
      this.hoveredCarrier = carrier
    },
    yTransform: function (code) {
      // TODO: what did I do here again?
      const remainingHeight = this.height - (this.activeSSPs.length * this.carrierMaxWidth)
      const marginTop = (remainingHeight / 2) + (this.activeSSPs.length * this.carrierMaxWidth) / this.activeSSPs.length - (this.carrierMaxWidth / 2)
      return marginTop + (this.activeSSPs.indexOf(code) * this.carrierMaxWidth)
    }
  },
  watch: {
    activeStep: function (newStep, oldStep) {
      this.activeSSPs = [...this.steps[this.activeStep].variables.SSPs]
    }
  },
  created: function () {
    if (this.mode.isWalkthrough) {
      // if walkthrough: set visible SSPs to array in walkthrough.json
      this.activeSSPs = [...this.steps[this.activeStep].variables.SSPs]
    } else {
      // if not walkthrough: set visible SSps to currently selected carriers
      this.activeSSPs = null
    }
  }
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
.society__name text {
  text-anchor: start;
}
.society__divider {
  stroke: var(--color-grey-09);
  stroke-width: .75;
}
</style>
