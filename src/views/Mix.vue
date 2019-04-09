<template>
  <article class="chapter">
    <section class="chapter__content">
      <CarriersCircles />
    </section>
    <section class="chapter__story">
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae tempora nisi sed, quos hic quam culpa corrupti veritatis iste incidunt obcaecati ad asperiores dolor minima, ratione et saepe est quisquam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero eaque voluptatum dignissimos aliquam sit. Magnam minus odio cumque harum corporis illo et error debitis minima, architecto omnis obcaecati, dolorum nam!</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, et id provident est laudantium quaerat voluptatum pariatur, corporis iure earum modi nulla labore magnam iste illo, laborum maiores ad ab?</p>
    </section>
  </article>
</template>

<script>
import CarriersCircles from '@/components/CarriersCircles.vue'

export default {
  name: 'mix',
  components: {
    CarriersCircles
  }
}
</script>

<style lang="scss" scoped>
.chapter__content {
  grid-column: span 9;
}

.chapter__story {
  grid-column: span 3;
}
</style>
