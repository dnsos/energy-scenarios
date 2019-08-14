<template>
  <g class="matrix__wrapper">
    <g class="matrix__circles">
      <TypeCircles
        v-if="isExplorer || isWalkthroughMode() && atWalkthroughStep([3,4,5,6,7,8,9])"
        :class="{ 'group--inactive': atWalkthroughStep([5,6]) && matrixData[4].society.code != selection.society.code }"
        :id="'matrix__group-' + matrixData[4].society.code.toLowerCase()"
        :width="group.width"
        :height="group.height"
        :society="matrixData[4].society"
        :sspData="matrixData[4]"
        :maxValue="matrixMaxValue"
        :coordinates="translateValues(1,1)"
      />
      <TypeCircles
        v-if="isExplorer || isWalkthroughMode() && atWalkthroughStep([3,4,5,6,7,8,9])"
        :class="{ 'group--inactive': atWalkthroughStep([5,6]) && matrixData[0].society.code != selection.society.code }"
        :id="'matrix__group-' + matrixData[0].society.code.toLowerCase()"
        :width="group.width"
        :height="group.height"
        :society="matrixData[0].society"
        :sspData="matrixData[0]"
        :maxValue="matrixMaxValue"
        :coordinates="translateValues(1,5)"
      />
      <TypeCircles
        v-if="isExplorer || isWalkthroughMode() && atWalkthroughStep([3,4,5,6,7,8,9])"
        :class="{ 'group--inactive': atWalkthroughStep([5,6]) && matrixData[2].society.code != selection.society.code }"
        :id="'matrix__group-' + matrixData[2].society.code.toLowerCase()"
        :width="group.width"
        :height="group.height"
        :society="matrixData[2].society"
        :sspData="matrixData[2]"
        :maxValue="matrixMaxValue"
        :coordinates="translateValues(5,1)"
      />
      <TypeCircles
        v-if="isExplorer || isWalkthroughMode() && atWalkthroughStep([3,4,5,6,7,8,9])"
        :class="{ 'group--inactive': atWalkthroughStep([5,6]) && matrixData[3].society.code != selection.society.code }"
        :id="'matrix__group-' + matrixData[3].society.code.toLowerCase()"
        :width="group.width"
        :height="group.height"
        :society="matrixData[3].society"
        :sspData="matrixData[3]"
        :maxValue="matrixMaxValue"
        :coordinates="translateValues(5,5)"
      />
      <TypeCircles
        v-if="isExplorer || isWalkthroughMode() && atWalkthroughStep([0,1,2,3,4,5,6])"
        :class="{ 'group--inactive': atWalkthroughStep([5,6]) && matrixData[1].society.code != selection.society.code }"
        :id="'matrix__group-' + matrixData[1].society.code.toLowerCase()"
        :width="group.width"
        :height="group.height"
        :society="matrixData[1].society"
        :sspData="matrixData[1]"
        :maxValue="matrixMaxValue"
        :coordinates="translateValues(3,3)"
      />
    </g>
  </g>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import TypeCircles from '@/components/visuals/TypeCircles.vue'

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
    ...mapState(['selection', 'walkthrough', 'mode']),
    ...mapGetters([
      'matrixData', // TODO: replace with new matrix data architecture
      'matrixMaxValue',
      'rangeValue'
    ]),
    isExplorer: function () {
      return !this.mode.isWalkthrough
    },
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
      return {
        x: x,
        y: y
      }
    }
  },
  mounted: function () { }
}
</script>

<style scoped lang="scss">
.group--inactive {
  opacity: .2;
}
</style>
