<template>
  <g>
    <g>
      <!--<EnergyCircle :transform="'translate(' + (-maxRadius * 2) + ',0)'" :maxRadius="maxRadius * 2" :value="fossilData + nonfossilData" :maxValue="maxValue * 2" />-->
    </g>
    <g transform="rotate(180)">
      <EnergyCircle :maxRadius="maxRadius" :value="fossilData" :maxValue="maxValue" />
    </g>
    <g>
      <EnergyCircle :maxRadius="maxRadius" :value="nonfossilData" :maxValue="maxValue" />
    </g>
  </g>
</template>

<script>
import EnergyCircle from '@/components/EnergyCircle.vue'

export default {
  name: 'TypeCircles',
  components: {
    EnergyCircle
  },
  props: [ "width", "height", "fossilData", "nonfossilData" ],
  data: function() {
    return {}
  },
  computed: {
    maxRadius: function () {
      return this.width / 4
    },
    maxValue: function () {
      return 1004.921 // TODO: automate this value
    }
  }
}
</script>

<style scoped lang="scss">
</style>
