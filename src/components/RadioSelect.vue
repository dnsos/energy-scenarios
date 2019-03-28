<template>
  <fieldset>
    <legend v-if="message">{{ message }}</legend>
    <div
      v-for="option in options"
      :key="option"
    >
      <input
        type="radio"
        :id="option"
        :name="id"
        :value="option"
        @input="$emit('input', $event.target.value)"
      >
      <label :for="option">{{ option }}</label>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'RadioSelect',
  props: [ "id", "options", "message" ],
  data: function() {
    return {}
  }
}
</script>

<style scoped lang="scss">
</style>
