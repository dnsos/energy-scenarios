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
            v-model="rangeValue"
            @input="selectedYear = $event"
          />
          <output>&nbsp;Year {{ selection.year }}</output>
        </div>
        <DropDown
          id="regions"
          class="control"
          :options="regions"
          :value="selectedRegion"
          :defaultSelection="selectedRegion.code"
          @select="selectedRegion = $event"
        />
      </div>
    </div>
    <div class="controls__border"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import RadioSelect from '@/components/RadioSelect.vue'
import RangeSlider from '@/components/RangeSlider.vue'
import DropDown from '@/components/DropDownSelect.vue'

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
  font-size: var(--font-size-small);
  font-weight: 500;
  background-color: white;
  z-index: 1;
}

.controls__contents--left, .controls__contents--right {
  display: inline-block;
  > *:not(:last-child) {
    margin-right: calc(var(--grid-spacing) / 2);
  }
}
.controls__contents--right {
  text-align: right;
}

.controls__contents {
  padding: calc(var(--grid-spacing) / 2) var(--grid-spacing);
  text-align: left;
  .control {
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
