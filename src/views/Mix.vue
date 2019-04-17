<template>
  <article class="chapter">
    <section class="chapter__story">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, et id provident est laudantium quaerat voluptatum pariatur, corporis iure earum modi nulla labore magnam iste illo, laborum maiores ad ab?</p>
      <RangeSlider
        id="years"
        label="Year:"
        v-model="rangeValue"
        @input="selectedYear = $event"
      />
    </section>
    <section class="chapter__content">
      <CarriersCircles :carriers="carriers" :maxValue="carriersMaxValue" :rangeValue="rangeValue" />
      <p style="text-align: right;"><span class="indicator">{{ selection.region.name }}</span> in <span class="indicator">{{ selection.society.name }}</span></p>
    </section>
  </article>
</template>

<script>
import { mapState } from 'vuex'
import CarriersCircles from '@/components/CarriersCircles.vue'
import RadioSelect from '@/components/RadioSelect.vue'
import RangeSlider from '@/components/RangeSlider.vue'

export default {
  name: 'mix',
  components: {
    CarriersCircles,
    RangeSlider,
    RadioSelect
  },
  data: function () {
    return {
      rangeValue: 0
    }
  },
  computed: {
    ...mapState(['selection', 'societies']),
    carriers: function () { // TODO: create mapGetters
      return this.$store.getters.carriersData
    },
    carriersMaxValue: function () {
      const maxValues = this.carriers.map(carrier => {
        return Math.max(...carrier.baseline.values, ...carrier.target.values)
      })
      return Math.max(...maxValues)
    },
    selectedYear: {
      get () {
        return this.$store.state.selection.year
      },
      set (value) {
        this.$store.commit('setYear', value)
      }
    },
    selectedSociety: {
      get () {
        return this.$store.state.selection.society // get from store
      },
      set (value) {
        this.$store.commit('setSociety', value) // commit to store
      }
    }
  },
  mounted: function () {
  }
}
</script>

<style lang="scss" scoped>
</style>
