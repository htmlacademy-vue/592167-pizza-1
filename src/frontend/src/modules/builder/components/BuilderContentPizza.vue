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
      @dragNDropIngredient="dragNDropIngredient"
      :doughSize="doughSize"
      :sauceInfo="sauceInfo"
      :ingredients="ingredients"
    ></builder-pizza-view>
    <builder-price-counter :sum="sum"></builder-price-counter>
  </div>
</template>

<script>
import BuilderPizzaView from "./BuilderPizzaView";
import BuilderPriceCounter from "./BuilderPriceCounter";

export default {
  name: "BuilderContentPizza",
  props: {
    doughSize: String,
    sauceInfo: String,
    ingredients: Array,
    sum: Number,
  },
  methods: {
    dragNDropIngredient(idx) {
      this.$emit("dragNDropIngredient", idx);
    },
  },
  components: {
    BuilderPizzaView,
    BuilderPriceCounter,
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
