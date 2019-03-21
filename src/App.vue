<template>
  <main id="app">
    <div id="nav">
      <router-link to="/">Intro</router-link> |
      <router-link to="/demand">Demand</router-link> |
      <router-link to="/composition">Composition</router-link> |
      <router-link to="/tracks">Tracks</router-link> |
      <router-link to="/carbon-price">Integration of a Carbon Price</router-link>
    </div>
    <router-view/>
  </main>
</template>

<style lang="scss">
:root {
  --color-primary: #4e40b2;
  --color-grey-76: #3e3e3e;
  --color-grey-20: #cccccc;
  --color-grey-09: #e7e7e7;
  --color-grey-02: #f9f9f9;
  --font-size: 16px;
  --font-family: "IBM Plex Sans", Arial, sans-serif;
  --grid-spacing: 2.5rem;
}

html {
  font-size: 62.5%;
}

body {
  line-height: 1.6;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--color-grey-76);
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#nav {
  padding: 0;
  a {
    color: var(--color-grey-76);
    &.router-link-exact-active {
      color: var(--color-primary);
    }
  }
}
</style>
