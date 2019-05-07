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
    <circle
      class="circle circle__total"
      :class="{ 'circle__total--focus': walkthrough.activeStep === 0 }"
      v-show="walkthrough.activeStep <= 2"
      :r="totalRadius"
      :cx="-(totalRadius - (totalCircle.radii.nonfossil * 2))"
    ></circle>
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
        class="circle circle__fossil circle--baseline"
        v-show="walkthrough.activeStep >= 1"
        @update-radius="saveFossilRadius"
        :maxRadius="maxRadius * currentScale"
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
        v-show="walkthrough.activeStep >= 1"
        @update-radius="saveNonfossilRadius"
        :maxRadius="maxRadius * currentScale"
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
      totalCircle: {
        radii: {
          fossil: null,
          nonfossil: null
        }
      }
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
      return this.walkthrough.activeStep
    },
    currentScale: function () {
      return this.walkthrough.steps[this.walkthrough.activeStep].scale // TODO: get this from mapState
    },
    totalRadius: function () {
      return this.totalCircle.radii.fossil + this.totalCircle.radii.nonfossil
    }
  },
  methods: {
    toggleHovered: function () {
      this.isHovered = !this.isHovered
    },
    saveFossilRadius: function (value) {
      this.totalCircle.radii.fossil = value 
    },
    saveNonfossilRadius: function (value) {
      this.totalCircle.radii.nonfossil = value 
    }
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
  stroke-width: 1.5;
  stroke: var(--color-violet);
  fill: #edecf7;
  fill-opacity: 0.25;
  stroke-opacity: 0.25;
}
.circle__total--focus {
  fill-opacity: 1;
  stroke-opacity: 1;
}
</style>
