<template>
  <div>
    <app-layout :sum="sum" />
    <Main
      :dough-size="doughSize"
      :sauce-info="sauceInfo"
      :ingredients="ingredients"
      :selected-ingredients="selectedIngredients"
      :pizza-diameter="pizzaDiameter"
      :sum="sum"
      @onDoughSizeClick="changeDoughSize"
      @onSauceClick="changeSauce"
      @onIncrementIngredientClick="changeIngredientCount"
      @onDecrementIngredientClick="changeIngredientCount"
      @onPizzaDiameterClick="changePizzaDiameter"
    />
  </div>
</template>

<script>
import misc from "@/static/misc.json";
import user from "@/static/user.json";
import { DOUGH_PRICE, SAUCES_PRICE, SIZE_MULTIPLIER } from "@/constants";

import Main from "./Main";
import AppLayout from "@/layouts/AppLayout";

export default {
  name: "Index",
  components: {
    AppLayout,
    Main,
  },
  data() {
    return {
      misc,
      user,
      doughSize: "light",
      sauceInfo: "tomato",
      pizzaDiameter: "small",
      sum: 0,
      ingredients: [
        {
          id: 1,
          name: "mushrooms",
          rusName: "Грибы",
          image: "/public/img/filling/mushrooms.svg",
          price: 33,
          count: 0,
        },
        {
          id: 2,
          name: "cheddar",
          rusName: "Чеддер",
          image: "/public/img/filling/cheddar.svg",
          price: 42,
          count: 0,
        },
        {
          id: 3,
          name: "salami",
          rusName: "Салями",
          image: "/public/img/filling/salami.svg",
          price: 42,
          count: 0,
        },
        {
          id: 4,
          name: "ham",
          rusName: "Ветчина",
          image: "/public/img/filling/ham.svg",
          price: 42,
          count: 0,
        },
        {
          id: 5,
          name: "ananas",
          rusName: "Ананас",
          image: "/public/img/filling/ananas.svg",
          price: 25,
          count: 0,
        },
        {
          id: 6,
          name: "bacon",
          rusName: "Бекон",
          image: "/public/img/filling/bacon.svg",
          price: 42,
          count: 0,
        },
        {
          id: 7,
          name: "onion",
          rusName: "Лук",
          image: "/public/img/filling/onion.svg",
          price: 21,
          count: 0,
        },
        {
          id: 8,
          name: "chile",
          rusName: "Чили",
          image: "/public/img/filling/chile.svg",
          price: 21,
          count: 0,
        },
        {
          id: 9,
          name: "jalapeno",
          rusName: "Халапеньо",
          image: "/public/img/filling/jalapeno.svg",
          price: 25,
          count: 0,
        },
        {
          id: 10,
          name: "olives",
          rusName: "Маслины",
          image: "/public/img/filling/olives.svg",
          price: 25,
          count: 0,
        },
        {
          id: 11,
          name: "tomatoes",
          rusName: "Томаты",
          image: "/public/img/filling/tomatoes.svg",
          price: 35,
          count: 0,
        },
        {
          id: 12,
          name: "salmon",
          rusName: "Лосось",
          image: "/public/img/filling/salmon.svg",
          price: 50,
          count: 0,
        },
        {
          id: 13,
          name: "mozzarella",
          rusName: "Моцарелла",
          image: "/public/img/filling/mozzarella.svg",
          price: 35,
          count: 0,
        },
        {
          id: 14,
          name: "parmesan",
          rusName: "Пармезан",
          image: "/public/img/filling/parmesan.svg",
          price: 35,
          count: 0,
        },
        {
          id: 15,
          name: "blue_cheese",
          rusName: "Блю чиз",
          imag: "/public/img/filling/blue_cheese.svg",
          price: 50,
          count: 0,
        },
      ],
      selectedIngredients: [],
    };
  },
  methods: {
    changeDoughSize(data) {
      this.doughSize = data;
      this.changeSum();
    },
    changeSauce(data) {
      this.sauceInfo = data;
      this.changeSum();
    },
    changeIngredientCount(direction, idx) {
      const ingredient = this.ingredients.find((it) => it.id === idx);
      direction === "increment" ? ingredient.count++ : ingredient.count--;
      this.changeSum();
    },
    changePizzaDiameter(data) {
      this.pizzaDiameter = data;
      this.changeSum();
    },
    changeSum() {
      // мультипликатор размера х (стоимость теста + соус + ингредиенты)
      let sum = 0;
      let ingredientsPrice = 0;
      this.ingredients
        .filter((it) => it.count > 0)
        .map((it) => {
          ingredientsPrice += it.count * it.price;
        });
      sum =
        SIZE_MULTIPLIER[this.pizzaDiameter] *
        (DOUGH_PRICE[this.doughSize] +
          SAUCES_PRICE[this.sauceInfo] +
          ingredientsPrice);
      this.sum = sum;
    },
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
