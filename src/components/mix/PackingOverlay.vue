<template>
  <g
    v-show="isWalkthroughMode() && atWalkthroughStep([6])"
    class="packing" :transform="'translate(' + xPosition + ',' + yPosition + ')'"
  >
    <g class="packing__fossil">
      <g class="packing__baseline">
        <circle :r="diameters.fossil.baseline/2" :cx="diameters.fossil.baseline/2" />
        <circle
          v-for="(carrier, index) in packData.fossil.baseline.children"
          :key="index"
          :cx="carrier.x"
          :cy="carrier.y"
          :r="carrier.r"
          :transform="'translate(0,-' + diameters.fossil.baseline/2 + ')'"
        />
      </g>
      <g class="packing__target">
        <circle :r="diameters.fossil.target/2" :cx="diameters.fossil.target/2" />
        <circle
          v-for="(carrier, index) in packData.fossil.target.children"
          :key="index"
          :cx="carrier.x"
          :cy="carrier.y"
          :r="carrier.r"
          :transform="'translate(0,-' + diameters.fossil.target/2 + ')'"
        />
      </g>
    </g>
    <g class="packing__nonfossil">
      <g class="packing__target">
        <circle :r="diameters.nonfossil.target/2" :cx="diameters.nonfossil.target/2" />
        <circle
          v-for="(carrier, index) in packData.nonfossil.target.children"
          :key="index"
          :cx="carrier.x"
          :cy="carrier.y"
          :r="carrier.r"
          :transform="'translate(0,-' + diameters.nonfossil.target/2 + ')'"
        />
      </g>
      <g class="packing__baseline">
        <circle :r="diameters.nonfossil.baseline/2" :cx="diameters.nonfossil.baseline/2" />
        <circle
          v-for="(carrier, index) in packData.nonfossil.baseline.children"
          :key="index"
          :cx="carrier.x"
          :cy="carrier.y"
          :r="carrier.r"
          :transform="'translate(0,-' + diameters.nonfossil.baseline/2 + ')'"
        />
      </g>
    </g>
  </g>
</template>

<script>
import { createPackData, getDiameters } from '../../utils/utils'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'PackingOverlay',
  components: {},
  props: {
    xPosition: {
      type: Number,
      required: true
    },
    yPosition: {
      type: Number,
      required: true
    }
  },
  data: function() {
    return {
      diameters: getDiameters()
    }
  },
  computed: {
    ...mapState(['mode', 'walkthrough']),
    ...mapGetters(['rangeValue']),
    SSP2Data: function () {
      return this.$store.getters.carriersData.find(society => society.code === 'SSP2')
    },
    packData: function () {
      const diameters = getDiameters()

      const fossil = this.SSP2Data.carriers.filter(carrier => {
        return this.isFossil(carrier.name)
      })

      const nonfossil = this.SSP2Data.carriers.filter(carrier => {
        return !this.isFossil(carrier.name)
      })

      const fossilBaseline = {
        name: 'fossilBaseline',
        children: fossil.map(carrier => {
          return {
            name: carrier.name,
            value: carrier.baseline.values[this.rangeValue]
          }
        })
      }

      const fossilTarget = {
        name: 'fossilTarget',
        children: fossil.map(carrier => {
          return {
            name: carrier.name,
            value: carrier['target26'].values[this.rangeValue]
          }
        })
      }

      const nonfossilBaseline = {
        name: 'nonfossilBaseline',
        children: nonfossil.map(carrier => {
          return {
            name: carrier.name,
            value: carrier.baseline.values[this.rangeValue]
          }
        }) 
      }

      const nonfossilTarget = {
        name: 'nonfossilTarget',
        children: nonfossil.map(carrier => {
          return {
            name: carrier.name,
            value: carrier['target26'].values[this.rangeValue]
          }
        })
      }

      const packData = {
        fossil: {
          baseline: createPackData(diameters.fossil.baseline, fossilBaseline),
          target: createPackData(diameters.fossil.target, fossilTarget)
        },
        nonfossil: {
          baseline: createPackData(diameters.nonfossil.baseline, nonfossilBaseline),
          target: createPackData(diameters.nonfossil.target, nonfossilTarget)
        }
      }
      return packData
    }
  },
  methods: {
    isFossil: function (carrier) {
      return ['Coal', 'Gas', 'Oil'].includes(carrier) ? true : false
    }
  },
  watch: {},
  created: function () {},
  mounted: function () {}
}
</script>

<style scoped lang="scss">
.packing {
  stroke-width: 1.5;

  .packing__fossil {
    transform: rotate(180deg);
  }
  .packing__nonfossil {
    transform: rotate(0);
  }

  .packing__baseline {
    stroke: var(--color-violet);
    fill: var(--color-violet-light);
  }
  .packing__target {
    stroke: var(--color-yellow);
    fill: var(--color-yellow-light);
  }
}
</style>
