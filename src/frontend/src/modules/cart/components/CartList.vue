<template>
  <ul class="cart-list sheet">
    <li v-for="pizza in pizzas" :key="pizza.name" class="cart-list__item">
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
            <li>
              {{ pizza.sizeView }}, на
              {{ pizza.dough === "large" ? "толстом" : "тонком" }} тесте
            </li>
            <li>Соус: {{ pizza.sauceView }}</li>
            <li>Начинка: {{ pizza.selectedView }}</li>
          </ul>
        </div>
      </div>

      <app-item-counter
        :class-counter="'cart-list__counter'"
        :another-class-button="'counter__button--orange'"
        :ingredient-count="pizza.count"
        :ingredient-name="pizza.pizzaName"
        @changeIngredientCount="changeCount"
      ></app-item-counter>

      <div class="cart-list__price">
        <b>{{ getPizzaPrice(pizza.sum, pizza.count) }} ₽</b>
      </div>

      <div class="cart-list__button">
        <button type="button" class="cart-list__edit">Изменить</button>
      </div>
    </li>
  </ul>
</template>

<script>
import AppItemCounter from "@/common/components/AppItemCounter";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CartList",
  components: { AppItemCounter },
  computed: {
    ...mapGetters("Cart", ["pizzas"]),
  },
  methods: {
    ...mapActions("Cart", ["changePizzaCount"]),
    getPizzaPrice(sum, count) {
      return sum * count;
    },
    changeCount(count, name) {
      const data = { name, count };
      this.changePizzaCount(data);
    },
  },
};
</script>
