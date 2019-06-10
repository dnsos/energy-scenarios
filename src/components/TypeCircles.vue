<template>
  <g
    @mouseenter="toggleHovered()"
    @mouseleave="toggleHovered()"
    class="matrix__group"
    :class="{ 'group--active': isHovered}"
  >
    <GeneralCircles
      :radiusTotal="totalRadius"
      :xOffset="-(totalRadius - (radii.nonfossil * 2))"
      :value="values.fossil.baseline + values.nonfossil.baseline"
    />
    <g class="group__fossil" transform="rotate(180)">
      <EnergyCircle
        class="circle circle__fossil circle--target"
        v-if="walkthrough.activeStep >= 4 && comparisons.fossil.targetIsHigher"
        :maxRadius="maxRadius"
        :value="values.fossil.target"
        :maxValue="maxValue"
        :tweeningDuration="tweeningDuration"
      />
      <transition name="fade-slowly">
        <EnergyCircle
          class="circle circle__fossil circle--baseline"
          v-show="walkthrough.activeStep >= 1"
          @update-radius="saveFossilRadius"
          :maxRadius="maxRadius * currentScale"
          :value="values.fossil.baseline"
          :maxValue="maxValue"
          :tweeningDuration="tweeningDuration"
        />
      </transition>
      <EnergyCircle
        class="circle circle__fossil circle--target"
        v-if="walkthrough.activeStep >= 4 && !comparisons.fossil.targetIsHigher"
        :maxRadius="maxRadius"
        :value="values.fossil.target"
        :maxValue="maxValue"
        :tweeningDuration="tweeningDuration"
      />
    </g>
    <g class="group__nonfossil">
      <EnergyCircle
        class="circle circle__nonfossil circle--target"
        v-if="walkthrough.activeStep >= 4 && comparisons.nonfossil.targetIsHigher"
        :maxRadius="maxRadius"
        :value="values.nonfossil.target"
        :maxValue="maxValue"
        :tweeningDuration="tweeningDuration"
      />
      <transition name="fade-slowly">
        <EnergyCircle
          class="circle circle__nonfossil circle--baseline"
          v-show="walkthrough.activeStep >= 1"
          @update-radius="saveNonfossilRadius"
          :maxRadius="maxRadius * currentScale"
          :value="values.nonfossil.baseline"
          :maxValue="maxValue"
          :tweeningDuration="tweeningDuration"
        />
      </transition>
      <EnergyCircle
        class="circle circle__nonfossil circle--target"
        v-if="walkthrough.activeStep >= 4 && !comparisons.nonfossil.targetIsHigher"
        :maxRadius="maxRadius"
        :value="values.nonfossil.target"
        :maxValue="maxValue"
        :tweeningDuration="tweeningDuration"
      />
    </g>
    <transition name="fade-slowly">
      <g v-if="walkthrough.activeStep >= 1" class="type-indicators">
        <text class="type-indicator" :x="-radii.fossil">f</text>
        <text class="type-indicator" :x="radii.nonfossil">nf</text>
      </g>
    </transition>
    <transition name="fade">
      <MatrixTooltip
        v-if="isHovered && walkthrough.activeStep >= 3"
        :sspData="sspData"
      />
    </transition>
    <g class="group__labels" v-if="walkthrough.activeStep >= 3">
      <transition name="fade">
        <text
          class="matrix__society"
          :transform="'translate(0,' + height * 0.5 + ')'">
          <tspan x="0" y="0" class="bgtest">{{ society.name }}</tspan>
          <tspan x="0" y="0">{{ society.name }}</tspan>
          <tspan
            class="matrix__society--infeasible"
            v-if="walkthrough.activeStep >= 4 && values.fossil.target === 0"
            x="0"
            y="0"
            dy="12"
          >(Target infeasible)</tspan>
          </text>
      </transition>
    </g>
  </g>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import EnergyCircle from '@/components/EnergyCircle.vue'
import GeneralCircles from '@/components/GeneralCircles.vue'
import MatrixTooltip from '@/components/MatrixTooltip.vue'

export default {
  name: 'TypeCircles',
  components: {
    EnergyCircle,
    GeneralCircles,
    MatrixTooltip
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
    sspData: {
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
      radii: {
        fossil: null,
        nonfossil: null
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
          baseline: this.sspData.baseline.fossil.values[this.rangeValue],
          target: this.sspData.target.fossil.values[this.rangeValue]
        },
        nonfossil: {
          baseline: this.sspData.baseline.nonfossil.values[this.rangeValue],
          target: this.sspData.target.nonfossil.values[this.rangeValue]
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
      return this.radii.fossil + this.radii.nonfossil
    }
  },
  methods: {
    toggleHovered: function () {
      this.isHovered = !this.isHovered
    },
    saveFossilRadius: function (value) {
      this.radii.fossil = value 
    },
    saveNonfossilRadius: function (value) {
      this.radii.nonfossil = value 
    }
  }
}
</script>

<style scoped lang="scss">
.matrix__society {
  font-size: var(--font-size-small);
  font-weight: 500;
  text-anchor: middle;
  .matrix__society--infeasible {
    fill: var(--color-yellow);
  }
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
.type-indicators {
  dominant-baseline: middle;
  .type-indicator {
    font-size: var(--font-size-small);
    text-anchor: middle;
  }
}
</style>
