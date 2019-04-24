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
    <g>
      <circle
        class="circle__total"
        :r="radiusTotal"
        cx="0"
        cy="0"
        transform="translate(-30,0)"
      ></circle>
    </g>
    <g transform="rotate(180)">
      <EnergyCircle
        class="circle__fossil"
        :maxRadius="maxRadius"
        :value="fossilData"
        :maxValue="maxValue"
      />
    </g>
    <g>
      <EnergyCircle
        class="circle__nonfossil"
        :maxRadius="maxRadius"
        :value="nonfossilData"
        :maxValue="maxValue"
      />
    </g>
    <text class="matrix__society" :transform="'translate(0,' + height * 0.4 + ')'">{{ society }}</text>
  </g>
</template>

<script>
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
    fossilData: {
      type: Number,
      required: true
    },
    nonfossilData: {
      type: Number,
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
    maxRadius: function () {
      return this.width / 4
    }
  },
  methods: {
    toggleHovered: function () {
      this.isHovered = !this.isHovered
    }
  },
  mounted: function () {}
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
.circle__total {
  stroke-width: 1.5;
  stroke: var(--color-violet);
  stroke-opacity: .25;
  fill: var(--color-violet);
  fill-opacity: .1;
}
</style>
