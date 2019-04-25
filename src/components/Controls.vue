<template>
  <section class="controls">
    <RadioSelect
      id="targets"
      class="control__target"
      :options="targets"
      :value="selectedTarget"
      :defaultSelection="selectedTarget.code"
      @input="selectedTarget = $event"
    />
    <RangeSlider
      id="years"
      v-model="rangeValue"
      @input="selectedYear = $event"
    />
    <output>{{ selection.year }}</output>
    <DropDown
      id="regions"
      :options="regions"
      :value="selectedRegion"
      :defaultSelection="selectedRegion.code"
      @select="selectedRegion = $event"
    />
  </section>
</template>

<script>
import { mapState } from 'vuex'
import RadioSelect from '@/components/RadioSelect.vue'
import RangeSlider from '@/components/RangeSlider.vue'
import DropDown from '@/components/DropDownSelect.vue'

export default {
  name: 'controls',
  components: {
    RadioSelect,
    RangeSlider,
    DropDown
  },
  data: function () {
    return {
      rangeValue: 0
    }
  },
  computed: {
    ...mapState(['selection', 'targets', 'regions']),
    selectedTarget: {
      get () {
        return this.$store.state.selection.target
      },
      set (value) {
        this.$store.dispatch('changeTarget', value)
      }
    },
    selectedYear: {
      get () {
        return this.$store.state.selection.year
      },
      set (value) {
        this.$store.commit('setYear', value)
      }
    },
    selectedRegion: {
      get () {
        return this.$store.state.selection.region
      },
      set (value) {
        this.$store.commit('setRegion', value)
      }
    }
  },
  mounted: function () {
  }
}
</script>


<style lang="scss">
.controls {
  grid-area: h;
  padding: calc(var(--grid-spacing) / 2) var(--grid-spacing);
  text-align: left;
  box-shadow: 0 2px 4px var(--color-grey-09);
  z-index: 1;

  > * {
    display: inline-block;

    &:not(:last-child) {
      margin-right: var(--grid-spacing);
    }
  }
}
</style>
