<template>
  <div class="sidebar__wrapper">
    <hgroup class="headings">
      <h6>Learn Module</h6>
      <h1>Primary Energy Scenarios</h1>
      <h3>{{ isWalkthrough ? 'Guided Tour' : 'Explorer' }}</h3>
    </hgroup>
    <div class="sidebar__content">
      <div ref="sidebar">
        <ProgressBar :width="sidebarWidth" />
      </div>
      <StoryBox />
    </div>
    <div class="sidebar__modeswitch">
      <router-link v-if="isWalkthrough" :to="'/explorer'" @click="handleToggleMode()">→  Skip guided tour and explore</router-link>
      <router-link v-else :to="'/walkthrough/' + 0" @click="handleToggleMode()">→  Take the guided tour</router-link>
    </div>
  </div>
</template>

<script>
import StoryBox from '@/components/StoryBox.vue'
import ProgressBar from '@/components/ProgressBar.vue'

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
  display: grid;
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
    >a {
      align-self: flex-end;
    }
  }
}
</style>

