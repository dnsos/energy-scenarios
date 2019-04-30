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
    <!--<g>
      <circle
        class="circle circle__total"
        :r="radiusTotal"
        cx="0"
        cy="0"
        transform="translate(-30,0)"
      ></circle>
    </g>-->
    <g transform="rotate(180)">
      <EnergyCircle
        class="circle circle__fossil circle--target"
        :maxRadius="maxRadius"
        :value="values.fossil.target"
        :maxValue="maxValue"
      />
    </g>
    <g transform="rotate(180)">
      <EnergyCircle
        class="circle circle__fossil"
        :maxRadius="maxRadius"
        :value="values.fossil.baseline"
        :maxValue="maxValue"
      />
    </g>
    <g>
      <EnergyCircle
        class="circle circle__nonfossil circle--target"
        :maxRadius="maxRadius"
        :value="values.nonfossil.target"
        :maxValue="maxValue"
      />
    </g>
    <g>
      <EnergyCircle
        class="circle circle__nonfossil"
        :maxRadius="maxRadius"
        :value="values.nonfossil.baseline"
        :maxValue="maxValue"
      />
    </g>
    <transition name="fade">
      <text v-if="walkthrough.activeStep === 3" class="matrix__society" :transform="'translate(0,' + height * 0.4 + ')'">{{ society.name }}</text>
    </transition>
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
      type: String,
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
      radiusTotal: null
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
    }
  },
  methods: {
    toggleHovered: function () {
      this.isHovered = !this.isHovered
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped lang="scss">
.matrix__society {
  font-size: var(--font-size-small);
  text-anchor: middle;
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
.circle {
  stroke-width: 1.5;
  fill-opacity: .1;
}
.circle__total {
  stroke: var(--color-violet);
  stroke-opacity: .25;
  fill: var(--color-violet);
}
.circle--target {
  fill: var(--color-yellow);
}
</style>
