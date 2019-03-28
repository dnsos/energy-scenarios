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

/* BASICS
----------------------------------------------------- */
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: var(--font-size);
  color: var(--color-grey-76);
}

#app {
  min-height: 100vh;
  display: grid;
  grid-gap: var(--grid-spacing);
  grid-template-columns: repeat(12, 1fr);
  grid-template-areas:
    "h h h h h h h h h h h h"
    "c c c c c c c c c c c c"
    "f f f f f f f f f f f f";
}

.chapter {
  grid-area: c;
  display: grid;
  grid-gap: var(--grid-spacing);
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: max-content;
}

#nav {
  grid-area: h;
  a {
    color: var(--color-grey-76);
    &.router-link-exact-active {
      color: var(--color-primary);
      border-bottom: .1rem solid var(--color-primary);
    }
  }
}

/* TYPOGRAPHY
----------------------------------------------------- */
h1,
h2,
h3,
h4,
h5,
h6 {
  display: block;
  margin-top: 0;
  margin-bottom: var(--grid-spacing);
  font-weight: 700;
}
h1 {
  font-size: calc(var(--font-size) * 1.6);
  line-height: 1.2;
}
h2 {
  font-size: calc(var(--font-size) * 1.4);
  line-height: 1.25;
}
h3 {
  font-size: calc(var(--font-size) * 1.2);
  line-height: 1.3;
}
h4 {
  font-size: var(--font-size);
  line-height: 1.35;
}
h5 {
  font-size: var(--font-size);
  line-height: 1.5;
}
h6 {
  font-size: var(--font-size);
  line-height: 1.6;
}

@media (min-width: 550px) {
  h1 {
    font-size: calc(var(--font-size) * 2.6);
  }
  h2 {
    font-size: calc(var(--font-size) * 2.0);
  }
  h3 {
    font-size: calc(var(--font-size) * 1.6);
  }
  h4 {
    font-size: calc(var(--font-size) * 1.4);
  }
  h5 {
    font-size: calc(var(--font-size) * 1.2);
  }
  h6 {
    font-size: var(--font-size);
  }
}

p {
  margin-top: 0;
  margin-bottom: var(--grid-spacing);
}

a {
  color: inherit;
  text-decoration: none;
  border-bottom: .1rem solid var(--color-grey-76);
  transition: color 0.1s;
}
a:hover {
  color: var(--color-primary);
}
</style>
