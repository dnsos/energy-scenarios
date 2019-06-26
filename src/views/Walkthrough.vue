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
    activeStep: function (newVal, oldVal) {
      this.$router.push({ name: 'walkthrough', params: { step: newVal } })
    },
    '$route' (to, from) {
      // if route changes from Browser utilities, update step
      // do not update if activeStep has already been updated in StoryBox.vue
      if (Number(to.params.step) != this.activeStep) {
        this.$store.commit('setStep', Number(to.params.step))
      }
    }
  },
  mounted: function () {
    // only toggle specifically to 'walkthrough' if current state is not 'walkthrough'
    if (this.$store.state.mode.isWalkthrough != true) {
      this.$store.commit('toggleMode', 'walkthrough')
      // specify start year for beginning of walkthrough
      this.$store.dispatch('changeYear', 2020)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

