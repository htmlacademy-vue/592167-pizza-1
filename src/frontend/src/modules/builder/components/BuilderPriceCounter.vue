<template>
  <div class="content__result">
    <p>Итого: {{ pizzaSum }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="isButtonCookDisable"
      @click="makePizza"
    >
      Готовьте!
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "BuilderPriceCounter",
  computed: {
    ...mapGetters("Builder", ["pizzaSum", "isButtonCookDisable", "pizzaInfo"]),
  },
  methods: {
    ...mapActions("Cart", ["addPizza"]),
    ...mapActions("Builder", [
      "resetBuilderState",
      "initBuilderState",
      "addSum",
    ]),
    makePizza() {
      this.addSum(this.pizzaSum);
      this.addPizza(this.pizzaInfo);
      this.resetBuilderState();
      this.initBuilderState();
    },
  },
};
</script>
