<template>
  <div
    v-show="tooltip.isActive"
    class="story-tooltip"
    :style="'top:' + (tooltip.content.y - 54) + 'px; left:' + (tooltip.content.x - 125) + 'px'"
  >
    <div class="story-tooltip__content">
      <span>{{ tooltip.content.text }}</span>
    </div>
    <div class="story-tooltip__arrow"></div>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  data: function () {
    return {}
  },
  computed: {
    tooltip: function () {
      return this.$store.state.selection.tooltip
    }
  }
}
</script>

<style lang="scss" scoped>
.story-tooltip {
  position: absolute;
  width: 25rem;
  height: 8rem;
  padding: calc(var(--grid-spacing) / 2);
  font-size: var(--font-size-small);
  color: white;
  background-color: black;
  box-shadow: 0 0 .5rem var(--color-grey-09);

  .story-tooltip__arrow {
    width: .8rem;
    height: .8rem;
    margin: 0 auto;
    background-color: black;
    transform: rotate(45deg) translateY(.8rem);
  }
}
</style>
