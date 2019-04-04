<template>
  <circle :cx="tweeningValue" cy="0" :r="tweeningValue" />
</template>

<script>
import * as d3 from "d3" // TODO: create d3 functionalities asset
// TODO: import Tween lib and remove script tag in index.html

export default {
  name: 'EnergyCircle',
  props: { 
    maxRadius: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
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
      const scale = d3
        .scaleLinear()
        .range([0, this.maxRadius])
        .domain([0, this.maxValue])

      return scale(this.value)
    }
  },
  watch: {
    radius: function (oldValue, newValue) {
      this.tween(newValue, oldValue) // TODO: works, but why new before old?
    }
  },
  mounted: function () {
    this.tween(0, this.radius) // TODO: why inversed values here?
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
  fill: rgb(200, 0, 95);
}
</style>
