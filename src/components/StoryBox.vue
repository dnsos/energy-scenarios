<template>
  <section class="story__wrapper">
    <p>{{ walkthrough.steps[activeStep].text }}</p>
    <div class="buttons__wrapper">
      <button
        v-if="activeStep > 0"
        class="button__previous"
        @click="activeStep = activeStep - 1"
      ><span>Back</span>
      </button>
      <button
        v-if="activeStep < walkthrough.steps.length - 1"
        class="button__next"
        @click="activeStep = activeStep + 1"
      ><span>Next</span></button>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'story-box',
  data: function () {
    return {}
  },
  computed: {
    ...mapState(['selection', 'walkthrough']),
    activeStep: {
      get () {
        return this.$store.state.walkthrough.activeStep
      },
      set (value) {
        this.$store.commit('setStep', value)
      }
    }
  }
}
</script>

<style lang="scss">
.story__wrapper {
  display: grid;
  grid-template-rows: 1fr auto;
}

.buttons__wrapper {
  text-align: right;

  button {
    margin-right: .5rem;
    font-family: var(--font-family-mono);
    color: var(--color-dark-blue);
    background-color: transparent;
    border: .15rem solid var(--color-dark-blue);
    &:focus {
      outline: .1rem dotted black;
    }
  }
  .button__previous {
    padding: .6rem 1.2rem .6rem 2.4rem;

    span:before {
      content: "\2190";
      display: inline-block;
      position: absolute;
      transform: translateX(-1.4rem);
    }
  }
  .button__next {
    padding: .6rem 2.4rem .6rem 1.2rem;
    color: white;
    background-color: var(--color-dark-blue);

    span:after {
      content: "\2192";
      display: inline-block;
      position: absolute;
      transform: translateX(0.4rem);
      color: white;
    }
  }
}
</style>
