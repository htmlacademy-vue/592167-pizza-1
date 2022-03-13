<template>
  <div class="content__result">
    <p>Итого: {{ pizzaSum }} ₽</p>
    <button
      type="button"
      class="button"
      :disabled="isPizzaName"
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
    ...mapGetters("Builder", ["pizzaSum", "isPizzaName", "pizzaInfo"]),
  },
  methods: {
    ...mapActions("Cart", ["addPizza"]),
    ...mapActions("Builder", ["resetBuilderState", "initBuilderState"]),
    makePizza() {
      this.pizzaInfo.sum = this.pizzaSum;
      this.pizzaInfo.count = 1;
      this.addPizza(this.pizzaInfo);
      this.resetBuilderState();
      this.initBuilderState();
    },
  },
};
</script>
