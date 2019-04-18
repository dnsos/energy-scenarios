<template>
  <g class="matrix__wrapper">
    <TypeCircles
      :width="group.width"
      :height="group.height"
      :fossilData="1004.921"
      :nonfossilData="600"
      :transform="'translate(' + translateValues(1,1) + ')'"
    />
    <TypeCircles
      :width="group.width"
      :height="group.height"
      :fossilData="400"
      :nonfossilData="900"
      :transform="'translate(' + translateValues(1,5) + ')'"
    />
    <TypeCircles
      :width="group.width"
      :height="group.height"
      :fossilData="800"
      :nonfossilData="900"
      :transform="'translate(' + translateValues(5,1) + ')'"
    />
    <TypeCircles
      :width="group.width"
      :height="group.height"
      :fossilData="450"
      :nonfossilData="200"
      :transform="'translate(' + translateValues(5,5) + ')'"
    />
    <TypeCircles
      :width="group.width"
      :height="group.height"
      :fossilData="150"
      :nonfossilData="600"
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
    return {
      arrSSP: ['SSP1', 'SSP2', 'SSP3', 'SSP4', 'SSP5'] // only for testing purposes
    }
  },
  computed: {
    ...mapState(['selection']),
    ...mapGetters([
      'fossilData',
      'totalData',
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
  }
}
</script>

<style scoped lang="scss">
.matrix__wrapper {
  fill: turquoise;
}
</style>
