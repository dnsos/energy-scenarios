<template>
  <div class="viz__wrapper">
    <span
      v-if="!mode.isWalkthrough && selection.explorer.mix.isActive"
      class="back-button"
      @click="returnToMatrix()"
    >←&nbsp;Back to Matrix</span>
    <fieldset v-if="!mode.isWalkthrough && selection.explorer.mix.isActive" class="select__society">
      <!--<label for="society-select">Add a society:&nbsp;</label>-->
      <select name="society-select" class="select" id="society-select" v-model="selectedSociety" @change="addActiveSociety(selectedSociety)">
        <option value=""
            hidden
        >Add a society</option>
        <option
          v-for="society in societies"
          :key="society.code"
          :value="society.code"
          :disabled="selection.explorer.mix.activeSocieties.includes(society.code)">
          {{ society.name }}</option>
      </select>
    </fieldset>
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
    return {
      selectedSociety: ''
    }
  },
  computed: {
    ...mapState(['selection', 'mode', 'societies'])
  },
  methods: {
    returnToMatrix: function () {
      this.$router.push({ name: 'explorer', params: { view: 'matrix' } }) 
    },
    addActiveSociety: function (SSP) {
      this.$store.commit('setExplorerSociety', SSP)
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
.select__society {
  position: absolute;
  top: 95%;
  font-size: var(--font-size-small);
}
</style>

