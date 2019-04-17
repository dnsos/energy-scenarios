<template>
  <article class="chapter">
    <section class="chapter__story">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, neque! Temporibus alias suscipit a. A at ipsam aspernatur, saepe cumque, tempora nam explicabo excepturi molestiae vero provident corporis ab dicta.</p>
      <RangeSlider
        id="years"
        label="Year:"
        v-model="rangeValue"
        @input="selectedYear = $event"
      />
    </section>
    <section class="chapter__content">
      <figure>
        <svg :width="figureWidth" :height="figureHeight">
          <TypeCircles
            v-show="stages.singleSSP.active"
            :figureWidth="figureWidth"
            :figureHeight="figureHeight"
            :fossilData="fossilAmount"
            :nonfossilData="nonfossilAmount"
          />
          <CarriersCircles
            v-show="stages.carriersMix.active"
            :carriers="carriers"
            :maxValue="maxValue"
            :rangeValue="rangeValue"
          />
        </svg>
      </figure>
      <p style="text-align: right;"><span class="indicator">{{ selection.region.name }}</span> in <span class="indicator">{{ selection.society.name }}</span></p>
    </section>
  </article>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import RangeSlider from '@/components/RangeSlider.vue'
import TypeCircles from '@/components/TypeCircles.vue'
import CarriersCircles from '@/components/CarriersCircles.vue'

export default {
  name: 'intro',
  components: {
    RangeSlider,
    TypeCircles,
    CarriersCircles
  },
  data: function () {
    return {
      figureWidth: 1095,
      figureHeight: 400,
      rangeValue: 0,
      stages: {
        singleSSP: { active: false },
        carriersMix: { active: true }
      }
    }
  },
  computed: {
    ...mapState(['selection']),
    ...mapGetters({
        carriers: 'carriersData',
        fossilData: 'fossilData',
        totalData: 'totalData',
        maxValue: 'carriersMaxValue'
    }),
    fossilAmount: function () {
      let fossilAmount = this.fossilData.values[this.rangeValue]
      return fossilAmount
    },
    nonfossilAmount: function () {
      let nonfossilAmount = this.totalData.values[this.rangeValue] - this.fossilData.values[this.rangeValue]
      return nonfossilAmount
    },
    /*carriersMaxValue: function () { // max of selection
      const maxValues = this.carriers.map(carrier => {
        return Math.max(...carrier.baseline.values, ...carrier.target.values)
      })
      return Math.max(...maxValues)
    },*/
    selectedYear: {
      get () {
        return this.$store.state.selection.year
      },
      set (value) {
        this.$store.commit('setYear', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
svg {
  border: .1rem dashed var(--color-grey-20);
  overflow: visible;
}
</style>

