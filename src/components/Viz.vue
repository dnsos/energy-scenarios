<template>
  <figure ref="vizWrapper">
    <svg :width="figureWidth" :height="figureHeight">
      <g v-if="walkthrough.activeStep === 3 || walkthrough.activeStep === 4">
        <g class="axis axis__x" :transform="'translate(0,' + figureHeight + ')'">
          <text class="indicator indicator__low" :x="figureWidth * 0.05">Low</text>
          <text class="indicator indicator__variable" :x="figureWidth / 2">
            <tspan>←&nbsp;&nbsp;&nbsp;</tspan>
            <tspan class="strong">Inequality</tspan>
            <tspan>&nbsp;&nbsp;&nbsp;→</tspan>
          </text>
          <text class="indicator indicator__high" :x="figureWidth * 0.95">High</text>
        </g>
        <!--<g class="axis axis__y" transform="rotate(-90,0,0)">
          <text class="indicator indicator__high" :y="figureHeight * 0.05">High</text>
          <text class="indicator indicator__variable" :y="figureHeight / 2">
            <tspan>←&nbsp;&nbsp;&nbsp;</tspan>
            <tspan class="strong">Fossil fuel use</tspan>
            <tspan>&nbsp;&nbsp;&nbsp;→</tspan>
          </text>
          <text class="indicator indicator__low" :y="figureHeight * 0.95">Low</text>
        </g>-->
      </g>
      <g :transform="'translate(' + axisMargin +',' + 20 + ')'">
        <Matrix v-if="walkthrough.activeStep < 5" :width="figureWidth - axisMargin" :height="figureHeight - axisMargin" />
        <CarriersCircles
          :width="figureWidth - axisMargin"
          :height="figureHeight - axisMargin"
          :carriers="carriers"
          :maxValue="maxValue"
          :rangeValue="rangeValue"
        />
      </g>
    </svg>
  </figure>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import Matrix from '@/components/Matrix.vue'
import CarriersCircles from '@/components/CarriersCircles.vue'

export default {
  name: 'Viz',
  components: {
    Matrix,
    CarriersCircles
  },
  props: [],
  data: function() {
    return {
      figureWidth: 971,
      figureHeight: 500,
      axisMargin: 40
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
    currentStep: function () {
      return this.$store.state.walkthrough.activeStep // TODO: get this from mapState
    }
  },
  watch: {
    currentStep: function (newIndex, oldIndex) {
      this.$store.commit('setYearFromWalkthrough', this.walkthrough.steps[newIndex].year)
    }
  },
  mounted: function () {
    this.$store.commit('setStep', Number(this.$route.params.step)) // sets activeStep when entering via specific URL

    this.figureWidth = this.$refs.vizWrapper.offsetWidth
    window.addEventListener("resize", () => { // TODO: better way? 'watch'?
      this.figureWidth = this.$refs.vizWrapper.offsetWidth
    })
  }
}
</script>

<style scoped lang="scss">
svg {
  /*border: .1rem dashed var(--color-grey-09);*/
  overflow: visible;
}

.axis {
  font-size: var(--font-size-small);
  fill: var(--color-grey-54);

  .indicator__high {
    text-anchor: end;
  }
  .indicator__variable {
    text-anchor: middle;
  }
  .strong {
    font-weight: 700;
  }
}
.axis__y {
  .indicator__high {
    text-anchor: start;
  }
  .indicator__low {
    text-anchor: start;
  }
}
</style>
