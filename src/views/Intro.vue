<template>
  <article class="chapter">
    <section class="chapter__story">
      <h1>Intro</h1>
      <p>Text explaining what this module is about. Text explaining what this module is about. Text explaining what this module is about. Text explaining what this module is about.</p>
      <button
        class="button__primary"
        @click="startWalkthrough()"
      ><span>Start the tour</span></button>
    </section>
    <section class="chapter__content"></section>
  </article>
</template>

<script>
export default {
  name: 'intro',
  components: {},
  data: function () {
    return {}
  },
  computed: {
    activeStep: function () {
      return this.$store.state.walkthrough.activeStep
    }
  },
  methods: {
    startWalkthrough() {
      this.$router.push({ name: 'walkthrough', params: { step: 0 } })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

