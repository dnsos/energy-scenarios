<template>
  <article class="chapter">
    <section class="title">
    </section>
    <section class="intro">
      <RadioSelect
        id="regions"
        :options="regions"
        :message="'Select a region'"
        :value="selectedRegion"
        :defaultSelection="selectedRegion.code"
        @input="selectedRegion = $event"
      />
      <RadioSelect
        id="societies"
        :options="societies"
        :message="'Select a future society'"
        :value="selectedSociety"
        :defaultSelection="selectedSociety.code"
        @input="selectedSociety = $event"
      />
    </section>
    <section class="testvalues">
        <ul>
          <li>Selected region: {{ selectedRegion.name }}</li>
          <li>Selected year: {{ displayedYear }}</li>
          <li>Fossil energy: {{ fossilAmount }} {{ unit }}</li>
          <li>Non-fossil energy: {{ nonfossilAmount }} {{ unit }}</li>
          <li>Total energy: {{ totalAmount }} {{ unit }}</li>
        </ul>
      </section>
    <figure class="testfigure">
      <TypeCircles
        :figureWidth="800"
        :figureHeight="400"
        :fossilData="fossilAmount"
        :nonfossilData="nonfossilAmount"
      />
    </figure>
  </article>
</template>

<script>
import RadioSelect from '@/components/RadioSelect.vue'
import TypeCircles from '@/components/TypeCircles.vue'
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'demand',
  components: {
    RadioSelect,
    TypeCircles
  },
  data: function () {
    return {}
  },
  computed: {
    ...mapState(['societies', 'regions']),
    ...mapGetters([
      'startyear',
      'yearinterval',
      'unit',
      'fossilData',
      'totalData'
    ]),
    displayedYear: function () {
      return this.startyear + (this.yearinterval * this.rangeValue)
    },
    fossilAmount: function () {
      let fossilAmount = this.fossilData.values[this.rangeValue]
      return fossilAmount
    },
    nonfossilAmount: function () {
      let nonfossilAmount = this.totalData.values[this.rangeValue] - this.fossilData.values[this.rangeValue]
      return nonfossilAmount
    },
    totalAmount: function () {
      let totalAmount = this.totalData.values[this.rangeValue]
      return totalAmount
    },
    selectedRegion: {
      get () {
        return this.$store.state.selection.region // get from store
      },
      set (value) {
        this.$store.commit('setRegion', value) // commit to store
      }
    },
    selectedSociety: {
      get () {
        return this.$store.state.selection.society // get from store
      },
      set (value) {
        this.$store.commit('setSociety', value) // commit to store
      }
    }
  },
  methods: {
  },
  mounted: function () {
  }
}
</script>

<style lang="scss" scoped>
.title {
  grid-column: 1 / 6;
}
.intro {
  grid-column: 1 / 3;
}
.testvalues {
  grid-column: 3 / 6;
}
.testfigure {
  grid-column: 6 / 13;
  margin: 0;
}

</style>
