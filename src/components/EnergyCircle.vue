<template>
  <circle :cx="radius" cy="radius / 8" :r="radius" />
</template>

<script>
import * as d3 from "d3" // TODO: create d3 functionalities asset

export default {
  name: 'EnergyCircle',
  props: [ "maxRadius", "value", "maxValue" ],
  data: function() {
    return {}
  },
  computed: {
    radius: function () {
      const scale = d3
        .scaleLinear()
        .range([0, this.maxRadius])
        .domain([0, this.maxValue])

      return scale(this.value)
    }
  }
}
</script>

<style scoped lang="scss">
circle {
  fill: rgb(200, 0, 95);
}
</style>
