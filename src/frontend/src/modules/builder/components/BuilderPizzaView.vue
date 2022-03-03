<template>
  <AppDrop @drop="moveIngredient">
    <div class="content__constructor">
      <div class="pizza" :class="pizzaSize">
        <div class="pizza__wrapper">
          <div
            v-for="(item, name) in selectedIngredients"
            :key="name"
            class="pizza__filling"
            :class="'pizza__filling--' + name + ingredientCount(item)"
          />
        </div>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";
import { mapGetters } from "vuex";

export default {
  name: "BuilderPizzaView",
  components: { AppDrop },
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    ...mapGetters("Builder", ["selectedIngredients", "dough", "sauce"]),
    pizzaSize() {
      if (this.dough === "light") {
        return `pizza--foundation--small-${this.sauce}`;
      }
      return `pizza--foundation--big-${this.sauce}`;
    },
  },
  methods: {
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
    moveIngredient(active) {
      const keysNames = Object.keys(this.selectedIngredients);
      this.count = keysNames.includes(active)
        ? this.selectedIngredients[active]
        : 0;
      this.$emit("changeIngredientCount", {
        [active]: ++this.count,
      });
    },
  },
};
</script>
