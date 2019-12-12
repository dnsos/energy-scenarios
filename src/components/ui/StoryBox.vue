<template>
  <section class="story__wrapper">
    <div class="story__content">
      <story-tooltip />
      <transition
        v-for="(step, index) in walkthrough.steps"
        :key="index"
        name="slide-fade"
      >
        <p v-if="mode.isWalkthrough && index === activeStep">
          <story-content :displayedIndex="index" />
        </p>
      </transition>
      <transition name="slide-fade">
        <p v-if="!mode.isWalkthrough">The Explorer mode offers the possibility to examine the scenarios according to custom interests. Use the navigation elements and filters on top to inspect different climate targets or a specific time horizon. Or click on the circles to explore the scenarios in detail.</p>
      </transition>
    </div>
    <div class="buttons__wrapper">
      <button
        v-if="mode.isWalkthrough && activeStep >= 1"
        @click="activeStep = activeStep - 1"
      >
        <span>←</span>
      </button>
      <button
        v-if="mode.isWalkthrough && activeStep < walkthrough.steps.length - 1"
        class="button__primary"
        :class="{ 'button--active': buttonIsHovered}"
        @click="activeStep = activeStep + 1"
        @mouseenter="toggleButtonHover()"
        @mouseleave="toggleButtonHover()"
      >
        <span class="arrow--next">→  </span>
        <span>{{ walkthrough.steps[activeStep + 1].name }}</span>
      </button>
      <button
        v-else-if="mode.isWalkthrough"
        class="button__primary"
        :class="{ 'button--active': buttonIsHovered}"
        @click="enterExplorerMode()"
        @mouseenter="toggleButtonHover()"
        @mouseleave="toggleButtonHover()"
      >
        <span class="arrow--next">→  </span>
        <span>Explore the scenarios</span>
      </button>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import StoryContent from '@/components/ui/StoryContent.vue'
import StoryTooltip from '@/components/ui/StoryTooltip.vue'

export default {
  name: 'StoryBox',
  components: {
    'story-content': StoryContent,
    'story-tooltip': StoryTooltip
  },
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
    },
    enterExplorerMode: function () {
      this.$router.push({ name: 'explorer', params: { view: 'matrix' } })
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
    grid-template-rows: max-content auto;
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
