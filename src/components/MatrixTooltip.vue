<template>
  <g class="group__tooltip">
    <g transform="translate(0,-100)">
      <text class="tooltip tooltip__fossil">
        <tspan class="value__baseline" x="0">{{ Math.round(hoveredValues.fossil.baseline) }} EJ/yr&nbsp;</tspan>
        <tspan class="value__target" x="0" dy="20">{{ Math.round(hoveredValues.fossil.target) }} EJ/yr&nbsp;</tspan>
      </text>
      <text class="tooltip tooltip__nonfossil">
        <tspan class="value__baseline" x="0">&nbsp;{{ Math.round(hoveredValues.nonfossil.baseline) }} EJ/yr</tspan>
        <tspan class="value__target" x="0" dy="20">&nbsp;{{ Math.round(hoveredValues.nonfossil.target) }} EJ/yr</tspan>
      </text>
    </g>
    <line class="tooltip__line" x1="0" y1="0" x2="0" y2="-110" />
  </g>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MatrixTooltip',
  components: {},
  props: {
    sspData: {
      type: Object,
      required: true
    }
  },
  data: function() {
    return {}
  },
  computed: {
    ...mapGetters(['rangeValue']),
    hoveredValues: function () {
      return {
        fossil: {
          baseline: this.sspData.baseline.fossil.values[this.rangeValue],
          target: this.sspData.target.fossil.values[this.rangeValue]
        },
        nonfossil: {
          baseline: this.sspData.baseline.nonfossil.values[this.rangeValue],
          target: this.sspData.target.nonfossil.values[this.rangeValue]
        }
      }
    }
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
}
.tooltip__fossil {
  text-anchor: end;
}
.value__baseline {
  fill: var(--color-violet);
}
.value__target {
  fill: var(--color-yellow);
}
</style>