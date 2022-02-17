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

export default {
  name: "BuilderPizzaView",
  components: { AppDrop },
  props: {
    doughSize: {
      type: String,
      default: "",
    },
    sauceInfo: {
      type: String,
      default: "",
    },
    ingredients: {
      type: Array,
      default: () => [],
    },
    selectedIngredients: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      count: 0,
    };
  },
  computed: {
    pizzaSize() {
      if (this.doughSize === "light") {
        return `pizza--foundation--small-${this.sauceInfo}`;
      }
      return `pizza--foundation--big-${this.sauceInfo}`;
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
