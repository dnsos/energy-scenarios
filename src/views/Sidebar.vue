<template>
  <div class="sidebar__wrapper" :class="!isWalkthrough ? 'sidebar__explorer' : ''">
    <hgroup class="headings">
      <h1>
        <router-link :to="'/walkthrough/' + 0">Primary Energy Scenarios</router-link>
      </h1>
      <h3>{{ isWalkthrough ? 'Guided Tour' : 'Explorer' }}</h3>
    </hgroup>
    <div class="sidebar__content">
      <div ref="sidebar">
        <ProgressBar :width="sidebarWidth" />
      </div>
      <StoryBox />
      <div v-if="!isWalkthrough">
        <ProgressBar :width="sidebarWidth" />
      </div>
    </div>
    <div class="sidebar__modeswitch">
      <router-link
        v-if="isWalkthrough && activeStep <= walkthrough.steps.length - 2"
        :to="'/explorer/matrix'"
        @click="handleToggleMode()"
      >
      →  Skip guided tour and explore
      </router-link>
      <router-link
        v-else-if="isWalkthrough === false"
        :to="'/walkthrough/' + 0"
        @click="handleToggleMode()"
      >
      →  Take the guided tour
      </router-link>
    </div>
  </div>
</template>

<script>
import StoryBox from '@/components/ui/StoryBox.vue'
import ProgressBar from '@/components/visuals/ProgressBar.vue'

export default {
  name: 'sidebar',
  components: {
    StoryBox,
    ProgressBar
    },
  data: function () {
    return {
      sidebarWidth: 0
    }
  },
  computed: {
    isWalkthrough: function () {
      return this.$store.state.mode.isWalkthrough
    },
    walkthrough: function () {
      return this.$store.state.walkthrough
    },
    activeStep: function () {
      return this.$store.state.walkthrough.activeStep
    }
  },
  methods: {
    handleToggleMode: function () {
      this.$store.dispatch('changeMode')
    }
  },
  mounted: function () {
    this.sidebarWidth = this.$refs.sidebar.offsetWidth
    window.addEventListener("resize", () => { // TODO: better way? 'watch'?
      this.sidebarWidth = this.$refs.sidebar.offsetWidth
    })
  }
}
</script>

<style lang="scss" scoped>
.sidebar__wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-grey-04);

  >* {
    padding: var(--grid-spacing) 0 0 var(--grid-spacing);
  }
  >:last-child {
    padding-bottom: var(--grid-spacing);
  }

  .headings {
    >* {
      margin-bottom: calc(var(--grid-spacing) / 4);
    }
  }

  .sidebar__modeswitch {
    display: flex;
    height: inherit;
    >a {
      align-self: flex-end;
    }
  }
}

.sidebar__explorer {
  background-color: #dcdcdc;
}
</style>

