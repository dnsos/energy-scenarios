<template>
  <article class="chapter grid-12-columns">
    <section class="chapter__story grid-sidebar">
      <StoryBox />
      <ProgressBar />
    </section>
    <section class="chapter__content grid-main">
      <Viz />
    </section>
  </article>
</template>

<script>
import StoryBox from '@/components/StoryBox.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import Viz from '@/components/Viz.vue'

export default {
  name: 'walkthrough',
  components: {
    StoryBox,
    ProgressBar,
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

