<template>
  <div class="counter" :class="classCounter">
    <app-button-counter
      :differential="'counter__button--minus'"
      :is-disabled="isDisabledButtonMinus"
      data-test="button-minus"
      @changeCount="$emit('changeIngredientCount', ingredientCount - 1)"
    >
      <span class="visually-hidden">Меньше</span>
    </app-button-counter>
    <input
      :value="ingredientCount"
      type="text"
      name="counter"
      class="counter__input"
      readonly
    />
    <app-button-counter
      :class="anotherClassButton"
      :differential="'counter__button--plus'"
      :is-disabled="isDisabledButtonPlus"
      data-test="button-plus"
      @changeCount="$emit('changeIngredientCount', ingredientCount + 1)"
    >
      <span class="visually-hidden">Больше</span>
    </app-button-counter>
  </div>
</template>

<script>
import AppButtonCounter from "@/common/components/AppButtonCounter";

export default {
  name: "AppItemCounter",

  components: { AppButtonCounter },

  props: {
    ingredientCount: {
      type: Number,
      default: 0,
    },

    classCounter: {
      type: String,
      default: "",
    },

    anotherClassButton: {
      type: String,
      default: "",
    },

    maxCount: {
      type: Number,
      default: 100,
    },

    minCount: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    isDisabledButtonPlus() {
      return this.ingredientCount >= this.maxCount;
    },

    isDisabledButtonMinus() {
      return this.ingredientCount === this.minCount;
    },
  },
};
</script>
