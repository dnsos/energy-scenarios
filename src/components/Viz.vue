<template>
  <figure class="viz__figure" ref="vizWrapper">
    <svg :width="figure.width" :height="figure.height">
      <defs>
        <marker
          id="marker__arrow"
          orient="auto-start-reverse"
          markerWidth="8"
          markerHeight="8"
          refX="8"
          refY="4"
        ><path class="axis__arrow" d="M0,0 L8,4 0,8" />
        </marker>
      </defs>
      <g v-if="isVisible([3,4,5])">
        <g
          class="axis axis__x"
          :transform="'translate(' + 0 + ',' + figure.height + ')'"
        >
          <line
            class="axis__line"
            :x1="figure.width * 0.06"
            :y1="-2.5"
            :x2="figure.width * 0.94"
            :y2="-2.5"
            marker-start="url(#marker__arrow)"
            marker-end="url(#marker__arrow)"
          />
          <text
            class="indicator indicator__low"
            :transform="'translate(' + figure.width * 0.04 + ',0)'">Low</text>
          <rect :transform="'translate(' + (figure.width / 2 - 85) + ',-5)'" width="170" height="10" fill="white" />
          <text
            class="indicator indicator__variable"
            :transform="'translate(' + figure.width * 0.5 + ',0)'">Challenges for Adaptation</text>
          <text
            class="indicator indicator__high"
            :transform="'translate(' + figure.width * 0.96 + ',0)'">High</text>
        </g>
        <g class="axis axis__y" transform="translate(10,0)">
          <g>
            <line
              class="axis__line"
              :x1="-2.5"
              :y1="figure.height * 0.06"
              :x2="-2.5"
              :y2="figure.height * 0.94"
              marker-start="url(#marker__arrow)"
              marker-end="url(#marker__arrow)"
            />
            <text
              class="indicator indicator__high"
              :transform="'translate(0,' + figure.height * 0.04 + ')rotate(-90)'">High</text>
            <rect :transform="'translate(-5,' + (figure.height / 2 - 80) + ')'" width="10" height="160" fill="white" />
            <text
              class="indicator indicator__variable"
              :transform="'translate(0,' + figure.height * 0.5 + ') rotate(-90)'">Challenges for Mitigation</text>
            <text
              class="indicator indicator__low"
              :transform="'translate(0,' + figure.height * 0.96 + ') rotate(-90)'">Low</text>
          </g>
        </g>
      </g>
      <g :transform="'translate(' + margins.left + ',' + margins.top + ')'">
        <Matrix
          v-if="isExplorer && selection.explorer.matrix.isActive || isWalkthroughMode() && atWalkthroughStep([0,1,2,3,4,5])"
          :width="vizDimensions.width"
          :height="vizDimensions.height"
        />
        <CarriersCircles
          v-if="isExplorer && selection.explorer.mix.isActive || isWalkthroughMode() && atWalkthroughStep([7,8,9])"
          :width="vizDimensions.width"
          :height="vizDimensions.height"
          :societies="carriersNew"
          :maxValue="carriersMaxValueAbs"
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
      figure: {
        width: 971,
        height: 500
      },
      margins: {
        top: 20,
        right: 20,
        bottom: 20,
        left: 20
      }
    }
  },
  computed: {
    ...mapState(['selection', 'walkthrough', 'mode']),
    ...mapGetters({
        carriersNew: 'carriersDataNew',
        maxValue: 'carriersMaxValue',
        carriersMaxValueAbs: 'carriersMaxValueAbs',
        rangeValue: 'rangeValue'
    }),
    isExplorer: function () {
      return !this.mode.isWalkthrough
    },
    currentStep: function () {
      return this.$store.state.walkthrough.activeStep
    },
    vizDimensions: function () {
      return {
        width: this.figure.width - this.margins.left - this.margins.right,
        height: this.figure.height - this.margins.top - this.margins.bottom
      }
    }
  },
  methods: {
    isVisible: function (steps) {
      // TODO: duplicate of method in TypeCircles.vue. Refactor!
      if (!this.mode.isWalkthrough && this.selection.explorer.matrix.isActive) {
        return true
      } else if (this.mode.isWalkthrough && this.atWalkthroughStep(steps)) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    currentStep: function (newIndex, oldIndex) {
      // only dispatch action if years of current and previous step are not equal
      if (this.mode.isWalkthrough) {
        if (this.walkthrough.steps[newIndex].year != this.walkthrough.steps[oldIndex].year) {
          this.$store.dispatch('changeYear', this.walkthrough.steps[newIndex].year) 
        } else {
          //console.log('Year has not changed')
        }
      } else {
        return 
      }
    }
  },
  mounted: function () {
    if (this.mode.isWalkthrough) {
      this.$store.commit('setStep', Number(this.$route.params.step)) // sets activeStep when entering via specific URL
    } else {
      if (this.$route.params.society === 'mix') {
        this.$store.commit('setExplorerToMix') // TODO: does not work
      }
      this.$store.commit('setStep', 0)
    }
    
    this.figure.width = this.$refs.vizWrapper.offsetWidth
    this.figure.height = this.$refs.vizWrapper.offsetWidth / 2
    window.addEventListener("resize", () => {
      this.figure.width = this.$refs.vizWrapper.offsetWidth
      this.figure.height = this.$refs.vizWrapper.offsetWidth / 2
    })
  }
}
</script>

<style scoped lang="scss">
.viz__figure {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
svg {
  /*border: .1rem dashed var(--color-grey-09);*/
  overflow: visible;
}

.axis__arrow {
    stroke: var(--color-grey-31);
    fill: none;
  }

.axis {
  font-size: var(--font-size-small);
  font-family: var(--font-family);
  fill: var(--color-grey-31);
  .indicator__variable {
    font-weight: 500;
    text-anchor: middle;
  }
  .axis__line {
    stroke: var(--color-grey-31);
  }
}
.axis__x {
  .indicator__high {
    text-anchor: start;
  }
  .indicator__low {
    text-anchor: end;
  }
}
.axis__y {
  .indicator__high {
    text-anchor: start;
  }
  .indicator__low {
    text-anchor: end;
  }
}
</style>
