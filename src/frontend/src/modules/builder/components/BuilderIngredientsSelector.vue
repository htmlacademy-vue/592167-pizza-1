<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <label
            v-for="sauce in pizza.sauces"
            :key="sauce.id"
            class="radio ingredients__input"
            @click="$emit('onSauceClick', getSauceValue(sauce.name))"
          >
            <input
              type="radio"
              name="sauce"
              :value="getSauceValue(sauce.name)"
              v-model="sauceInfo"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>

          <ul class="ingredients__list">
            <li
              v-for="(ingredient, idx) in ingredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <span
                class="filling"
                :class="
                  ' filling--' + getIngredientClassName(ingredient.rusName)
                "
                >{{ ingredient.rusName }}
              </span>

              <app-item-counter
                :idx="idx"
                :ingredientCount="ingredient.count"
                @onIncrementIngredientClick="onIncrementIngredientClick"
                @onDecrementIngredientClick="onDecrementIngredientClick"
              ></app-item-counter>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pizza from "../../../static/pizza.json";
import AppItemCounter from "../../../common/components/AppItemCounter";

export default {
  name: "BuilderIngredientsSelector",
  props: {
    sauceInfo: String,
    ingredients: Array,
  },
  data() {
    return { pizza };
  },
  methods: {
    getSauceValue(name) {
      switch (name) {
        case "Томатный":
          return "tomato";
        default:
          return "creamy";
      }
    },
    getIngredientClassName(name) {
      switch (name) {
        case "Грибы":
          return "mushrooms";
        case "Чеддер":
          return "cheddar";
        case "Салями":
          return "salami";
        case "Ветчина":
          return "ham";
        case "Ананас":
          return "ananas";
        case "Бекон":
          return "bacon";
        case "Лук":
          return "onion";
        case "Чили":
          return "chile";
        case "Халапеньо":
          return "jalapeno";
        case "Маслины":
          return "olives";
        case "Томаты":
          return "tomatoes";
        case "Лосось":
          return "salmon";
        case "Моцарелла":
          return "mozzarella";
        case "Пармезан":
          return "parmesan";
        case "Блю чиз":
          return "blue_cheese";
      }
    },
    onIncrementIngredientClick(idx) {
      this.$emit("onIncrementIngredientClick", idx);
    },
    onDecrementIngredientClick(idx) {
      this.$emit("onDecrementIngredientClick", idx);
    },
  },
  components: { AppItemCounter },
};
</script>

<!--<style scoped>-->

<!--</style>-->
