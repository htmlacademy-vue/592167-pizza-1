<template>
  <div class="content__ingredients">
    <div class="sheet">
      <h2 class="title title--small sheet__title">Выберите ингредиенты</h2>

      <div class="sheet__content ingredients">
        <div class="ingredients__sauce">
          <p>Основной соус:</p>

          <label
            v-for="sauce in sauces"
            :key="sauce.id"
            class="radio ingredients__input"
            @click="changeSauce(sauce.slug)"
          >
            <input
              type="radio"
              name="sauce"
              :value="sauce.slug"
              :checked="isChecked(sauce.slug)"
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
                :class-counter="'counter--orange ingredients__counter'"
                :max-count="3"
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
import AppItemCounter from "@/common/components/AppItemCounter";
import AppDrag from "@/common/components/AppDrag";
import AppDrop from "@/common/components/AppDrop";
import BuilderIngredientPicture from "@/modules/builder/components/BuilderIngredientPicture";
import { mapActions, mapGetters } from "vuex";
import { MAX_INGREDIENT_COUNT } from "@/constants";

export default {
  name: "BuilderIngredientsSelector",
  components: { AppItemCounter, AppDrag, AppDrop, BuilderIngredientPicture },
  props: {
    sauceInfo: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      maxCount: MAX_INGREDIENT_COUNT,
    };
  },
  computed: {
    ...mapGetters("Builder", [
      "ingredients",
      "selectedIngredients",
      "sauces",
      "sauce",
    ]),
  },
  methods: {
    ...mapActions("Builder", ["updateSauce", "updateSelectedIngredients"]),
    changeSauce(sauce) {
      this.updateSauce(sauce);
    },

    getIngredientCount(ingredientName, selectedIngredients) {
      return selectedIngredients[ingredientName]
        ? selectedIngredients[ingredientName]
        : 0;
    },
    isChecked(sauceName) {
      return sauceName === this.sauce;
    },
    changeIngredientCount(count, name) {
      this.updateSelectedIngredients({ [name]: count });
    },
  },
};
</script>
