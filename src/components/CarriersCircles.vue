<template>
  <figure>
    <svg :width="figureWidth" :height="figureHeight">
      <g>
        <g
          v-for="(carrier, index) in carriers"
          :key="carrier[0].name"
          class="carrier-circle"
          :transform="'translate(0' + (carrierMaxWidth * index) + ',' + figureHeight / 2 + ')'"
        >
          <EnergyCircle :maxRadius="carrierMaxRadius" :value="500" :maxValue="500" />
          <text>{{ carrier[0].name }}</text>
          <EnergyCircle :maxRadius="carrierMaxRadius" :value="400" :maxValue="500" />
        </g>
      </g>
    </svg>
  </figure>
</template>

<script>
import EnergyCircle from '@/components/EnergyCircle.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'CarriersCircles',
  components: {
    EnergyCircle
  },
  props: [],
  data: function() {
    return {
      figureWidth: 1095,
      figureHeight: 300
    }
  },
  computed: {
    ...mapGetters({
      carriers: 'carriersData'
    }),
    carrierMaxWidth: function () {
      return this.figureWidth / this.carriers.length
    },
    carrierMaxRadius: function () {
      return this.carrierMaxWidth / 2
    }
  },
  mounted: function () {
    // log stuff here
    console.log(this.carriers)
  }
}
</script>

<style scoped lang="scss">
figure {
  width: 100%;
}

svg {
  /* TODO: Remove. Only for layouting purposes */
  border: 1px dashed black;
  overflow: visible;
}

.carrier-circle {
  transform: rotate(90);
}
</style>
