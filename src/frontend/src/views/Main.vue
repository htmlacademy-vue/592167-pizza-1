<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <builder-dough-selector @onDoughSizeClick="onDoughSizeClick" />
        <builder-size-selector @onPizzaDiameterClick="onPizzaDiameterClick" />
        <builder-ingredients-selector
          @onSauceClick="onSauceClick"
          @changeIngredientCount="changeIngredientCount"
        />
        <builder-content-pizza
          @changeIngredientCount="changeIngredientCount"
          @changePizzaName="changePizzaName"
        />
      </div>
    </form>
  </main>
</template>

<script>
import BuilderDoughSelector from "@/modules/builder/components/BuilderDoughSelector";
import BuilderSizeSelector from "@/modules/builder/components/BuilderSizeSelector";
import BuilderIngredientsSelector from "@/modules/builder/components/BuilderIngredientsSelector";
import BuilderContentPizza from "@/modules/builder/components/BuilderContentPizza";

export default {
  name: "Main",
  components: {
    BuilderDoughSelector,
    BuilderSizeSelector,
    BuilderIngredientsSelector,
    BuilderContentPizza,
  },
  methods: {
    onDoughSizeClick(data) {
      this.$emit("onDoughSizeClick", data);
    },
    onSauceClick(data) {
      this.$emit("onSauceClick", data);
    },
    onPizzaDiameterClick(data) {
      this.$emit("onPizzaDiameterClick", data);
    },
    changeIngredientCount(data) {
      this.$emit("changeIngredientCount", data);
    },
    changePizzaName(data) {
      this.$emit("changePizzaName", data);
    },
  },
};
</script>
