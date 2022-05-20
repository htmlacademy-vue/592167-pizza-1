<template>
  <span class="filling" :class="' filling--' + ingredientName">
    {{ ingredientRusName }}
  </span>
</template>

<script>
export default {
  name: "BuilderIngredientPicture",
  props: {
    ingredientName: {
      type: String,
      default: "",
    },

    ingredientRusName: {
      type: String,
      default: "",
    },
  },
};
</script>
