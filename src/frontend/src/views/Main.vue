<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <builder-dough-selector
          @onDoughSizeClick="onDoughSizeClick"
          :doughSize="doughSize"
        ></builder-dough-selector>
        <builder-size-selector
          :pizzaDiameter="pizzaDiameter"
          @onPizzaDiameterClick="onPizzaDiameterClick"
        ></builder-size-selector>
        <builder-ingredients-selector
          @onSauceClick="onSauceClick"
          @onIncrementIngredientClick="onIncrementIngredientClick"
          @onDecrementIngredientClick="onDecrementIngredientClick"
          :sauceInfo="sauceInfo"
          :doughSize="doughSize"
          :ingredients="ingredients"
        ></builder-ingredients-selector>
        <builder-content-pizza
          @dragNDropIngredient="onIncrementIngredientClick"
          :doughSize="doughSize"
          :sauceInfo="sauceInfo"
          :ingredients="ingredients"
          :sum="sum"
        ></builder-content-pizza>
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "../static/pizza.json";
import BuilderDoughSelector from "../modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "../modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "../modules/builder/components/BuilderIngredientsSelector";
import BuilderContentPizza from "../modules/builder/components/BuilderContentPizza";

export default {
  name: "Main",
  props: {
    doughSize: String,
    sauceInfo: String,
    ingredients: Array,
    pizzaDiameter: String,
    sum: Number,
  },
  data() {
    return { pizza };
  },
  methods: {
    onDoughSizeClick(data) {
      this.$emit("onDoughSizeClick", data);
    },
    onSauceClick(data) {
      this.$emit("onSauceClick", data);
    },
    onIncrementIngredientClick(idx) {
      this.$emit("onIncrementIngredientClick", "increment", idx);
    },
    onDecrementIngredientClick(idx) {
      this.$emit("onDecrementIngredientClick", "decrement", idx);
    },
    onPizzaDiameterClick(data) {
      this.$emit("onPizzaDiameterClick", data);
    },
  },
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderContentPizza,
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
