<template>
  <fieldset>
    <label :for="id">{{ message }}</label>
    <select :class="{ 'inactive' : disabled }" :disabled="disabled" :name="id" :id="id" v-model="selectedOption" @change="$emit('select', $event.target.value)">
      <option
        v-for="option in options"
        :key="option.code"
        :value="option.code">
        {{ option.name }}</option>
    </select>
  </fieldset>
</template>

<script>
export default {
  name: 'DropDownSelect',
  props: [ "id", "options", "message", "defaultSelection", "disabled" ],
  data: function() {
    return {
      selectedOption: this.defaultSelection
    }
  }
}
</script>

<style scoped lang="scss">
select {
  &.inactive {
    -webkit-appearance: none;
    appearance: none;
    border: none;
    text-align-last: right;
  }
}
</style>
