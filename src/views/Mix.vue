<template>
  <article class="chapter">
    <section class="chapter__story">
      <RangeSlider
        id="years"
        label="Year"
        v-model="rangeValue"
        @input="selectedYear = $event"
      />
      <RadioSelect
        id="societies"
        :options="societies"
        :message="'Select a future society'"
        :value="selectedSociety.code"
        :defaultSelection="selectedSociety.code"
        @input="selectedSociety = $event"
      />
      <p>Region: {{ selection.region.name }}</p>
      <p>Society: {{ selection.society.name }}</p>
      <p>Target: {{ selection.target.name }}</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, et id provident est laudantium quaerat voluptatum pariatur, corporis iure earum modi nulla labore magnam iste illo, laborum maiores ad ab?</p>
    </section>
    <section class="chapter__content">
      <CarriersCircles :carriers="carriers" :maxValue="carriersMaxValue" :rangeValue="rangeValue" />
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
    carriers: function () {
      return this.$store.getters.carriersData(this.selection.society, this.selection.target) // TODO: remove unnessecary args
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
.chapter__content {
  grid-column: span 9;
}

.chapter__story {
  grid-column: span 3;
}
</style>
