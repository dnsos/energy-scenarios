<template>
  <g class="carriers__circles" :transform="'translate(0,' + (height / societies.length * SSPIndex)  + ')'">
    <g
      v-for="(carrier, index) in carriersBySSP"
      :key="carrier.variable"
      class="carrier-circle"
      :transform="'translate(' + ((carrierMaxWidth * index) + carrierMaxRadius) + ',0)'"
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
            :maxValue="carriersMaxValue"
            transform="rotate(-90)"
          />
          <EnergyCircle
            class="circle--baseline"
            :maxRadius="carrierMaxRadius * currentScale"
            :value="carrier.baseline.values[rangeValue]"
            :maxValue="carriersMaxValue"
            transform="rotate(-90)"
          />
          <EnergyCircle
            class="circle--target"
            v-show="carrier.target.values[rangeValue] < carrier.baseline.values[rangeValue]"
            :maxRadius="carrierMaxRadius * currentScale"
            :value="carrier.target.values[rangeValue]"
            :maxValue="carriersMaxValue"
            transform="rotate(-90)"
          />
        </g>
      </transition>
    </g>
  </g>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import EnergyCircle from '@/components/EnergyCircle.vue'

export default {
  name: 'CarriersGroup',
  components: {
    EnergyCircle
  },
  props: ['width', 'height', 'SSPIndex', 'SSPCode'],
  data: function() {
    return {}
  },
  computed: {
    ...mapState(['societies', 'walkthrough']),
    ...mapGetters(['rangeValue', 'carriersMaxValue']),
    activeStep: function () {
      return this.$store.state.walkthrough.activeStep
    },
    carriersBySSP: function () {
      return this.$store.getters.getCarriersBySSP(this.SSPCode)
    },
    currentScale: function () {
      return this.walkthrough.steps[this.walkthrough.activeStep].scale
    },
    carrierMaxWidth: function () {
      return this.width / this.carriersBySSP.length
    },
    carrierMaxRadius: function () {
      return this.carrierMaxWidth / 2
    }
  },
  watch: {
    activeStep: function (newVal, oldVal) {
    }
  },
  mounted: function () {
    console.log("Carriers by SSP:", this.carriersBySSP)
  }
}
</script>

<style scoped lang="scss">
.carrier-circle {
  transform: rotate(90);
}
</style>
