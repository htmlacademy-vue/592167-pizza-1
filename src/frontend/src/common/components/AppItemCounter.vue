<template>
  <div class="counter" :class="classCounter">
    <app-button-counter
      :differential="'counter__button--minus'"
      :is-disabled="isDisabledButtonMinus"
      @changeCount="
        $emit('changeIngredientCount', ingredientCount - 1, ingredient)
      "
    >
      <span class="visually-hidden">Меньше</span>
    </app-button-counter>
    <input
      :value="ingredientCount"
      type="text"
      name="counter"
      class="counter__input"
    />
    <app-button-counter
      :class="anotherClassButton"
      :differential="'counter__button--plus'"
      :is-disabled="isDisabledButtonPlus"
      @changeCount="
        $emit('changeIngredientCount', ingredientCount + 1, ingredient)
      "
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
    ingredient: {
      type: [String, Number],
      required: true,
    },
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
  data() {
    return {
      count: 0,
      isIngredients: false,
    };
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
