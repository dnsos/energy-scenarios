<template>
  <div class="header__wrapper">
    <h1 class="heading__senses">SENSES Toolkit</h1>
    <hgroup>
      <h6 class="active">Learn</h6>
      <h6>Explore</h6>
      <h6>Share</h6>
    </hgroup>
  </div>
</template>

<script>
export default {
  name: 'main-header',
  data: function () {
    return {}
  }
}
</script>


<style lang="scss">
.header__wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: calc(var(--grid-spacing) / 2) var(--grid-spacing);
  color: white;
  background-color: var(--color-primary-neutral);

  >* {
    display: inline-block;
  }

  .heading__senses {
    font-size: var(--font-size);
    font-weight: 400;
    margin-bottom: 0;
  }

  hgroup {
    text-align: right;
    h6 {
      display: inline;
    }
    h6:not(:last-of-type) {
      margin-right: .6rem;
    }
    .active {
      color: white;
    }
  }
}
</style>
