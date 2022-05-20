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
            @click="changeSauce(sauce.id)"
          >
            <input
              type="radio"
              name="sauce"
              :value="sauce.slug"
              :checked="isChecked(sauce.id)"
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
                  :ingredient-id="ingredient.id"
                  :ingredient-count="
                    getIngredientCount(ingredient.id, selectedIngredients)
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
                :ingredient-count="
                  getIngredientCount(ingredient.id, selectedIngredients)
                "
                :class-counter="'counter--orange ingredients__counter'"
                :max-count="maxCount"
                @changeIngredientCount="
                  changeIngredientCount($event, ingredient.id)
                "
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
      "sauceId",
    ]),
  },

  methods: {
    ...mapActions("Builder", ["updateSauce", "updateSelectedIngredients"]),

    changeSauce(id) {
      this.updateSauce(id);
    },

    getIngredientCount(ingredientId, selectedIngredients) {
      const ingredient = selectedIngredients.find(
        (it) => it.ingredientId === ingredientId
      );
      return ingredient ? ingredient.quantity : 0;
    },

    isChecked(id) {
      return id === this.sauceId;
    },

    changeIngredientCount(count, id) {
      this.updateSelectedIngredients({
        ingredientId: id,
        quantity: count,
      });
    },
  },
};
</script>
