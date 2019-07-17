<template>
  <div class="viz__wrapper">
    <Viz />
  </div>
</template>

<script>
import Viz from '@/components/Viz.vue'

export default {
  name: 'explorer',
  components: {
    Viz
  },
  data: function () {
    return {}
  },
  computed: {},
  watch: {
    '$route' (to, from) {
      // if route changes from Browser utilities
      if (to.params.society === 'matrix') {
        this.$store.commit('setExplorerToMatrix')
        this.$store.commit('emptySocietiesArray')
      } else {
        console.log('to:', to)
        this.$store.commit('setExplorerToMix')
      }
    }
  },
  mounted: function () {
    this.$store.dispatch('changeMode')
    this.$store.commit('setExplorerToMatrix')
    this.$store.commit('emptySocietiesArray')
    this.$store.commit('setStep', 0)
    this.$store.dispatch('changeYear', 2050)
  }
}
</script>

<style lang="scss" scoped>
</style>

