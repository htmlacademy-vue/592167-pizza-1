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
      return this.ingredientCount >= 3;
    },
    isDisabledButtonMinus() {
      return this.ingredientCount === 0;
    },
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
