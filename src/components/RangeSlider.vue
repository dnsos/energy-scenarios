<template>
  <fieldset>
    <label v-if="label" :for="id">{{ label }}</label>
    <input
      type="range"
      :id="id"
      name="rangeslider" 
      min="0"
      max="8"
      value="0"
      step="1"
      @input="$emit('input', $event.target.value)"
    ><!-- TODO: automate min and max values etc. -->
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
  },
  data: function() {
    return {}
  }
}
</script>

<style scoped lang="scss">
label {
  margin-right: calc(var(--grid-spacing) / 2);
}

input[type=range] {
  -webkit-appearance: none;
  margin: var(--grid-spacing) 0;
  width: 15rem;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: .1rem;
  cursor: pointer;
  background: var(--color-dark-blue);
}
input[type=range]::-webkit-slider-thumb {
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 50%;
  background: var(--color-dark-blue);
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -0.6rem;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: var(--color-dark-blue);
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: .1rem;
  cursor: pointer;
  background: var(--color-dark-blue);
}
input[type=range]::-moz-range-thumb {
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 50%;
  background: var(--color-dark-blue);
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 1.2rem;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: var(--color-dark-blue);
  border-radius: 50%;
}
input[type=range]::-ms-fill-upper {
  background: var(--color-dark-blue);
  border-radius: 50%;
}
input[type=range]::-ms-thumb {
  height: 1.2rem;
  width: 1.2rem;
  border-radius: 50%;
  background: var(--color-dark-blue);
  cursor: pointer;
}
input[type=range]:focus::-ms-fill-lower {
  background: var(--color-dark-blue);
}
input[type=range]:focus::-ms-fill-upper {
  background: var(--color-dark-blue);
}
</style>
