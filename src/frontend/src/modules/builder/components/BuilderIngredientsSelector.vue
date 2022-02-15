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
              :checked="isChecked(getSauceValue(sauce.name))"
            />
            <span>{{ sauce.name }}</span>
          </label>
        </div>

        <div class="ingredients__filling">
          <p>Начинка:</p>
          <ul class="ingredients__list">
            <li
              v-for="ingredient in ingredients"
              :key="ingredient.id"
              class="ingredients__item"
            >
              <AppDrop @drop="$emit('drop', $event)">
                <AppDrag
                  :ingredient-name="ingredient.name"
                  :ingredient-count="
                    getIngredientCount(ingredient.name, selectedIngredients)
                  "
                >
                  <builder-ingredient-picture
                    :ingredient-name="ingredient.name"
                    :ingredient-rus-name="ingredient.rusName"
                  />
                </AppDrag>
              </AppDrop>
              <app-item-counter
                :idx="ingredient.id"
                :ingredient-name="ingredient.name"
                :ingredient-count="
                  getIngredientCount(ingredient.name, selectedIngredients)
                "
                @changeIngredientCount="changeIngredientCount"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import pizza from "@/static/pizza.json";
import AppItemCounter from "@/common/components/AppItemCounter";
import AppDrag from "@/common/components/AppDrag";
import AppDrop from "@/common/components/AppDrop";
import BuilderIngredientPicture from "@/modules/builder/components/BuilderIngredientPicture";

export default {
  name: "BuilderIngredientsSelector",
  components: { AppItemCounter, AppDrag, AppDrop, BuilderIngredientPicture },
  props: {
    sauceInfo: {
      type: String,
      default: "",
    },
    ingredients: {
      type: Array,
      default: () => [],
    },
    selectedIngredients: {
      type: Object,
      default: () => {},
    },
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
    getIngredientCount(ingredientName, selectedIngredients) {
      return selectedIngredients[ingredientName]
        ? selectedIngredients[ingredientName]
        : 0;
    },
    isChecked(sauceName) {
      return sauceName === this.sauceInfo;
    },
    changeIngredientCount(data) {
      this.$emit("changeIngredientCount", data);
    },
  },
};
</script>
