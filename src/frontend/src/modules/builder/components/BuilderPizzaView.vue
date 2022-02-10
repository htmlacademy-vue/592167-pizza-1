<template>
  <AppDrop @drop="moveIngredient">
    <div class="content__constructor">
      <div class="pizza" :class="pizzaSize">
        <div class="pizza__wrapper">
          <div
            class="pizza__filling"
            v-for="item of pizzaFilling"
            :key="item.id"
            :class="
              'pizza__filling--' + item.name + ingredientCount(item.count)
            "
          ></div>
        </div>
      </div>
    </div>
  </AppDrop>
</template>

<script>
import AppDrop from "@/common/components/AppDrop";

export default {
  name: "BuilderPizzaView",
  props: {
    doughSize: String,
    sauceInfo: String,
    ingredients: Array,
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
      this.$emit("dragNDropIngredient", active.id);
    },
  },
  computed: {
    pizzaSize() {
      if (this.doughSize === "light") {
        return `pizza--foundation--small-${this.sauceInfo}`;
      }
      return `pizza--foundation--big-${this.sauceInfo}`;
    },
    pizzaFilling() {
      return this.ingredients.filter((it) => it.count > 0);
    },
  },
  components: { AppDrop },
};
</script>

<!--<style scoped>-->
<!--</style>-->
