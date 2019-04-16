<template>
  <fieldset>
    <legend v-if="message">{{ message }}</legend>
    <div
      v-for="option in options"
      :key="option.code"
    >
      <input
        type="radio"
        :id="option.code"
        :name="id"
        :value="option.code"
        @input="$emit('input', $event.target.value)"
        v-model="selectedOption"
      >
      <label :for="option.code">{{ option.name }}</label> <!-- TODO: document option.name and option.code somehow -->
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'RadioSelect',
  props: {
    id: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    defaultSelection: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      selectedOption: this.defaultSelection
    }
  }
}
</script>

<style scoped lang="scss">
</style>
