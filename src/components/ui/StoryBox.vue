<template>
  <section class="story__wrapper">
    <div class="story__content">
      <transition
        v-for="(step, index) in walkthrough.steps"
        :key="index"
        name="slide-fade">
        <p v-if="mode.isWalkthrough && index === activeStep">{{ walkthrough.steps[index].text }}</p>
      </transition>
    </div>
    <div class="buttons__wrapper">
      <!--<button
        v-if="activeStep > 0"
        @click="activeStep = activeStep - 1"
      ><span><span>←</span> Back</span>
      </button>-->
      <button
        v-if="mode.isWalkthrough && activeStep < walkthrough.steps.length - 1"
        class="button__primary"
        :class="{ 'button--active': buttonIsHovered}"
        @click="activeStep = activeStep + 1"
        @mouseenter="toggleButtonHover()"
        @mouseleave="toggleButtonHover()"
      ><span class="arrow--next">→   </span><span>{{ walkthrough.steps[activeStep + 1].name }}</span></button>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'StoryBox',
  data: function () {
    return {
      buttonIsHovered: false
    }
  },
  computed: {
    ...mapState(['selection', 'walkthrough', 'mode']),
    activeStep: {
      get () {
        return this.$store.state.walkthrough.activeStep
      },
      set (value) {
        if (value > this.walkthrough.steps.length) {
          this.$store.commit('setStep', this.walkthrough.steps.length)
        } else {
          this.$store.commit('setStep', value)
        }
      }
    }
  },
  methods: {
    toggleButtonHover: function () {
      this.buttonIsHovered = !this.buttonIsHovered
    }
  }
}
</script>

<style lang="scss">
/* WRAPPER ELEMENT
----------------------------------------------- */
.story__wrapper {
  display: grid;
  grid-template-rows: auto auto;
  padding: var(--grid-spacing);
  background-color: white;
}
@media (min-width: 850px) {
  .story__wrapper {
    grid-template-rows: 25rem auto;
  }  
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
  transform: translateY(100%);

  button {
    border: none;
  }

  .arrow--next {
    display: inline-block;
    margin-right: calc(var(--grid-spacing) / 2);
    transition: transform .2s ease-in-out;
  }

  .button--active {
    .arrow--next {
      transform: translateX(.5rem);
    }
  }
}
</style>
