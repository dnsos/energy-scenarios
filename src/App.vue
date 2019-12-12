<template>
  <div id="app" v-cloak>
    <header class="grid-area grid-header">
      <Header />
    </header>
    <section class="grid-area grid-controls">
      <Controls />
    </section>
    <section class="grid-area grid-sidebar">
      <router-view name="sidebar"></router-view>
    </section>
    <main class="grid-area grid-main">
      <router-view name="main"></router-view>
    </main>
  </div>
</template>

<script>
import Header from '@/components/ui/Header.vue'
import Controls from '@/components/ui/Controls.vue'

export default {
  name: 'app',
  components: {
    Header,
    Controls
  },
  computed: {
    activeStep: function () {
      return this.$store.state.walkthrough.activeStep
    }
  }
}
</script>


<style lang="scss">

/* BASICS
----------------------------------------------------- */
:root {
  --color-primary-neutral: black;
  --color-violet: #B035C9;
  --color-violet-light: #edecf7;
  --color-dark-blue: #2f3652;
  --color-yellow: #FFC740;
  --color-yellow-light: #fff7e7;
  --color-grey-76: #3e3e3e;
  --color-grey-54: #757575;
  --color-grey-31: #b1b1b1;
  --color-grey-20: #cccccc;
  --color-grey-09: #e7e7e7;
  --color-grey-04: #f5f5f5;
  --color-grey-02: #f9f9f9;
  --font-size: 16px;
  --font-size-small: 14px;
  --font-family: "IBM Plex Sans", Arial, sans-serif;
  --font-family-serif: "IBM Plex Serif", serif;
  --font-family-mono: "IBM Plex Mono", monospace;
  --grid-spacing: 2rem;
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
  font-weight: 500;
  color: var(--color-grey-76);
  * {
    box-sizing: border-box;
  }
}

#app {
  padding: 0;
  overflow: hidden;
  display: grid;
  grid-gap: 0;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: max-content auto;

  > .grid-area {
    height: 100%;
    max-height: max-content;
  }

  .grid-header { grid-area: h-le; z-index: 1; }
  .grid-controls { grid-area: h-ri; z-index: 1; }
  .grid-sidebar { grid-area: sbar; z-index: 1; }
  .grid-main { grid-area: main; z-index: 0; }
}
@media (max-width: 850px) {
  #app {
    height: auto;
    grid-template-areas:
    "h-le h-le h-le h-le h-le h-le h-le h-le h-le h-le h-le h-le"
    "sbar sbar sbar sbar sbar sbar sbar sbar sbar sbar sbar sbar"
    "h-ri h-ri h-ri h-ri h-ri h-ri h-ri h-ri h-ri h-ri h-ri h-ri"
    "main main main main main main main main main main main main";
  }
}
@media (min-width: 850px) {
  #app {
    height: 100vh;
    grid-template-areas:
    "h-le h-le h-le h-le h-ri h-ri h-ri h-ri h-ri h-ri h-ri h-ri"
    "sbar sbar sbar sbar main main main main main main main main";
  }
}
@media (min-width: 1250px) {
  #app {
    grid-template-areas:
    "h-le h-le h-le h-ri h-ri h-ri h-ri h-ri h-ri h-ri h-ri h-ri"
    "sbar sbar sbar main main main main main main main main main";
  }
}

figure {
  margin: 0;
}
fieldset {
  padding: 0;
  margin: 0;
  border: none;
}

.viz__wrapper {
  height: 100%;
  padding: var(--grid-spacing);
}

.tooltip__line {
  stroke: var(--color-grey-31);
  stroke-width: 0.75;
}

.label {
  margin-bottom: calc(var(--grid-spacing)/4);
  font-size: var(--font-size-small);
  font-weight: 400;
  text-transform: uppercase;
  text-align: left;
  color: var(--color-grey-31);
}

/* UI
----------------------------------------------------- */
.grid-2-columns {
  display: grid;
  grid-template-columns: 100%;
  grid-gap: var(--grid-spacing);
}
@media (min-width: 750px) {
  .grid-2-columns {
    grid-template-columns: auto auto;
  }
}

.grid-12-columns {
  display: grid;
  grid-gap: var(--grid-spacing);
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: min-content;

  .grid-sidebar {
    grid-column: span 12;
  }
  @media (min-width: 750px) {
    .grid-sidebar {
      grid-column: span 3;
    }
  }
  .grid-main {
    grid-column: span 12;
  }
  @media (min-width: 750px) {
    .grid-main {
      grid-column: 4 / 13;
    }
  }
}

.chapter {
  grid-area: c;
}

.chapter__story {
  height: auto;
  background-color: white;
  /*border: .15rem solid var(--color-dark-blue);*/
  box-shadow: 0 0 4px var(--color-grey-09);
  z-index: 1;
}
@media (min-width: 750px) {
    .chapter__story {
      height: max-content;
    }
  }

.chapter__content {
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
  color: var(--color-primary-neutral);
  margin-top: 0;
  margin-bottom: var(--grid-spacing);
}
h1 {
  font-family: var(--font-family-serif);
  font-size: 3.2rem;
  font-weight: 600;
  line-height: 1.3;
}
h2 {
  font-size: 2.4rem;
  font-weight: 600;
}
h3 {
  font-size: calc(var(--font-size) * 1);
  font-weight: 400;
  color: var(--color-grey-31);
}
h4 {
  font-size: var(--font-size);
  font-weight: 400;
  color: var(--color-grey-31);
}
h5 {
  font-size: var(--font-size);
  font-weight: 400;
  text-transform: uppercase;
  color: var(--color-grey-31);
}
h6 {
  font-size: var(--font-size-small);
  font-weight: 400;
  text-transform: uppercase;
  color: var(--color-grey-31);
}
@media (min-width: 1000px) {
  h1 { font-size: 3.2rem; }
  h2 { font-size: 2.4rem; }
}

p {
  margin-top: 0;
  margin-bottom: var(--grid-spacing);
}

a {
  color: inherit;
  text-decoration: none;
  border-bottom: none;
  transition: color 0.1s;
}
a:hover {
  color: var(--color-primary);
}

/* BUTTONS
----------------------------------------------------- */
button {
    padding: .6rem 1.2rem;
    margin-right: .6rem;
    font-family: var(--font-family-mono);
    color: var(--color-primary-neutral);
    background-color: white;
    border: .1rem solid var(--color-primary-neutral);

    &:last-child {
      margin-right: 0;
    }

    &:focus {
      outline: .1rem dotted black;
    }
  }
  
.button__primary {
  color: white;
  background-color: var(--color-primary-neutral);
}

select.select {
  border: none;
  border-bottom: .1rem solid var(--color-grey-31);
  &:focus {
    outline: .1rem dashed black;
    option {
      box-shadow: 0 0 5px black;
    }
  }
}

/* ANIMATIONS/TRANSITIONS
----------------------------------------------------- */
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease-in;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-slowly-enter-active, .fade-slowly-leave-active {
  transition: opacity 1s ease-in;
  transition-delay: .2s;
}
.fade-slowly-enter, .fade-slowly-leave-to {
  opacity: 0;
}
</style>
