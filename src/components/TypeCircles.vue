<template>
  <svg :width="figureWidth" :height="figureHeight">
    <g>
      <g transform="translate(400,200) rotate(180)">
        <EnergyCircle :maxRadius="maxRadius" :value="fossilData" :maxValue="maxValue" />
      </g>
      <g transform="translate(400,200)">
        <EnergyCircle :maxRadius="maxRadius" :value="nonfossilData" :maxValue="maxValue" />
      </g>
    </g>
  </svg>
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
svg {
  border: 1px dashed black; /* TODO: Remove. Only for layouting purposes */
}
</style>
