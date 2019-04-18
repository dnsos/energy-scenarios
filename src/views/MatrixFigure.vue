<template>
  <article class="chapter">
    <section class="chapter__story">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, et id provident est laudantium quaerat voluptatum pariatur, corporis iure earum modi nulla labore magnam iste illo, laborum maiores ad ab?</p>
    </section>
    <section class="chapter__content">
      <svg :width="figureWidth" :height="figureHeight" class="matrix">
        <Matrix :width="figureWidth" :height="figureHeight" />
      </svg>
    </section>
  </article>
</template>

<script>
import Matrix from '@/components/Matrix.vue'

export default {
  name: 'matrix-figure',
  components: {
    Matrix
  },
  data: function () {
    return {
      figureWidth: 1095,
      figureHeight: 600
    }
  },
  computed: {},
  mounted: function () {}
}
</script>

<style lang="scss" scoped>
svg {
  overflow: visible;
  border: .1rem dashed var(--color-grey-20);
}
</style>
