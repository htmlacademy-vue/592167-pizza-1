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
    <builder-pizza-view></builder-pizza-view>
    <builder-price-counter></builder-price-counter>
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
};
</script>

<!--<style scoped>-->

<!--</style>-->
