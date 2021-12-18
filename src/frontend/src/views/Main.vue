<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>

        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>

            <div class="sheet__content dough">
              <label
                class="dough__input"
                :class="' dough__input--' + getDoughThickness(item.name)"
                v-for="item in pizza.dough"
                :key="item.id"
              >
                <input
                  type="radio"
                  name="dough"
                  :value="getDoughThickness(item.name)"
                  class="visually-hidden"
                  checked
                />
                <b>{{ item.name }}</b>
                <span>{{ item.description }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>

            <div class="sheet__content diameter">
              <label
                v-for="size in pizza.sizes"
                :key="size.id"
                class="diameter__input"
                :class="
                  ' diameter__input--' + getPizzaDiameterClassName(size.name)
                "
              >
                <input
                  type="radio"
                  name="diameter"
                  :value="getPizzaDiameterClassName(size.name)"
                  class="visually-hidden"
                />
                <span>{{ size.name }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>

            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>

                <label
                  v-for="sauce in pizza.sauces"
                  :key="sauce.id"
                  class="radio ingredients__input"
                >
                  <input
                    type="radio"
                    name="sauce"
                    :value="getSauceValue(sauce.name)"
                    checked
                  />
                  <span>{{ sauce.name }}</span>
                </label>
              </div>

              <div class="ingredients__filling">
                <p>Начинка:</p>

                <ul class="ingredients__list">
                  <li
                    v-for="ingredient in pizza.ingredients"
                    :key="ingredient.id"
                    class="ingredients__item"
                  >
                    <span
                      class="filling"
                      :class="
                        ' filling--' + getIngredientClassName(ingredient.name)
                      "
                      >{{ ingredient.name }}
                    </span>

                    <div class="counter counter--orange ingredients__counter">
                      <button
                        type="button"
                        class="counter__button counter__button--minus"
                        disabled
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>

          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>

          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import pizza from "../static/pizza.json";

export default {
  name: "Main",
  data() {
    return { pizza };
  },
  methods: {
    getDoughThickness(doughName) {
      return doughName === "Тонкое" ? `light` : `large`;
    },
    getPizzaDiameterClassName(diametr) {
      switch (diametr) {
        case "23 см":
          return "small";
        case "32 см":
          return "normal";
        default:
          return "big";
      }
    },
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
  },
};
</script>

<!--<style scoped>-->

<!--</style>-->
