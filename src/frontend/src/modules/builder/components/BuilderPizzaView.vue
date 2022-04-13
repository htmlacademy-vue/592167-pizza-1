<template>
  <AppDrop @drop="moveIngredient">
    <div class="content__constructor">
      <div class="pizza" :class="pizzaSize">
        <div class="pizza__wrapper">
          <div
            v-for="ingredient in selectedIngredients"
            :key="ingredient.id"
            class="pizza__filling"
            :class="
              'pizza__filling--' +
              getIngredientName(ingredient.ingredientId) +
              ingredientCount(ingredient.quantity)
            "
          />
        </div>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BuilderPizzaView",
  components: { AppDrop },
  computed: {
    ...mapGetters("Builder", [
      "selectedIngredients",
      "ingredients",
      "doughId",
      "sauceId",
      "sauces",
    ]),
    pizzaSize() {
      const sauceName = this.sauces.find((it) => it.id === this.sauceId).slug;
      return `pizza--foundation--${
        this.doughId === 1 ? "small" : "big"
      }-${sauceName}`;
    },
  },
  methods: {
    ...mapActions("Builder", ["updateSelectedIngredients"]),
    moveIngredient(active) {
      const keysNames = Object.keys(this.selectedIngredients);
      let count = keysNames.includes(active)
        ? this.selectedIngredients[active]
        : 0;
      this.updateSelectedIngredients({
        [active]: ++count,
      });
    },

    ingredientCount(count) {
      switch (count) {
        case 2:
          return " pizza__filling--second";
        case 3:
          return " pizza__filling--third";
        default:
          return "";
      }
    },
    getIngredientName(id) {
      const ingredient = this.ingredients.find((it) => it.id === id)?.name;
      return ingredient ? ingredient : "";
    },
  },
};
</script>
