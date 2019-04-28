<template>
  <article class="chapter">
    <section class="chapter__story">
      <StoryBox />
    </section>
    <section class="chapter__content">
      <figure ref="figureWrapper">
        <svg :width="figureWidth" :height="figureHeight">
          <Matrix v-show="walkthrough.activeStep === 3" :width="figureWidth" :height="figureHeight" />
          <CarriersCircles
            v-show="walkthrough.activeStep === 4"
            :width="figureWidth"
            :height="figureHeight"
            :carriers="carriers"
            :maxValue="maxValue"
            :rangeValue="rangeValue"
          />
        </svg>
      </figure>
    </section>
  </article>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import StoryBox from '@/components/StoryBox.vue'
import Matrix from '@/components/Matrix.vue'
import CarriersCircles from '@/components/CarriersCircles.vue'

export default {
  name: 'walkthrough',
  components: {
    StoryBox,
    Matrix,
    CarriersCircles
  },
  data: function () {
    return {
      figureWidth: 971,
      figureHeight: 400
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
    }
  },
  mounted: function () {
    this.$store.commit('setStep', Number(this.$route.params.step)) // sets activeStep when entering via specific URL

    this.figureWidth = this.$refs.figureWrapper.offsetWidth
    window.addEventListener("resize", () => { // TODO: better way? 'watch'?
      this.figureWidth = this.$refs.figureWrapper.offsetWidth
    })
  }
}
</script>

<style lang="scss" scoped>
svg {
  border: .1rem dashed var(--color-grey-09);
  overflow: visible;
}
</style>

