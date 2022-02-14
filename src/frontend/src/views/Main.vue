<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <builder-dough-selector
          :dough-size="doughSize"
          @onDoughSizeClick="onDoughSizeClick"
        />
        <builder-size-selector
          :pizza-diameter="pizzaDiameter"
          @onPizzaDiameterClick="onPizzaDiameterClick"
        />
        <builder-ingredients-selector
          :sauce-info="sauceInfo"
          :dough-size="doughSize"
          :ingredients="ingredients"
          @onSauceClick="onSauceClick"
          @onIncrementIngredientClick="onIncrementIngredientClick"
          @onDecrementIngredientClick="onDecrementIngredientClick"
        />
        <builder-content-pizza
          :dough-size="doughSize"
          :sauce-info="sauceInfo"
          :ingredients="ingredients"
          :sum="sum"
          @dragNDropIngredient="onIncrementIngredientClick"
        />
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
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderContentPizza,
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
    pizzaDiameter: {
      type: String,
      default: "",
    },
    sum: {
      type: Number,
      default: 0,
    },
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
};
</script>

<!--<style scoped>-->

<!--</style>-->
