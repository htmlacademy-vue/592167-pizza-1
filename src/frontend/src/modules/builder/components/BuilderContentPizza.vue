<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
      />
    </label>
    <builder-pizza-view
      :dough-size="doughSize"
      :sauce-info="sauceInfo"
      :ingredients="ingredients"
      @dragNDropIngredient="dragNDropIngredient"
    />
    <builder-price-counter :sum="sum" />
  </div>
</template>

<script>
import BuilderPizzaView from "./BuilderPizzaView";
import BuilderPriceCounter from "./BuilderPriceCounter";

export default {
  name: "BuilderContentPizza",
  components: {
    BuilderPizzaView,
    BuilderPriceCounter,
  },
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
    sum: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    dragNDropIngredient(idx) {
      this.$emit("dragNDropIngredient", idx);
    },
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
