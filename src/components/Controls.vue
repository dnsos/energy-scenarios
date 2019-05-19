<template>
  <div class="controls__wrapper">
    <div class="controls__contents">
      <RadioSelect
        id="targets"
        class="control__target"
        :options="targets"
        :value="selectedTarget"
        :defaultSelection="selectedTarget.code"
        @input="selectedTarget = $event"
      />
      <!--<RangeSlider
        id="years"
        v-model="rangeValue"
        @input="selectedYear = $event"
      />-->
      <output>Year: {{ selection.year }}</output>
      <DropDown
        id="regions"
        :options="regions"
        :value="selectedRegion"
        :defaultSelection="selectedRegion.code"
        @select="selectedRegion = $event"
      />
    </div>
    <hr class="controls__border">
  </div>
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
.controls__wrapper {
  background-color: white;
  z-index: 1;
}

.controls__contents {
  padding: calc(var(--grid-spacing) / 2) var(--grid-spacing);
  text-align: left;

  > * {
    display: inline-block;

    &:not(:last-child) {
      margin-right: var(--grid-spacing);
    }
  }
}

.controls__border {
  width: calc(100% - calc(var(--grid-spacing) * 2));
  height: .1rem;
  margin: 0 auto;
  color: var(--color-grey-76); // TODO: how to color an hr properly?
}
</style>
