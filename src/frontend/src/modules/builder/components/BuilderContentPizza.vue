<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        @blur="blurInput"
      />
    </label>
    <builder-pizza-view @changeIngredientCount="changeIngredientCount" />
    <builder-price-counter />
  </div>
</template>

<script>
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { mapActions } from "vuex";

export default {
  name: "BuilderContentPizza",
  components: {
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  methods: {
    ...mapActions("Builder", ["updatePizzaName"]),
    blurInput(evt) {
      this.updatePizzaName(evt.target.value);
    },

    changeIngredientCount(data) {
      this.$emit("changeIngredientCount", data);
    },
  },
};
</script>
