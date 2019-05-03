<template>
  <circle :class="carrierType" :cx="tweeningValue" cy="0" :r="tweeningValue" />
</template>

<script>
import * as d3 from "d3" // TODO: create d3 functionalities asset
// TODO: import Tween lib and remove script tag in index.html

export default {
  name: 'EnergyCircle',
  props: {
    carrierType: {
      type: String,
      required: false
    },
    maxRadius: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true,
      default: 0
    },
    maxValue: {
      type: Number,
      required: true
    }
  },
  data: function() {
    return {
      tweeningValue: 0
    }
  },
  computed: {
    radius: function () {
      const maxArea = Math.pow(this.maxRadius, 2) * Math.PI // calculates the maximum available area based on maxRadius
      
      const scale = d3 // creates a scale for mapping a value on range between zero and the maximum area
        .scaleLinear()
        .range([0, maxArea])
        .domain([0, this.maxValue])

      return Math.sqrt(scale(this.value) / Math.PI) // computes radius from value on maxArea scale
    }
  },
  watch: {
    radius: function (newValue, oldValue) {
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
        .to({ tweeningValue: endValue }, 200)
        .onUpdate(function () {
          vm.tweeningValue = this.tweeningValue
        })
        .start()
      
      animate()
    }
  }
}
</script>

<style scoped lang="scss">
circle {
  stroke-width: 1.5;
  stroke: var(--color-violet);
  fill: var(--color-violet);
  fill-opacity: 1;
}

.circle--baseline {
  stroke: var(--color-violet);
  fill: #edecf7;
}

.circle--target {
  stroke: var(--color-yellow);
  fill: #fff7e7;
}
</style>
