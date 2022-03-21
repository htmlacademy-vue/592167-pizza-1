<template>
  <div class="content__pizza">
    <label class="input">
      <span class="visually-hidden">Название пиццы</span>
      <input
        :value="pizzaName"
        type="text"
        name="pizza_name"
        placeholder="Введите название пиццы"
        @input="inputChangeValue"
      />
    </label>
    <builder-pizza-view @changeIngredientCount="changeIngredientCount" />
    <builder-price-counter />
  </div>
</template>

<script>
import BuilderPizzaView from "@/modules/builder/components/BuilderPizzaView";
import BuilderPriceCounter from "@/modules/builder/components/BuilderPriceCounter";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BuilderContentPizza",
  components: {
    BuilderPizzaView,
    BuilderPriceCounter,
  },
  computed: {
    ...mapGetters("Builder", ["pizzaName"]),
  },
  methods: {
    ...mapActions("Builder", ["updatePizzaName"]),
    inputChangeValue(evt) {
      console.log(evt.target.value);
      this.updatePizzaName(evt.target.value);
    },

    changeIngredientCount(data) {
      this.$emit("changeIngredientCount", data);
    },
  },
};
</script>
