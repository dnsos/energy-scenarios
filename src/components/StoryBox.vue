<template>
  <section class="story__wrapper">
    <div class="story__content">
      <transition
        v-for="(step, index) in walkthrough.steps"
        :key="index"
        name="slide-fade">
        <p v-if="index === activeStep">{{ walkthrough.steps[index].text }}</p>
      </transition>
    </div>
    <div class="buttons__wrapper">
      <button
        v-if="activeStep > 0"
        @click="activeStep = activeStep - 1"
      ><span><span>←</span> Back</span>
      </button>
      <button
        v-if="activeStep < walkthrough.steps.length - 1"
        class="button__primary"
        @click="activeStep = activeStep + 1"
      ><span>Next <span>→</span></span></button>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'StoryBox',
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
  },
  watch: {
    activeStep: function (newVal, oldVal) {
      this.$router.push({ name: 'walkthrough', params: { step: newVal } })
    }
  }
}
</script>

<style lang="scss">
/* WRAPPER ELEMENT
----------------------------------------------- */
.story__wrapper {
  display: grid;
  grid-template-rows: minmax(25rem, 1fr) auto;
  padding: var(--grid-spacing);
}

/* TEXT
----------------------------------------------- */
.story__content {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;

  p {
    grid-column: 1;
    grid-row: 1;
  }
}

/* TEXT ANIMATIONS
----------------------------------------------- */
.slide-fade-enter-active {
  transition: all .25s ease-in-out;
}

/*.slide-fade-leave-active {
  put transition for leaving elements here
}*/

.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(1rem);
  opacity: 0;
}

/* BUTTONS
----------------------------------------------- */
.buttons__wrapper {
  text-align: right;
}
</style>
