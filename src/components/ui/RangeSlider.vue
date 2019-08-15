<template>
  <fieldset class="control__years">
    <label v-if="label" :for="id" class="label">{{ label }}</label>
    <div class="years__slider">
      <input
        type="range"
        :id="id"
        name="rangeslider" 
        min="0"
        max="8"
        value="3"
        step="1"
        @input="$emit('input', $event.target.value)"
      ><!-- TODO: automate min and max values etc. -->
    </div>
    <div class="years__steps">
      <div
        v-for="year in years"
        :key="year.year"
        class="year__step"
        :class="{ 'year--active' : (year.year === activeYear) }"
      >
        <span v-if="year.abbreviation">{{ year.abbreviation }}</span>
        <span v-else>{{ year.year }}</span>
      </div>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'RangeSlider',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false
    },
    years: {
      type: Array,
      required: false
    }
  },
  data: function() {
    return {}
  },
  computed: {
    activeYear: function () {
      return this.$store.state.selection.year
    }
  }
}
</script>

<style scoped lang="scss">
label {
  margin-right: calc(var(--grid-spacing) / 2);
}
.years__slider {
  display: flex;
  justify-content: center;
  &::before, &::after {
    content: '|';
    margin: 0;
    color: var(--color-grey-31);
  }
  &::before {
    transform: scaleY(0.5) translateX(.2rem);
  }
  &::after {
    transform: scaleY(0.5) translateX(-.2rem);
  }
}
.years__steps {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 0;
  width: calc(30rem + (calc(30rem/9)));
  color: var(--color-grey-31);
  .year__step {
    text-align: center;
  }
  .year--active {
    color: var(--color-grey-76);
  }
}
input[type=range] {
  -webkit-appearance: none;
  width: 30rem;
  margin: 0;
  vertical-align: middle;
}
input[type=range]:focus {
  outline: .1rem dotted black;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: .1rem;
  cursor: pointer;
  background: var(--color-grey-31);
}
input[type=range]::-webkit-slider-thumb {
  height: 1.1rem;
  width: 1.1rem;
  border-radius: 50%;
  background: black;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -0.5rem;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: var(--color-grey-31);
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: .1rem;
  cursor: pointer;
  background: var(--color-grey-31);
}
input[type=range]::-moz-range-thumb {
  height: 1.1rem;
  width: 1.1rem;
  border-radius: 50%;
  background: black;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: .1rem;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background-color: var(--color-grey-31);
}
input[type=range]::-ms-fill-upper {
  background-color: var(--color-grey-31);
}
input[type=range]::-ms-thumb {
  height: 1.1rem;
  width: 1.1rem;
  border-radius: 50%;
  background: black;
  cursor: pointer;
  margin-top: -0.2rem;
}
input[type=range]:focus::-ms-fill-lower {
  background-color: var(--color-grey-31);
}
input[type=range]:focus::-ms-fill-upper {
  background-color: var(--color-grey-31);
}
</style>
