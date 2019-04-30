<template>
  <g v-show="walkthrough.activeStep === 4">
    <g
      v-for="(carrier, index) in carriers"
      :key="carrier.variable"
      class="carrier-circle"
      :transform="'translate(0' + ((carrierMaxWidth * index) + carrierMaxRadius) + ',' + height / 2 + ')'"
    >
      <EnergyCircle
        class="circle--target"
        :maxRadius="carrierMaxRadius"
        :value="carrier.target.values[rangeValue]"
        :maxValue="maxValue"
        transform="rotate(-90)"
      />
      <EnergyCircle
        class="circle--baseline"
        :maxRadius="carrierMaxRadius"
        :value="carrier.baseline.values[rangeValue]"
        :maxValue="maxValue"
        transform="rotate(-90)"
      />
      <text dy="20">{{ carrier.variable }}</text>
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
    carrierMaxWidth: function () {
      return this.width / this.carriers.length
    },
    carrierMaxRadius: function () {
      return this.carrierMaxWidth / 2
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped lang="scss">
figure {
  width: 100%;
}

svg {
  /* TODO: Remove. Only for layouting purposes */
  border: 1px dashed #e2e2e2;
  overflow: visible;

  text {
    font-size: calc(var(--font-size) - 4px);
    text-anchor: middle;
  }
}

.carrier-circle {
  transform: rotate(90);
}
</style>
