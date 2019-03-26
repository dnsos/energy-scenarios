<template>
  <fieldset>
    <label :for="id">{{ message }}</label>
    <select :name="id" :id="id">
      <option
        v-for="option in options"
        :key="option"
        :value="option">
        {{ option }}</option>
    </select>
  </fieldset>
</template>

<script>
export default {
  name: 'DropDownSelect',
  props: [ "id", "options", "message" ],
  data: function() {
    return {}
  }
}
</script>

<style scoped lang="scss">
</style>
