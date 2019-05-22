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
      this.$store.commit('setStep', Number(to.params.step))
    }
  },
  mounted: function () {
    this.$store.commit('setWalkthroughToTrue')
  }
}
</script>

<style lang="scss" scoped>
</style>

