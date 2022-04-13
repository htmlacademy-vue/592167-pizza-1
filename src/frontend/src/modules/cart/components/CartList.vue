<template>
  <ul class="cart-list sheet">
    <li
      v-for="(pizza, idx) in pizzas"
      :key="pizza.name"
      class="cart-list__item"
    >
      <div class="product cart-list__product">
        <img
          src="@/assets/img/product.svg"
          class="product__img"
          width="56"
          height="56"
          alt="Капричоза"
        />
        <div class="product__text">
          <h2>{{ pizza.pizzaName }}</h2>
          <ul>
            <li>{{ pizza.sizeView }}, на {{ pizza.doughView }} тесте</li>
            <li>Соус: {{ pizza.sauceView }}</li>
            <li>Начинка: {{ pizza.selectedView }}</li>
          </ul>
        </div>
      </div>

      <app-item-counter
        class-counter="cart-list__counter"
        :another-class-button="'counter__button--orange'"
        :ingredient-count="pizza.count"
        :ingredient-name="pizza.pizzaName"
        @changeIngredientCount="changeCount"
      />

      <div class="cart-list__price">
        <b>{{ getPizzaPrice(pizza.sum, pizza.count) }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button
          type="button"
          class="cart-list__edit"
          @click="changePizzaIngredients(idx)"
        >
          Изменить
        </button>
      </div>
    </li>
  </ul>
</template>

<script>
import AppItemCounter from "@/common/components/AppItemCounter";
import { mapActions, mapGetters } from "vuex";
import router from "@/router";

export default {
  name: "CartList",
  components: { AppItemCounter },
  computed: {
    ...mapGetters("Cart", ["pizzas"]),
  },
  methods: {
    ...mapActions("Cart", ["changePizzaCount"]),
    ...mapActions("Builder", ["changePizza"]),
    getPizzaPrice(sum, count) {
      return sum * count;
    },
    changeCount(count, idx) {
      const data = { name: this.pizzas[idx].pizzaName, count };
      this.changePizzaCount(data);
    },
    changePizzaIngredients(idx) {
      const pizzaInfo = this.pizzas[idx];
      const pizzaState = {
        doughId: pizzaInfo.doughId,
        sauceId: pizzaInfo.sauceId,
        pizzaSizeId: pizzaInfo.pizzaSizeId,
        pizzaName: pizzaInfo.pizzaName,
        sum: pizzaInfo.sum,
        selectedIngredients: pizzaInfo.selectedIngredients,
      };
      this.changePizza(pizzaState);
      router.push("/");
    },
  },
};
</script>
