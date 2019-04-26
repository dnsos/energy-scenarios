<template>
  <fieldset>
    <legend v-if="message">{{ message }}</legend>
    <div class="options__wrapper">
      <div
        v-for="option in options"
        :key="option.code"
        class="option"
      >
        <input
          type="radio"
          :id="option.code"
          :name="id"
          :value="option.code"
          @input="$emit('input', $event.target.value)"
          v-model="selectedOption"
        >
        <label :for="option.code" :class="{ active: selectedOption === option.code }">{{ option.name }}</label>
      </div>
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
      required: false
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
.options__wrapper {
  width: 100%;

  .option {
    display: inline-block;

    input {
      display: none;
    }

    label {
      padding: .2rem calc(var(--grid-spacing) / 4);
      background-color: transparent;
      cursor: pointer;
      transition: all .1s ease-in;
    }

    .active {
      color: white;
      background-color: var(--color-yellow);
    }
  }

  .option:not(:last-child) {
    margin-right: calc(var(--grid-spacing) / 2);
  }
}
</style>
