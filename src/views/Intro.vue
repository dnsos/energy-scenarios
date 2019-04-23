<template>
  <article class="chapter">
    <section class="chapter__story">
      <p>{{ walkthrough.steps[activeStep].text }}</p>
      <button v-if="activeStep > 0" @click="activeStep = activeStep - 1">Previous</button>
      <button v-if="activeStep < walkthrough.steps.length - 1" class="button__next" @click="activeStep = activeStep + 1">Next</button>
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
import TypeCircles from '@/components/TypeCircles.vue'
import CarriersCircles from '@/components/CarriersCircles.vue'

export default {
  name: 'intro',
  components: {
    TypeCircles,
    CarriersCircles
  },
  data: function () {
    return {
      id: 'test',
      figureWidth: 1095,
      figureHeight: 400,
      stages: {
        singleSSP: { active: false },
        carriersMix: { active: true }
      }
    }
  },
  computed: {
    ...mapState(['selection', 'walkthrough']),
    ...mapGetters({
        carriers: 'carriersData',
        fossilData: 'fossilData',
        totalData: 'totalData',
        maxValue: 'carriersMaxValue',
        rangeValue: 'rangeValue'
    }),
    fossilAmount: function () {
      let fossilAmount = this.fossilData.values[this.rangeValue]
      return fossilAmount
    },
    nonfossilAmount: function () {
      let nonfossilAmount = this.totalData.values[this.rangeValue] - this.fossilData.values[this.rangeValue]
      return nonfossilAmount
    },
    activeStep: {
      get () {
        return this.$store.state.walkthrough.activeStep
      },
      set (value) {
        this.$store.commit('setStep', value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
svg {
  /*border: .1rem dashed var(--color-grey-09);*/
  overflow: visible;
}

button {
  margin-right: .5rem;
  font-family: var(--font-family-mono);
  color: var(--color-dark-blue);
  background-color: transparent;
  border: .15rem solid var(--color-dark-blue);
}

.button__next {
  color: white;
  background-color: var(--color-dark-blue);
}
</style>

