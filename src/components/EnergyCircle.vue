<template>
  <circle :cx="tweeningValue" cy="0" :r="tweeningValue" />
</template>

<script>
import * as d3 from "d3" // TODO: create d3 functionalities asset

export default {
  name: 'EnergyCircle',
  props: [ "maxRadius", "value", "maxValue" ],
  data: function() {
    return {
      tweeningValue: 0
    }
  },
  computed: {
    radius: function () {
      const scale = d3
        .scaleLinear()
        .range([0, this.maxRadius])
        .domain([0, this.maxValue])

      return scale(this.value)
    }
  },
  watch: {
    radius: function (oldValue, newValue) {
      console.log('From:', oldValue, 'to', newValue)
      this.tween(oldValue, newValue)
    }
  },
  mounted: function () {
    this.tween(0, this.radius)
  },
  methods: {
    tween: function (startValue, endValue) {
      var vm = this
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, 300)
        .onUpdate(function () {
          vm.tweeningValue = this.tweeningValue.toFixed(0)
        })
        .start()
      
      animate()
    }
  }
}
</script>

<style scoped lang="scss">
circle {
  fill: rgb(200, 0, 95);
}
</style>
