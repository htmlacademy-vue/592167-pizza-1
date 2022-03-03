<template>
  <div>
    <Main />
  </div>
</template>

<script>
import {
  DOUGH_PRICE,
  MIN_INGREDIENT_COUNT,
  SAUCES_PRICE,
  SIZE_MULTIPLIER,
} from "@/constants";

import Main from "@/views/Main";

export default {
  name: "Index",
  components: {
    Main,
  },
  data() {
    return {
      isAuth: true,
    };
  },
  computed: {
    totalPrice() {
      // мультипликатор размера х (стоимость теста + соус + ингредиенты)
      let ingredientsPrice = 0;
      const selectedIngredientList = Object.keys(this.selectedIngredients);
      for (const item of selectedIngredientList) {
        const ingredient = this.ingredients.find((it) => it.name === item);
        ingredientsPrice += ingredient.price * this.selectedIngredients[item];
      }
      return (
        SIZE_MULTIPLIER[this.pizzaDiameter] *
        (DOUGH_PRICE[this.doughSize] +
          SAUCES_PRICE[this.sauceInfo] +
          ingredientsPrice)
      );
    },
  },
  methods: {
    changeDoughSize(data) {
      this.doughSize = data;
    },
    changeSauce(data) {
      this.sauceInfo = data;
    },
    changePizzaDiameter(data) {
      this.pizzaDiameter = data;
    },
    changeIngredientCount(data) {
      this.$set(
        this.selectedIngredients,
        Object.keys(data)[0],
        data[Object.keys(data)[0]]
      );
      if (data[Object.keys(data)[0]] === MIN_INGREDIENT_COUNT) {
        delete this.selectedIngredients[Object.keys(data)[0]];
      }
    },
    changePizzaName(data) {
      this.pizzaName = data;
    },
  },
};
</script>
