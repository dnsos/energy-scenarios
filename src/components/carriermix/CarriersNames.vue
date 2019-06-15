<template>
  <g class="carriers__names">
    <g
      v-for="(carrier, index) in societies[0].carriers"
      :key="carrier.name"
    >
      <transition name="fade">
        <g
          v-show="activeCarriers.includes(carrier.name)"
          :transform="'translate(' + ((carrierMaxWidth * index) + carrierMaxWidth/2) + ',' + 0 + ')'"
        >
          <rect
            class="carrier__bg"
            width="50"
            height="15"
            x="0"
            y="-13"
            :transform="'translate(-25)'"
          />
          <text
            class="carrier__name"
            :class="'carrier__' + carrier.name.toLowerCase()"
          >{{ carrier.name }}</text>
        </g>
      </transition>
    </g>
  </g>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'CarriersNames',
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    societies: {
      type: Array,
      required: true
    },
    carrierMaxWidth: {
      type: Number,
      required: true
    },
    selectedCarriers: {
      type: Array,
      required: false
    }
  },
  data: function() {
    return {
      activeCarriers: []
    }
  },
  computed: {
    ...mapState(['selection', 'mode']),
    activeStep: function () {
      return this.$store.state.walkthrough.activeStep
    },
    steps: function () {
      return this.$store.state.walkthrough.steps
    }
  },
  watch: {
    activeStep: function (newStep, oldStep) {
      this.activeCarriers = [...this.steps[this.activeStep].variables.carriers]
    }
  },
  created: function () {
    if (this.mode.isWalkthrough) {
      // if walkthrough: set visible names to array in walkthrough.json
      this.activeCarriers = [...this.steps[this.activeStep].variables.carriers]
    } else {
      // if not walkthrough: set visible names to currently selected carriers
      this.activeCarriers = this.selectedCarriers
    }
  }
}
</script>

<style scoped lang="scss">
.carrier__bg {
  fill: white;
  opacity: 0.8;
}
.carrier__name {
  font-size: calc(var(--font-size) - 4px);
  font-weight: 500;
  text-anchor: middle;
}
</style>
