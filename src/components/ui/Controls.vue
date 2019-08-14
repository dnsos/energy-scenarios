<template>
  <div class="controls__wrapper">
    <div class="controls__contents grid-2-columns">
      <div class="controls__contents--left">
        <RadioSelect
          v-if="isVisible([3,4,5,6,7,8,9])"
          :id="'baseline'"
          class="control"
          :options="baseline"
          :value="baseline[0].code"
          :defaultSelection="baseline[0].code"
        />
        <RadioSelect
          v-if="isVisible([4,5,6,7,8,9])"
          :id="'targets'"
          class="control"
          :options="targets"
          :value="selectedTarget"
          :defaultSelection="selectedTarget.code"
          @input="selectedTarget = $event"
        />
      </div>
      <div class="controls__contents--right">
        <div class="control">
          <RangeSlider
            v-if="isVisible([])"
            id="years"
            :years="general.years"
            v-model="rangeValue"
            @input="selectedYear = $event"
          />
          <output v-else><span>Year</span>&nbsp;{{ selection.year }}</output>
        </div>
        <DropDown
          v-if="isVisible([])"
          id="regions"
          class="control"
          :options="regions"
          :value="selectedRegion"
          :disabled="mode.isWalkthrough"
          :defaultSelection="selectedRegion.code"
          @select="selectedRegion = $event"
        />
        <div v-else class="control">
          <span>{{ selection.region.name }}</span>
        </div>
      </div>
    </div>
    <div class="controls__border"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RadioSelect from '@/components/ui/RadioSelect.vue'
import RangeSlider from '@/components/ui/RangeSlider.vue'
import DropDown from '@/components/ui/DropDownSelect.vue'

export default {
  name: 'controls',
  components: {
    RadioSelect,
    RangeSlider,
    DropDown
  },
  data: function () {
    return {
      rangeValue: 3
    }
  },
  computed: {
    ...mapState(['selection', 'general', 'baseline', 'targets', 'regions', 'walkthrough', 'mode']),
    selectedTarget: {
      get () {
        return this.$store.state.selection.target
      },
      set (value) {
        this.$store.dispatch('changeTarget', value)
      }
    },
    selectedYear: {
      get () {
        return this.$store.state.selection.year
      },
      set (value) {
        this.$store.dispatch('changeYear', this.general.startyear + (value * this.general.yearinterval))
      }
    },
    selectedRegion: {
      get () {
        return this.$store.state.selection.region
      },
      set (value) {
        this.$store.dispatch('changeRegion', value)
      }
    }
  },
  methods: {
    isVisible: function (steps) {
      if (this.mode.isWalkthrough === false) {
        return true
      } else if (this.mode.isWalkthrough && this.atWalkthroughStep(steps)) {
        return true
      } else {
        return false
      }
    }
  },
  mounted: function () {}
}
</script>


<style lang="scss">
.controls__wrapper {
  height: 100%;
  font-size: var(--font-size-small);
  font-weight: 500;
  background-color: white;
  z-index: 1;
}

.controls__contents--left, .controls__contents--right {
  align-self: center;
  display: inline-block;
  > *:not(:last-child) {
    margin-right: calc(var(--grid-spacing) / 2);
  }
}
.controls__contents--right {
  display: flex;
  justify-content: flex-end;
}
@media (max-width: 750px) {
  .controls__contents--right {
    display: block;
    > *:not(:last-child) {
      margin-bottom: var(--grid-spacing);
    }
  }
}

.controls__contents {
  height: calc(100% - .1rem);
  padding: calc(var(--grid-spacing) / 2) var(--grid-spacing);
  text-align: left;
  .control {
    align-self: center;
    display: inline-block;
    > * {
      display: inline-block;
    }
  }
}

.controls__border {
  width: calc(100% - calc(var(--grid-spacing) * 2));
  height: .1rem;
  margin: 0 auto;
  background-color: var(--color-grey-31);
}
</style>
