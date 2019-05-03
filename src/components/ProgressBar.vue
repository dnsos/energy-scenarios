<template>
  <div class="progress-bar__wrapper">
    <svg width="348.5" height="5">
      <rect x="0" y="0" :width="progressWidth" height="5" class="progress-bar" />
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
      required: true,
      default: 348.5
    }
  },
  data: function () {
    return {}
  },
  computed: {
    ...mapState(['selection', 'walkthrough']),
    progressWidth: function () {
      return (this.width / this.walkthrough.steps.length) * (this.walkthrough.activeStep + 1)
    }
  }
}
</script>

<style lang="scss">
.progress-bar__wrapper {
  width: 100%;
  height: .5rem;
  line-height: 0;

  .progress-bar {
    fill: var(--color-dark-blue);
  }
}
</style>
