<template>
  <g
    @mouseenter="toggleHovered()"
    @mouseleave="toggleHovered()"
    class="matrix__group"
    :class="{ 'group--active': isHovered}"
  >
    <rect
      class="group__background"
      :x="-(width / 2)"
      :y="-(height / 2)"
      :width="width"
      :height="height"
    ></rect>
    <!--<g v-if="walkthrough.activeStep <= 3">
      <circle
        class="circle circle__total"
        :r="(radiusFossilBaseline + radiusNonfossilBaseline) * scale"
        :cx="-((radiusFossilBaseline * 2) - (radiusFossilBaseline + radiusNonfossilBaseline ) / 2)"
      ></circle>
    </g>-->
    <g class="group__fossil" transform="rotate(180)">
      <EnergyCircle
        class="circle circle__fossil"
        :class="'circle--target'"
        v-if="walkthrough.activeStep >= 4 && comparisons.fossil.targetIsHigher"
        :maxRadius="maxRadius"
        :value="values.fossil.target"
        :maxValue="maxValue"
      />
      <EnergyCircle
        class="circle circle__fossil"
        :class="'circle--baseline'"
        ref="fossilBaselineCircle"
        :maxRadius="maxRadius * scale"
        :value="values.fossil.baseline"
        :maxValue="maxValue"
      />
      <EnergyCircle
        class="circle circle__fossil"
        :class="'circle--target'"
        v-if="walkthrough.activeStep >= 4 && !comparisons.fossil.targetIsHigher"
        :maxRadius="maxRadius"
        :value="values.fossil.target"
        :maxValue="maxValue"
      />
    </g>
    <g class="group__nonfossil">
      <EnergyCircle
        class="circle circle__nonfossil circle--target"
        v-if="walkthrough.activeStep >= 4 && comparisons.nonfossil.targetIsHigher"
        :maxRadius="maxRadius"
        :value="values.nonfossil.target"
        :maxValue="maxValue"
      />
      <EnergyCircle
        class="circle circle__nonfossil circle--baseline"
        ref="nonfossilBaselineCircle"
        :maxRadius="maxRadius * scale"
        :value="values.nonfossil.baseline"
        :maxValue="maxValue"
      />
      <EnergyCircle
        class="circle circle__nonfossil circle--target"
        v-if="walkthrough.activeStep >= 4 && !comparisons.nonfossil.targetIsHigher"
        :maxRadius="maxRadius"
        :value="values.nonfossil.target"
        :maxValue="maxValue"
      />
    </g>
    <g class="group__labels" v-if="walkthrough.activeStep >= 3">
      <transition name="fade">
        <text
          class="matrix__society"
          :transform="'translate(0,' + height * 0.4 + ')'">
          {{ society.name }}
          </text>
      </transition>
      <transition name="fade">
        <text
          class="matrix__society matrix__society--infeasible"
          v-if="walkthrough.activeStep === 4 && values.fossil.target === 0"
          :transform="'translate(0,' + height * 0.5 + ')'"
        >(Target infeasible)</text>
      </transition>
    </g>
  </g>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import EnergyCircle from '@/components/EnergyCircle.vue'

export default {
  name: 'TypeCircles',
  components: {
    EnergyCircle
  },
  props: {
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    society: {
      type: Object,
      required: true
    },
    data: {
      type: Object,
      required: true
    },
    maxValue: {
      type: Number,
      required: true
    }
  },
  data: function() {
    return {
      isHovered: false,
      radiusFossilBaseline: 0,
      radiusNonfossilBaseline: 0,
      scale: 1
    }
  },
  computed: {
    ...mapState(['walkthrough']),
    ...mapGetters(['rangeValue']),
    maxRadius: function () {
      return this.width / 4
    },
    values: function () {
      return {
        fossil: {
          baseline: this.data.baseline.fossil.values[this.rangeValue],
          target: this.data.target.fossil.values[this.rangeValue]
        },
        nonfossil: {
          baseline: this.data.baseline.nonfossil.values[this.rangeValue],
          target: this.data.target.nonfossil.values[this.rangeValue]
        }
      }
    },
    comparisons: function () {
      return {
        fossil: {
          targetIsHigher: this.values.fossil.target > this.values.fossil.baseline
        },
        nonfossil: {
          targetIsHigher: this.values.nonfossil.target > this.values.nonfossil.baseline
        }
      }
    },
    currentStep: function () {
      return this.$store.state.walkthrough.activeStep // TODO: get this from mapState
    }
  },
  watch: {
    currentStep: function (newIndex, oldIndex) {
      this.scale = this.walkthrough.steps[newIndex].scale
      this.radiusFossilBaseline = this.$refs.fossilBaselineCircle.radius
      this.radiusNonfossilBaseline = this.$refs.nonfossilBaselineCircle.radius
    }
  },
  methods: {
    toggleHovered: function () {
      this.isHovered = !this.isHovered
    }
  },
  created: function () {
    this.scale = this.walkthrough.steps[this.currentStep].scale
  },
  mounted: function () {
    this.radiusFossilBaseline = this.$refs.fossilBaselineCircle.radius
    this.radiusNonfossilBaseline = this.$refs.nonfossilBaselineCircle.radius
  }
}
</script>

<style scoped lang="scss">
.matrix__society {
  font-size: var(--font-size-small);
  text-anchor: middle;
}
.matrix__society--infeasible {
  fill: var(--color-yellow);
}
.group__background {
  fill: transparent;
  transition: all .1s ease-in;
}
.group--active {
  .group__background {
    fill: var(--color-grey-02);
  }
}
.circle__total {
  stroke: var(--color-violet);
  stroke-opacity: .25;
  fill: rgb(255, 0, 0); // TODO: change. red for layouting
  fill-opacity: .5;
}
</style>
