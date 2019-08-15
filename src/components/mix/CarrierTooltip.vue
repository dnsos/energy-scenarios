<template>
  <g class="group__tooltip">
    <g transform="translate(0,-5)">
      <rect x="20" y="-30" width="70" height="40" fill="white" opacity="0.85" />
      <text class="tooltip">
        <tspan class="value__baseline" x="90" dy="-15">{{ Math.round(baselineValue) }} EJ/yr</tspan>
        <tspan class="value__target" x="90" y="0">{{ targetValue != null ? Math.round(targetValue) + ' EJ/yr' : '-' }}</tspan>
      </text>
    </g>
    <line class="tooltip__line" x1="0" y1="0" x2="90" y2="0" />
  </g>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CarrierTooltip',
  components: {},
  props: {
    baselineValue: {
      type: Number,
      required: true
    },
    targetValue: {
      type: Number,
      required: false
    }
  },
  data: function() {
    return {}
  },
  computed: {
    ...mapGetters(['rangeValue'])
  }
}
</script>

<style scoped lang="scss">
.group__tooltip {
  font-size: var(--font-size-small);
}
.tooltip {
  font-family: var(--font-family-mono);
  text-anchor: end;
}
.value__baseline {
  fill: var(--color-violet);
}
.value__target {
  fill: var(--color-yellow);
}
</style>