<template>
  <g class="matrix__group">
    <g>
      <!--<EnergyCircle :transform="'translate(' + (-maxRadius * 2) + ',0)'" :maxRadius="maxRadius * 2" :value="fossilData + nonfossilData" :maxValue="maxValue * 2" />-->
    </g>
    <g transform="rotate(180)">
      <EnergyCircle :maxRadius="maxRadius" :value="fossilData" :maxValue="maxValue" />
    </g>
    <g>
      <EnergyCircle :maxRadius="maxRadius" :value="nonfossilData" :maxValue="maxValue" />
    </g>
    <text class="matrix__society" :transform="'translate(0,' + height * 0.5 + ')'">{{ society }}</text>
  </g>
</template>

<script>
import EnergyCircle from '@/components/EnergyCircle.vue'

export default {
  name: 'TypeCircles',
  components: {
    EnergyCircle
  },
  props: [ "width", "height", "society", "fossilData", "nonfossilData", "maxValue" ],
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
</style>
