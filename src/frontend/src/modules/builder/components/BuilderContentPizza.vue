<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        v-model="localPizzaName"
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        @blur="$emit('changePizzaName', localPizzaName)"
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
    pizzaName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      localPizzaName: this.pizzaName,
    };
  },
  methods: {
    changeIngredientCount(data) {
      this.$emit("changeIngredientCount", data);
    },
  },
};
</script>
