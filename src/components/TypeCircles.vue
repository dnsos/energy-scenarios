<template>
  <g
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    class="matrix__group"
    :class="{ 'group--active': isHovered}"
  >
    <rect class="group__background" :x="-(width / 2)" :y="-(height / 2)" :width="width" :height="height"></rect>
    <g>
      <!--<EnergyCircle :transform="'translate(' + (-maxRadius * 2) + ',0)'" :maxRadius="maxRadius * 2" :value="fossilData + nonfossilData" :maxValue="maxValue * 2" />-->
    </g>
    <g transform="rotate(180)">
      <EnergyCircle :maxRadius="maxRadius" :value="fossilData" :maxValue="maxValue" />
    </g>
    <g>
      <EnergyCircle :maxRadius="maxRadius" :value="nonfossilData" :maxValue="maxValue" />
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
    },
    isHovered: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: function() {
    return {}
  },
  computed: {
    maxRadius: function () {
      return this.width / 4
    }
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
</style>
