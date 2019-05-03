<template>
  <article class="chapter grid-12-columns">
    <section class="chapter__story grid-sidebar">
      <StoryBox />
    </section>
    <section class="chapter__content grid-main">
      <Viz />
    </section>
  </article>
</template>

<script>
import StoryBox from '@/components/StoryBox.vue'
import Viz from '@/components/Viz.vue'

export default {
  name: 'walkthrough',
  components: {
    StoryBox,
    Viz
  },
  data: function () {
    return {}
  },
  computed: {},
  watch: { },
  mounted: function () {}
}
</script>

<style lang="scss" scoped>
</style>

