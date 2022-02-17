<template>
  <div class="counter counter--orange ingredients__counter">
    <app-button-counter
      :differential="'counter__button--minus'"
      :is-disabled="isDisabledButtonMinus"
      @changeCount="
        $emit('changeIngredientCount', ingredientCount - 1, ingredientName)
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
      :differential="'counter__button--plus'"
      :is-disabled="isDisabledButtonPlus"
      @changeCount="
        $emit('changeIngredientCount', ingredientCount + 1, ingredientName)
      "
    >
      <span class="visually-hidden">Больше</span>
    </app-button-counter>
  </div>
</template>

<script>
import { MAX_INGREDIENT_COUNT, MIN_INGREDIENT_COUNT } from "@/constants";
import AppButtonCounter from "@/common/components/AppButtonCounter";

export default {
  name: "AppItemCounter",
  components: { AppButtonCounter },

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
    someMethod(name) {
      console.log("Метод вызвался на элементе: ", name);
    },
  },
};
</script>
