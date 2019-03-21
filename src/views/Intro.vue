<template>
  <div class="intro">
    <ModuleIntroduction />
  </div>
</template>

<script>
import ModuleIntroduction from '@/components/ModuleIntroduction.vue'

export default {
  name: 'intro',
  components: {
    ModuleIntroduction
  }
}
</script>

<style lang="scss" scoped>
  .intro {
    grid-area: s;
  }
</style>

