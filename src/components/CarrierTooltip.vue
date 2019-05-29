<template>
  <g class="group__tooltip">
    <g transform="translate(0,-5)">
      <text class="tooltip">
        <tspan class="value__baseline" x="70" dy="-15">{{ Math.round(baselineValue) }}</tspan>
        <tspan class="value__target" x="70" y="0">{{ Math.round(targetValue) }}</tspan>
      </text>
    </g>
    <line class="tooltip__line" x1="0" y1="0" x2="70" y2="0" />
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
      required: true
    }
  },
  data: function() {
    return {}
  },
  computed: {
    ...mapGetters(['rangeValue'])
  },
  methods: {},
  watch: {},
  mounted: function () {}
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