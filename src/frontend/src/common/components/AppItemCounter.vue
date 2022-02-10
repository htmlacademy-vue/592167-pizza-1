<template>
  <div class="counter counter--orange ingredients__counter">
    <button
      type="button"
      class="counter__button counter__button--minus"
      @click="decrementValue"
      :disabled="isDisabledButtonMinus"
    >
      <span class="visually-hidden">Меньше</span>
    </button>
    <input
      type="text"
      name="counter"
      class="counter__input"
      v-model="ingredientCount"
    />
    <button
      type="button"
      class="counter__button counter__button--plus"
      @click="incrementValue"
      :disabled="isDisabledButtonPlus"
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
    idx: Number,
    ingredientCount: Number,
  },
  data() {
    return {
      count: 0,
      isIngredients: false,
    };
  },
  methods: {
    incrementValue() {
      this.$emit("onIncrementIngredientClick", this.idx);
    },
    decrementValue() {
      this.$emit("onDecrementIngredientClick", this.idx);
    },
  },
  computed: {
    isDisabledButtonPlus() {
      return this.ingredientCount >= MAX_INGREDIENT_COUNT;
    },
    isDisabledButtonMinus() {
      return this.ingredientCount === MIN_INGREDIENT_COUNT;
    },
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
