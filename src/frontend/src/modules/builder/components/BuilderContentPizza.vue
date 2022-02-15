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
      :selected-ingredients="selectedIngredients"
      @changeIngredientCount="changeIngredientCount"
    />
    <builder-price-counter :sum="sum" />
  </div>
</template>

<script>
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";

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
    selectedIngredients: {
      type: Object,
      default: () => {},
    },
    sum: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    changeIngredientCount(data) {
      this.$emit("changeIngredientCount", data);
    },
  },
};
</script>
