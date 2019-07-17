<template>
  <div class="viz__wrapper">
    <span
      v-if="!mode.isWalkthrough && selection.explorer.mix.isActive"
      class="back-button"
      @click="returnToMatrix()"
    >←&nbsp;Back to Matrix</span>
    <Viz />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Viz from '@/components/Viz.vue'

export default {
  name: 'explorer',
  components: {
    Viz
  },
  data: function () {
    return {}
  },
  computed: {
    ...mapState(['selection', 'mode'])
  },
  methods: {
    returnToMatrix: function () {
      this.$router.push({ name: 'explorer', params: { view: 'matrix' } }) 
    }
  },
  watch: {
    '$route' (to, from) {
      // if route changes from Browser utilities
      if (to.params.view === 'matrix') {
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
.back-button {
  position: absolute;
  font-family: var(--font-family);
  font-size: var(--font-size-small);
  color: var(--color-grey-31);
  cursor: pointer;
}
</style>

