<template>
  <g class="carriers__wrapper" v-if="walkthrough.activeStep >= 8">
    <g
      v-for="(carrier, index) in carriers"
      :key="carrier.variable"
      class="carrier-circle"
      :transform="'translate(0' + ((carrierMaxWidth * index) + carrierMaxRadius) + ',' + height / 2 + ')'"
    >
      <transition name="fade">
        <g
          v-if="carrier.variable == walkthrough.steps[activeStep].variables.carrier
              || walkthrough.steps[activeStep].variables.carrier == '' "
        >
          <EnergyCircle
            class="circle--target"
            v-show="carrier.target.values[rangeValue] > carrier.baseline.values[rangeValue]"
            :maxRadius="carrierMaxRadius * currentScale"
            :value="carrier.target.values[rangeValue]"
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
            v-show="carrier.target.values[rangeValue] < carrier.baseline.values[rangeValue]"
            :maxRadius="carrierMaxRadius * currentScale"
            :value="carrier.target.values[rangeValue]"
            :maxValue="maxValue"
            transform="rotate(-90)"
          />
          <text :dy="-((carrierMaxRadius * 2) * 1)">{{ carrier.variable }}</text>
        </g>
      </transition>
    </g>
  </g>
</template>

<script>
import { mapState } from 'vuex'
import EnergyCircle from '@/components/EnergyCircle.vue'

export default {
  name: 'CarriersCircles',
  components: {
    EnergyCircle
  },
  props: ['width', 'height', 'carriers', 'maxValue', 'rangeValue'],
  data: function() {
    return {}
  },
  computed: {
    ...mapState(['walkthrough']),
    activeStep: function () {
      return this.$store.state.walkthrough.activeStep
    },
    currentScale: function () {
      return this.walkthrough.steps[this.walkthrough.activeStep].scale
    },
    carrierMaxWidth: function () {
      return this.width / this.carriers.length
    },
    carrierMaxRadius: function () {
      return this.carrierMaxWidth / 2
    }
  },
  watch: {
    activeStep: function (newVal, oldVal) {
      console.log("Active carrier:", this.walkthrough.steps[this.activeStep].variables.carrier)
    }
  },
  mounted: function () {
    console.log("Carriers:", this.carriers)
  }
}
</script>

<style scoped lang="scss">
text {
    font-size: calc(var(--font-size) - 4px);
    text-anchor: middle;
  }
.carrier-circle {
  transform: rotate(90);
}
</style>
