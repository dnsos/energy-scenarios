<template>
  <article class="chapter">
    <section class="title">
      <h1>This is the energy demand of our world in 2020.</h1>
      <p>(SSP2-Baseline)</p>
    </section>
    <section class="intro">
      <RadioSelect
        id="regions"
        :options="regions"
        :message="'Select a region'"
        :value="selectedRegion"
        @input="selectedRegion = $event"
      />
    </section>
    <section class="content">
      <p>Selected region: {{ selectedRegion }}</p>
    </section>
  </article>
</template>

<script>
import RadioSelect from '@/components/RadioSelect.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'demand',
  components: {
    RadioSelect
  },
  data: function () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'regions',
      'selectedData'
    ]),
    selectedRegion: {
      get () {
        return this.$store.state.aggregated.selected.region // gets active region from store
      },
      set (value) {
        this.$store.commit('setRegion', value) // commits active region to store from :value
      }
    }
  },
  methods: {
  },
  mounted: function () {
    // console.log(this.aggregatedByRegion("World"))
    // this.selected = this.aggregatedByRegion("World")
  }
}
</script>

<style lang="scss" scoped>
.title {
  grid-column: 1 / 4;
}
.intro {
  grid-column: 1 / 4;
}
.content {
  grid-column: 4 / 13;
}

</style>
