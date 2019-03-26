<template>
  <div class="demand">
    <h1>Energy Demand/Consumption</h1>
    <DropDownSelect id="regions" :options="regionsList" :message="'Select a region'" />
    <RadioSelect id="regions" :options="regionsList" :message="'Select a region'" />
    <DatalistSelect id="regions" :options="regionsList" :message="'Select a region'" />
  </div>
</template>

<script>
import DropDownSelect from '@/components/DropDownSelect.vue'
import RadioSelect from '@/components/RadioSelect.vue'
import DatalistSelect from '@/components/DatalistSelect.vue'

export default {
  name: 'demand',
  components: {
    DropDownSelect,
    RadioSelect,
    DatalistSelect
  },
  computed: {
    regionsList: function () {
      return this.$store.getters.regions
    }
  },
  mounted: function () {
    // console.log(this.regionsList)
  }
}
</script>

<style lang="scss" scoped>
.demand {
    grid-area: s;
  }
</style>
