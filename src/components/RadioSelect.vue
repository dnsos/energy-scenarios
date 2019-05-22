<template>
  <fieldset :class="'control__' + id">
    <legend v-if="message">{{ message }}</legend>
    <div class="options__wrapper">
      <label
        v-for="option in options"
        :key="option.code"
        class="option"
        :class="{ active: selectedOption === option.code }"
        :for="option.code"
      >
        <span
          class="checkmark--custom"
          :class="{ active: selectedOption === option.code }"
        ></span>
        <input
          type="radio"
          :id="option.code"
          :name="id"
          :value="option.code"
          @input="$emit('input', $event.target.value)"
          v-model="selectedOption"
        >
        <span class="option-name--custom">{{option.name}}</span>
      </label>
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
    cursor: pointer;

    input {
      //display: none;
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }

    /*label {
      padding: .2rem calc(var(--grid-spacing) / 4);
      background-color: transparent;
      cursor: pointer;
      transition: all .1s ease-in;
    }*/

    .checkmark--custom {
      position: absolute;
      height: 2.2rem;
      width: 2.2rem;
      background-color: white;
      border: .15rem solid var(--color-grey-09);
      border-radius: 50%;
    }

    .option-name--custom {
      padding-left: 3rem;
    }

    .active {
      background-color: var(--color-yellow-light);
      border-color: var(--color-yellow);
    }
  }

  .option:not(:last-child) {
    margin-right: calc(var(--grid-spacing) / 2);
  }
}

.control__baseline {
  .option, .option input {
    cursor: default;
  }
  .options__wrapper .option .checkmark--custom {
    background-color: var(--color-violet-light);
    border-color: var(--color-violet);
  }
}

.control__targets {
  .option:not(.active) {
    color: var(--color-grey-09);
  }
}
</style>
