<template>
  <main id="app">
    <Controls />
    <router-view/>
    <nav id="nav">
      <router-link to="/" exact>Walkthrough</router-link> |
      <router-link to="/demand" exact>Demand Figure</router-link> |
      <router-link to="/mix" exact>Mix Figure</router-link> |
      <router-link to="/matrix-figure" exact>Matrix Figure</router-link>
    </nav>
  </main>
</template>

<script>
import Controls from '@/components/Controls.vue'

export default {
  name: 'app',
  components: {
    Controls
  }
}
</script>


<style lang="scss">

/* BASICS
----------------------------------------------------- */
:root {
  --color-violet: #4e40b2;
  --color-dark-blue: #2f3652;
  --color-yellow: rgb(254, 174, 0);
  --color-grey-76: #3e3e3e;
  --color-grey-54: #757575;
  --color-grey-20: #cccccc;
  --color-grey-09: #e7e7e7;
  --color-grey-02: #f9f9f9;
  --font-size: 16px;
  --font-size-small: 12px;
  --font-family: "IBM Plex Sans", Arial, sans-serif;
  --font-family-mono: "IBM Plex Mono", monospace;
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

figure {
  margin: 0;
}
fieldset {
  padding: 0;
  margin: 0;
  border: none;
}

#app {
  min-height: 100vh;
  padding: 0;
  display: grid;
  grid-gap: var(--grid-spacing);
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto;
  grid-template-areas:
    "h h h h h h h h h h h h"
    "c c c c c c c c c c c c"
    "f f f f f f f f f f f f";

  >* {
    height: max-content;
  }
}

/* CHAPTERS
----------------------------------------------------- */
.chapter {
  grid-area: c;
  display: grid;
  grid-gap: var(--grid-spacing);
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: min-content;
  padding: 0 var(--grid-spacing);
}

.chapter__header {
  grid-column: span 12;
}

.chapter__story {
  grid-column: span 3;
  height: max-content;
  padding: var(--grid-spacing);
  align-self: end;
  border: .15rem solid var(--color-dark-blue);
  z-index: 1;
}

.chapter__content {
  grid-column: 5 / 13;
  z-index: 0;
}

nav {
  grid-area: f;
  a {
    color: var(--color-grey-54);
    border-bottom: .1rem solid transparent;
    &.router-link-active {
      color: var(--color-dark-blue);
      border-color: var(--color-dark-blue);
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

.indicator {
  font-style: italic;
}
</style>
