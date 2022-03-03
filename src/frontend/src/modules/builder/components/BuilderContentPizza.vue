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
    <builder-pizza-view @changeIngredientCount="changeIngredientCount" />
    <builder-price-counter />
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
  methods: {
    changeIngredientCount(data) {
      this.$emit("changeIngredientCount", data);
    },
  },
};
</script>
