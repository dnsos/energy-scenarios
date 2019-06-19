<template>
  <div class="viz__wrapper">
    <Viz />
  </div>
</template>

<script>
import Viz from '@/components/Viz.vue'

export default {
  name: 'explorer',
  components: {
    Viz
  },
  data: function () {
    return {}
  },
  computed: {},
  watch: {},
  mounted: function () {
    this.$store.commit('toggleMode')
    this.$store.commit('setYearFromExplorer', 2050)
  }
}
</script>

<style lang="scss" scoped>
</style>

