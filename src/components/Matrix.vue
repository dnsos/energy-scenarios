<template>
  <g class="matrix__wrapper">
    <g class="matrix__circles">
      <TypeCircles
        v-if="walkthrough.activeStep >= 3"
        :width="group.width"
        :height="group.height"
        :society="matrixData[4].society"
        :sspData="matrixData[4]"
        :maxValue="matrixMaxValue"
        :transform="'translate(' + translateValues(1,1) + ')'"
      />
      <TypeCircles
        v-if="walkthrough.activeStep >= 3"
        :width="group.width"
        :height="group.height"
        :society="matrixData[0].society"
        :sspData="matrixData[0]"
        :maxValue="matrixMaxValue"
        :transform="'translate(' + translateValues(1,5) + ')'"
      />
      <TypeCircles
        v-if="walkthrough.activeStep >= 3"
        :width="group.width"
        :height="group.height"
        :society="matrixData[2].society"
        :sspData="matrixData[2]"
        :maxValue="matrixMaxValue"
        :transform="'translate(' + translateValues(5,1) + ')'"
      />
      <TypeCircles
        v-if="walkthrough.activeStep >= 3"
        :width="group.width"
        :height="group.height"
        :society="matrixData[3].society"
        :sspData="matrixData[3]"
        :maxValue="matrixMaxValue"
        :transform="'translate(' + translateValues(5,5) + ')'"
      />
      <TypeCircles
        v-if="walkthrough.activeStep <= 5"
        :width="group.width"
        :height="group.height"
        :society="matrixData[1].society"
        :sspData="matrixData[1]"
        :maxValue="matrixMaxValue"
        :transform="'translate(' + translateValues(3,3) + ')'"
      />
    </g>
    <!--<g class="matrix__axes">
      <g class="axis__y" transform="rotate(-90)">
        <text x="0" y="0">Highly fossil-fueled</text>
        <text x="0" y="0">Not fossil-fueled</text>
      </g>
      <g class="axis__x"></g>
    </g>-->
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
    ...mapState(['selection', 'walkthrough']),
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
  watch: {},
  methods: {
    translateValues: function (columnIndex, rowIndex) {
      const x = (this.group.width / 2) * columnIndex
      const y = (this.group.height / 2) * rowIndex
      return x + ',' + y
    }
  },
  mounted: function () {
  }
}
</script>

<style scoped lang="scss">
</style>
