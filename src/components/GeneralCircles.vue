<template>
  <g v-if="walkthrough.activeStep <= 2">
    <line
      class="tooltip__line"
      v-if="walkthrough.activeStep === 0"
      :x1="xOffset"
      y1="0"
      :x2="-xOffset * 3"
      y2="0"
    />
    <circle
      class="circle circle__total"
      :class="{ 'circle__total--focus': walkthrough.activeStep === 0 }"
      :r="tweenedTotalRadius"
      :cx="xOffset"
    ></circle>
    <text
      class="tooltip__total"
      v-if="walkthrough.activeStep === 0"
      :x="-xOffset * 3"
      dy="-5"
    >{{ Math.round(value) }} EJ/yr</text>
  </g>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GeneralCircles',
  props: {
    xOffset: {
      type: Number,
      required: true
    },
    radiusTotal: {
      type: Number,
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  data: function() {
    return {
      tweeningDuration: 500,
      tweenedTotalRadius: 0
    }
  },
  computed: {
    ...mapState(['walkthrough', 'mode']),
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
        .to({ tweeningValue: endValue }, vm.tweeningDuration)
        .onUpdate(function () {
          vm.tweenedTotalRadius = this.tweeningValue
        })
        .start()
      
      animate()
    }
  },
  watch: {
    radiusTotal: function (newValue, oldValue) {
      this.tween(oldValue, newValue)
    }
  },
  mounted: function () {
    this.tween(0, this.radiusTotal)
  }
}
</script>

<style scoped lang="scss">
.circle__total {
  stroke-width: 1.5;
  stroke: var(--color-violet);
  fill: #edecf7;
  fill-opacity: 0.25;
  stroke-opacity: 0.25;
  //transition: opacity 1s ease-in;
}
.circle__total--focus {
  fill-opacity: 1;
  stroke-opacity: 1;
}
.tooltip__total {
  font-family: var(--font-family-mono);
  text-anchor: end;
}
</style>
