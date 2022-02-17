<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      :disabled="isDisabledButtonMinus"
      @click="decrementValue"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      :value="ingredientCount"
      type="text"
      name="counter"
      class="counter__input"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      :disabled="isDisabledButtonPlus"
      @click="incrementValue"
    >
      <span class="visually-hidden">Больше</span>
    </button>
  </div>
</template>

<script>
import { MAX_INGREDIENT_COUNT, MIN_INGREDIENT_COUNT } from "@/constants";

export default {
  name: "AppItemCounter",
  props: {
    idx: {
      type: Number,
      default: 0,
    },
    ingredientName: {
      type: String,
      default: "",
    },
    ingredientCount: {
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
      return this.ingredientCount >= MAX_INGREDIENT_COUNT;
    },
    isDisabledButtonMinus() {
      return this.ingredientCount === MIN_INGREDIENT_COUNT;
    },
  },
  methods: {
    incrementValue() {
      this.count = this.ingredientCount;
      this.$emit("changeIngredientCount", {
        [this.ingredientName]: ++this.count,
      });
    },
    decrementValue() {
      this.count = this.ingredientCount;
      this.$emit("changeIngredientCount", {
        [this.ingredientName]: --this.count,
      });
    },
  },
};
</script>
