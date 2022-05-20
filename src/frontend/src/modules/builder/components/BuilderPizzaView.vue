<template>
  <AppDrop @drop="moveIngredient">
    <div class="content__constructor">
      <div class="pizza" :class="pizzaSize">
        <transition-group name="list" tag="div" class="pizza__wrapper">
          <div
            v-for="ingredient in selectedIngredients"
            :key="ingredient.ingredientId"
            class="pizza__filling"
            :class="
              'pizza__filling--' +
              getIngredientName(ingredient.ingredientId) +
              ingredientCount(ingredient.quantity)
            "
          />
        </transition-group>
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

    moveIngredient(id) {
      const ingredient = this.selectedIngredients.find(
        (it) => it.ingredientId === id
      );
      let count = ingredient ? ingredient.quantity : 0;
      this.updateSelectedIngredients({
        ingredientId: id,
        quantity: ++count,
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

<style lang="scss">
.list-enter-active,
.list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to /* .list-leave-active до версии 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
</style>
