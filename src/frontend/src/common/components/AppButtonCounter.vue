<template>
  <button
    type="button"
    class="counter__button"
    :class="differential"
    :disabled="isDisabled"
    @click="$emit('changeCount')"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "AppButtonCounter",
  props: {
    isDisabled: {
      type: Boolean,
      default: false,
    },
    differential: {
      type: String,
      default: "",
      validator(value) {
        return ["", "counter__button--plus", "counter__button--minus"].includes(
          value
        );
      },
    },
  },
};
</script>
