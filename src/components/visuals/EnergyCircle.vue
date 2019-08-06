<template>
  <circle
    :class="carrierType"
    :cx="[ !packingMode ? tweenedRadius : packingValues.x ]"
    :cy="[ !packingMode ? 0 : packingValues.y ]"
    :r="[ !packingMode ? tweenedRadius : packingValues.r ]"
  />
</template>

<script>
import * as d3 from "d3" // TODO: create d3 functionalities asset

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
      required: false,
      default: 0
    },
    maxValue: {
      type: Number,
      required: true
    },
    packingMode: {
      type: Boolean,
      required: false,
      default: false
    },
    packingValues: {
      type: Object,
      required: false,
      default: () => {
        return {
          x: 80,
          y: 0,
          r: 35
        }
      }
    }
  },
  data: function() {
    return {
      tweenedRadius: 0
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
      this.tween(oldValue, newValue, 400)
      this.$emit('update-radius', newValue)
    }
  },
  mounted: function () {
    this.$emit('update-radius', this.radius)
    this.tween(0, this.radius, 400)
  },
  methods: {
    tween: function (startValue, endValue, tweeningDuration) {
      var vm = this
      function animate () {
        if (TWEEN.update()) {
          requestAnimationFrame(animate)
        }
      }

      new TWEEN.Tween({ tweeningValue: startValue })
        .to({ tweeningValue: endValue }, tweeningDuration)
        .onUpdate(function () {
          vm.tweenedRadius = this.tweeningValue
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

.circle__baseline {
  stroke: var(--color-violet);
  fill: var(--color-violet-light);
}

.circle__target {
  stroke: var(--color-yellow);
  fill: var(--color-yellow-light);
}
</style>
