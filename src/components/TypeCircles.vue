<template>
  <g>
    <g transform="translate(400,200) rotate(180)">
      <EnergyCircle :maxRadius="maxRadius" :value="fossilData" :maxValue="maxValue" />
    </g>
    <g transform="translate(400,200)">
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
  props: [ "figureWidth", "figureHeight", "fossilData", "nonfossilData" ],
  data: function() {
    return {}
  },
  computed: {
    maxRadius: function () {
      return this.figureWidth / 4
    },
    maxValue: function () {
      return 1004.921 // TODO: automate this value
    }
  }
}
</script>

<style scoped lang="scss">
</style>
