<template>
  <div class="header__wrapper">
    <div class="title__wrapper">
      <img class="title__logo" src="../../assets/img/senses_logo.svg" />
      <h1 class="title__text">SENSES Toolkit</h1>
    </div>
    <hgroup class="senses__nav">
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
  height: 100%;
  align-self: center;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: calc(var(--grid-spacing) / 2) var(--grid-spacing);
  color: white;
  background-color: var(--color-primary-neutral);

  .title__wrapper {
    align-self: center;
    .title__logo {
      display: inline-block;
      width: 2rem;
      height: auto;
    }
    .title__text {
      display: inline-block;
      font-family: var(--font-family);
      font-size: var(--font-size);
      font-weight: 400;
      padding-left: calc(var(--grid-spacing) / 4);
      margin-bottom: 0;
      color: white;
    }
  }

  .senses__nav {
    align-self: center;
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
