<template>
  <g class="matrix__wrapper">
    <TypeCircles
      :width="group.width"
      :height="group.height"
      :fossilData="matrixData[4].baseline.fossil.values[rangeValue]"
      :nonfossilData="matrixData[4].baseline.nonfossil.values[rangeValue]"
      :maxValueTest="matrixMaxValue"
      :class="matrixData[4].ssp"
      :transform="'translate(' + translateValues(1,1) + ')'"
    />
    <TypeCircles
      :width="group.width"
      :height="group.height"
      :fossilData="matrixData[0].baseline.fossil.values[rangeValue]"
      :nonfossilData="matrixData[0].baseline.nonfossil.values[rangeValue]"
      :maxValueTest="matrixMaxValue"
      :class="matrixData[0].ssp"
      :transform="'translate(' + translateValues(1,5) + ')'"
    />
    <TypeCircles
      :width="group.width"
      :height="group.height"
      :fossilData="matrixData[2].baseline.fossil.values[rangeValue]"
      :nonfossilData="matrixData[2].baseline.nonfossil.values[rangeValue]"
      :maxValueTest="matrixMaxValue"
      :class="matrixData[2].ssp"
      :transform="'translate(' + translateValues(5,1) + ')'"
    />
    <TypeCircles
      :width="group.width"
      :height="group.height"
      :fossilData="matrixData[3].baseline.fossil.values[rangeValue]"
      :nonfossilData="matrixData[3].baseline.nonfossil.values[rangeValue]"
      :maxValueTest="matrixMaxValue"
      :class="matrixData[3].ssp"
      :transform="'translate(' + translateValues(5,5) + ')'"
    />
    <TypeCircles
      :width="group.width"
      :height="group.height"
      :fossilData="matrixData[1].baseline.fossil.values[rangeValue]"
      :nonfossilData="matrixData[1].baseline.nonfossil.values[rangeValue]"
      :maxValueTest="matrixMaxValue"
      :class="matrixData[1].ssp"
      :transform="'translate(' + translateValues(3,3) + ')'"
    />
  </g>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import TypeCircles from '@/components/TypeCircles.vue'

export default {
  name: 'Matrix',
  components: {
    TypeCircles
  },
  props: ['width', 'height'],
  data: function() {
    return {}
  },
  computed: {
    ...mapState(['selection']),
    ...mapGetters([
      'fossilData',
      'totalData',
      'matrixData', // TODO: create computed properties to tidy up data in template
      'matrixMaxValue',
      'rangeValue'
    ]),
    group: function () {
      return {
        width: this.width / 3,
        height: this.height / 3
      }
    }
  },
  methods: {
    translateValues: function (columnIndex, rowIndex) {
      const x = (this.group.width / 2) * columnIndex
      const y = (this.group.height / 2) * rowIndex
      return x + ',' + y
    }
  },
  mounted: function () {
    console.log('Max Matrix value:', this.maxMatrixValue)
  }
}
</script>

<style scoped lang="scss">
.matrix__wrapper {
  
}
</style>
