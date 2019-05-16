<template>
  <div class="progress-bar__wrapper">
    <svg :width="width" height="5">
      <rect x="0" y="0" :width="tweenedProgressWidth" height="5" class="progress-bar" />
    </svg>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ProgressBar',
  props: {
    width: {
      type: Number,
      required: false
    }
  },
  data: function () {
    return {
      tweenedProgressWidth: 0
    }
  },
  computed: {
    ...mapState(['selection', 'walkthrough']),
    progressWidth: function () {
      return (this.width / this.walkthrough.steps.length) * (this.walkthrough.activeStep + 1)
    }
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
          vm.tweenedProgressWidth = this.tweeningValue
        })
        .start()
      
      animate()
    }
  },
  watch: {
    progressWidth: function (newValue, oldValue) {
      this.tween(oldValue, newValue)
    }
  },
  mounted: function () {
    this.tween(0, this.progressWidth)
  }
}
</script>

<style lang="scss">
.progress-bar__wrapper {
  width: 100%;
  height: .5rem;
  line-height: 0;

  .progress-bar {
    fill: var(--color-primary-neutral);
  }
}
</style>
