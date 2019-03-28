<template>
  <fieldset>
    <label :for="id">{{ label }}</label>
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
  props: [ "id", "label" ],
  data: function() {
    return {}
  }
}
</script>

<style scoped lang="scss">
</style>
