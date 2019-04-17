<template>
  <section class="controls">
    <RadioSelect
      id="targets"
      class="control__target"
      :options="targets"
      :value="selectedTarget"
      :defaultSelection="selectedTarget.code"
      @input="selectedTarget = $event"
    />
    <span>{{ selection.year }}</span>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import RadioSelect from '@/components/RadioSelect.vue'

export default {
  name: 'controls',
  components: {
    RadioSelect
  },
  computed: {
    ...mapState(['selection', 'targets']),
    selectedTarget: {
      get () {
        return this.$store.state.selection.target
      },
      set (value) {
        this.$store.dispatch('changeTarget', value)
      }
    }
  },
  mounted: function () {
  }
}
</script>


<style lang="scss">
.controls {
  grid-area: h;
  text-align: right;

  > * {
    display: inline-block;

    &:not(:last-child) {
      margin-right: var(--grid-spacing);
    }
  }
}
</style>
