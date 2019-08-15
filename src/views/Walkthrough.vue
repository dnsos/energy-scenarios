<template>
  <div class="viz__wrapper">
    <Viz />
  </div>
</template>

<script>
import Viz from '@/components/Viz.vue'

export default {
  name: 'walkthrough',
  components: {
    Viz
  },
  data: function () {
    return {}
  },
  computed: {
    activeStep: function () {
      return this.$store.state.walkthrough.activeStep
    }
  },
  watch: {
    activeStep: function (newVal) {
      this.$router.push({ name: 'walkthrough', params: { step: newVal } })
    },
    '$route' (to, from) {
      // if route changes from Browser utilities, update step
      // do not update if activeStep has already been updated in StoryBox.vue
      if (Number(to.params.step) != this.activeStep) {
        if (Number(to.params.step) === 6 && Number(from.params.step != 7)) {
          // redirect to step 5 if 6 is targeted: otherwise data for circle packing won't be available
          this.$store.commit('setStep', Number(to.params.step) - 1)
        } else {
          // set step from Browser utilities
          this.$store.commit('setStep', Number(to.params.step))
        }
      }
    }
  },
  mounted: function () {
    // only toggle specifically to 'walkthrough' if current state is not 'walkthrough'
    if (this.$store.state.mode.isWalkthrough != true) {
      this.$store.commit('toggleMode', 'walkthrough')
      this.$store.commit('setYear', 2020)
      this.$store.commit('setRegion', 'World')
      this.$store.commit('setTarget', '26')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

