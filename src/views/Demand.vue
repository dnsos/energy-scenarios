<template>
  <article class="chapter">
    <section class="title">
      <h1>This is the energy demand of our world in 2020.</h1>
      <p>(SSP2-Baseline)</p>
    </section>
    <section class="intro">
      <RadioSelect
        id="regions"
        :options="regions"
        :message="'Select a region'"
        :value="selectedRegion"
        @input="selectedRegion = $event"
      />
      <RangeSlider
        id="years"
        label="Year"
        @input="rangeValue = $event"
      />
    </section>
    <section class="content">
      <p>Selected region: {{ selectedRegion }}</p>
      <p>Selected year: {{ displayedYear }}</p>
      <p>Fossil energy: {{ fossilAmount }} {{ unit }}</p>
      <p>Non-fossil energy: {{ nonfossilAmount }} {{ unit }}</p>
      <p>Total energy: {{ totalAmount }} {{ unit }}</p>
    </section>
  </article>
</template>

<script>
import RadioSelect from '@/components/RadioSelect.vue'
import RangeSlider from '@/components/RangeSlider.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'demand',
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
    ...mapGetters([
      'startyear',
      'yearinterval',
      'unit',
      'regions',
      'fossilData',
      'totalData'
    ]),
    displayedYear: function () {
      return this.startyear + (this.yearinterval * this.rangeValue)
    },
    fossilAmount: function () {
      let fossilAmount = this.fossilData[0].values[this.rangeValue]
      return fossilAmount
    },
    nonfossilAmount: function () {
      let nonfossilAmount = this.totalData[0].values[this.rangeValue] - this.fossilData[0].values[this.rangeValue]
      return nonfossilAmount
    },
    totalAmount: function () {
      let totalAmount = this.totalData[0].values[this.rangeValue]
      return totalAmount
    },
    selectedRegion: {
      get () {
        return this.$store.state.selection.region // gets active region from store
      },
      set (value) {
        this.$store.commit('setRegion', value) // commits active region to store from :value
      }
    }
  },
  methods: {
  },
  mounted: function () {
    // console.log(this.aggregatedByRegion("World"))
    // this.selected = this.aggregatedByRegion("World")
  }
}
</script>

<style lang="scss" scoped>
.title {
  grid-column: 1 / 4;
}
.intro {
  grid-column: 1 / 4;
}
.content {
  grid-column: 4 / 13;
}

</style>
