<template>
  <fieldset>
    <label :for="id">{{ message }}</label>
    <input type="text" :name="id" :id="id" list="options-list">
    <datalist id="options-list">
      <option
        v-for="option in options"
        :key="option"
        :value="option">
        {{ option }}</option>
    </datalist>
  </fieldset>
</template>

<script>
export default {
  name: 'DatalistSelect',
  props: [ "id", "options", "message" ],
  data: function() {
    return {}
  }
}
</script>

<style scoped lang="scss">
</style>
