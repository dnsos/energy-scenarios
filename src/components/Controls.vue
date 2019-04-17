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
  </section>
</template>

<script>
import { mapState } from 'vuex'
import RadioSelect from '@/components/RadioSelect.vue'
import RangeSlider from '@/components/RangeSlider.vue'

export default {
  name: 'controls',
  components: {
    RadioSelect,
    RangeSlider
  },
  data: function () {
    return {
      rangeValue: 0
    }
  },
  computed: {
    ...mapState(['selection', 'targets']),
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
    }
  },
  mounted: function () {
  }
}
</script>


<style lang="scss">
.controls {
  grid-area: h;
  text-align: right;

  > * {
    display: inline-block;

    &:not(:last-child) {
      margin-right: var(--grid-spacing);
    }
  }
}
</style>
