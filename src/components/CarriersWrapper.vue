<template>
  <g class="carriers__wrapper">
    <g class="carriers__groups" :transform="'translate(0,' + height / societies.length + ')'">
      <CarriersGroup
        v-for="(society, index) in societies"
        :key="society.code"
        :SSPIndex="index"
        :SSPCode="society.code"
        :width="width"
        :height="height"
      />
    </g>
    <g class="carriers__names">
      <g
        v-for="(carrier, index) in carriers.grouped.original"
        :key="index"
        :transform="'translate(' + (carrierMaxWidth * index + (carrierMaxWidth / 2)) + ',0)'">
        <text v-if="carrier.variable == walkthrough.steps[activeStep].variables.carrier
              || walkthrough.steps[activeStep].variables.carrier == '' ">{{ carrier.variable }}</text>
      </g>
    </g>
  </g>
</template>

<script>
import { mapState } from 'vuex'
import CarriersGroup from '@/components/CarriersGroup.vue'

export default {
  name: 'CarriersWrapper',
  components: {
    CarriersGroup
  },
  props: ['width', 'height'],
  data: function() {
    return {}
  },
  computed: {
    ...mapState(['carriers', 'societies', 'walkthrough']),
    activeStep: function () {
      return this.$store.state.walkthrough.activeStep
    },
    carrierMaxWidth: function () {
      return this.width / this.carriers.grouped.original.length
    }
  },
  watch: {},
  mounted: function () {}
}
</script>

<style scoped lang="scss">
text {
  font-size: calc(var(--font-size) - 4px);
  text-anchor: middle;
}
</style>
